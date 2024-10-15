"use client";
import Loading from "@/app/loading";
import SelectAdres from "@/components/PaymentPageTools/SelectAdres";
import SumCard from "@/components/PaymentPageTools/SumCard";
import PriceCheckOut from "@/components/shoppingCart/PriceCheckOut";
import { errorTostHandler } from "@/redux/api/errorTostHandler";
import { useGetDataProtected } from "@/redux/api/useGetData";
import { usePostDataProtected } from "@/redux/api/usePostData";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCashfreeInstance } from "@/backend/utils/cashfreePay";
import { useUpdateDataProtected } from "@/redux/api/useUpdateData";


const page = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const qty = searchParams.get("qty");
  const variantId = searchParams.get("variant");
  const [orderLoader, setOrderLoader] = useState(false);
  const variantDetailId = searchParams.get("variantDetails");
  const addressRef = useRef();
  const [address, setAddress] = useState([]);
  const [product, setProduct] = useState([]);
  const [discount, setDiscount] = useState({ discountValue: 0 });
  const [method, setMethod] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState();
  const [isCod, setIsCod] = useState(false);
  // console.log("variantId", variantId,"variantDetailId", variantDetailId);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await useGetDataProtected("/api/user/address/me");
      if (res.success) {
        setAddress(res?.data);
        if (res?.data.length === 0) {
          router.push("/address/add-new-address");
        }
      }

      if (id === "bycart") {
        setMethod("bycart");
        const res = await useGetDataProtected("/api/cart/my-cart");
        if (res.success) {
          const newData = res?.data.map((val) => {
            let variantPrice;
            if (val.isVariantAvailable) {
              val.productID.variants.map((item) => {
                if (item._id.toString() === val.variantId.toString()) {
                  return item.variantDetails.map((item2) => {
                    if (
                      item2._id.toString() === val.variantDetailId.toString()
                    ) {
                      variantPrice = item2.price;
                      return item2;
                    }
                  });
                }
              });
            }
            return {
              ...val.productID,
              qty: val.productQuantity,
              isVariantAvailable: val.isVariantAvailable,
              variantPrice,
            };
          });
          const newOrder = res?.data.map((val) => {
            let price = val.productID.productPrice;
            if (val.isVariantAvailable) {
              val.productID.variants.map((item) => {
                if (item._id.toString() === val.variantId.toString()) {
                  return item.variantDetails.map((item2) => {
                    if (
                      item2._id.toString() === val.variantDetailId.toString()
                    ) {
                      price = item2.price;
                      return item2;
                    }
                  });
                }
              });
            }
            return {
              product: val.productID._id,
              qty: val.productQuantity,
              price,
              isVariantAvailable: val.isVariantAvailable,
              variantId: val.variantId,
              variantDetailId: val.variantDetailId,
            };
          });
          setProduct(newData);
          setOrder({ orderItems: newOrder, itemsPrice: res.totalprice });
        }
      } else {
        setMethod("byproduct");
        const res = await useGetDataProtected(
          `/api/product/single-product/${id}`
        );
        if (res.success) {
          let variantPrice = res?.data.productPrice;
          if (res?.data.isVariantAvailable) {
            res?.data.variants.map((item) => {
              if (item._id.toString() === variantId.toString()) {
                return item.variantDetails.map((item2) => {
                  if (item2._id.toString() === variantDetailId.toString()) {
                    variantPrice = item2.price;
                    return item2;
                  }
                });
              }
            });
          }
          setProduct([
            {
              ...res?.data,
              qty: qty,
              isVariantAvailable: res.data.isVariantAvailable,
              variantPrice,
            },
          ]);
          setOrder({
            orderItems: [
              {
                qty: qty,
                product: res?.data._id,
                price: variantPrice,
                variantDetailId,
                variantId,
                isVariantAvailable: res.data.isVariantAvailable,
              },
            ],
            itemsPrice: variantPrice * qty,
          });
        }
      }

      setLoading(false);
    } catch (error) {
      // console.log(error);
      router.back();
      errorTostHandler(error);
    }
  };

  const onCheckout = async () => {
    try {
      setOrderLoader(true);
      const paymentRes = await usePostDataProtected(
        "/api/user/payment/session-create-order",
        {
          orderItems: order.orderItems,
          discount: discount.disCountId,
          shippingInfo: addressRef.current.value,
          isCod,
          shippingPrice: "0",
          method,
        }
      );
      if(paymentRes.success && paymentRes?.data?.isCod ){
        router.push("/user/your-orders");
      }
      
      if (paymentRes.success && !isCod) {
        const { session, expiry } = paymentRes.data;
        // console.log(paymentRes,session, expiry, "session");
        const cashfree = await getCashfreeInstance();
        let checkoutOptions = {
          paymentSessionId: session,
          redirectTarget: "_modal",
        };
        cashfree.checkout(checkoutOptions).then((result) => {
          // console.log(result, "result");
          if (result.error) {
            // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
            // console.log(
            //   "User has closed the popup or there is some payment error, Check for Payment Status"
            // );

            toast("Payment failed", { type: "error" });
          }
          if (result.redirect) {
            // This will be true when the payment redirection page couldnt be opened in the same window
            // This is an exceptional case only when the page is opened inside an inAppBrowser
            // In this case the customer will be redirected to return url once payment is completed
            // console.log("Payment will be redirected");
            router.push("/user/your-orders");
          }
          if (result) {
            // This will be called whenever the payment is completed irrespective of transaction status
            // console.log("Payment has been completed, Check for Payment Status");
            const orderId = paymentRes?.data?.orderId;
            (async () => {
              const updatedOrderDetails = async () => {
                // console.log(
                //   "Payment has been completed, Check for Payment Status",
                //   orderId
                // );

                try {
                  const res = await useGetDataProtected(
                    `/api/user/payment/status/${orderId}`
                  );
                  // console.log(res, "res");  
                  const data = res?.data;
                  const status = data?.payment_status;
                  const payment_method = data?.payment_method;
                  const updatedData = await useUpdateDataProtected(
                    `/api/user/order/update`,
                    { data: data, payment_method: payment_method }
                  );
                  router.push("/user/your-orders");

                } catch (error) {
                  // console.error("An error occurred:", error);
                }
              };

              await updatedOrderDetails();
            })();
          }
        });
      }
      setOrderLoader(false);
    } catch (error) {
      setOrderLoader(false);
      console.log(error);
      errorTostHandler(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="flex flex-col navMargin minScreen px-">
      <div className="flex gap-3 justify-center align-center text-3xl my-4 ">
        <p>Order CheckOut</p>
      </div>
      <div className="flex w-full flex-wrap  justify-between h-[100%] flex-wap">
        <div className="w-[60%] max-lg:w-full max-lg:px-20 max-md:px-5 ">
          <SumCard order={product} />
        </div>
        <div className="w-[35%] px-10 max-lg:w-full max-lg:px-20 max-md:px-5">
          <div>
            <div className="w-full">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Select address
              </label>
              <select
                id="address-select"
                ref={addressRef}
                className="h-14 w-full max-w-full px-4 bg-[#333] text-white border rounded-md text-center capitalize"
              >
                {address.map((val, index) => (
                  <option
                    key={index}
                    value={val._id}
                  >{`${val?.street} ${val?.state} ${val?.pincode} ${val?.phNumber}`}</option>
                ))}
              </select>
            </div>
            <Link
              href="/address/add-new-address"
              className="flex flex-col  items-center rounded-sm cursor-pointer justify-center text-center border-dashed border-2 border-gray-500 mt-4"
            >
              <FaPlus className="w-8 h-8" />
              <p className="text-gray-500 text-sm">Add New Address</p>
            </Link>
          </div>

          <PriceCheckOut
            method={method}
            setDiscount={setDiscount}
            order={order}
            variantDetailId={variantDetailId}
            variantId={variantId}
            isCod={isCod}
            orderLoader={orderLoader}
            setIsCod={setIsCod}
            total={(
              shippingPrice -
              discount.discountValue +
              order.itemsPrice +
              Math.ceil(order.itemsPrice * 0.18)
            ).toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
            onClick={onCheckout}
            promo={true}
            btnName={isCod ? "Place Order" : "Pay Now"}
          >
            <div className="flex justify-between">
              <p>Total items Price</p>
              <p>
                {order.itemsPrice.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
            </div>
            <div className="flex justify-between">
              <p>GST Price</p>
              <p>
                {(order.itemsPrice * 0.18).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Shipping Price</p>
              <p>
                {shippingPrice.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Discount</p>
              <p>
                {discount.discountValue.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
            </div>

            <div className="flex justify-between">
              <p>Total Price</p>
              <p>
                {(
                  shippingPrice -
                  discount.discountValue +
                  order.itemsPrice +
                  Math.ceil(order.itemsPrice * 0.18)
                ).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Cash On Delivery</p>
              <label className="inline-flex mb-1 cursor-pointer ">
                <input
                  type="checkbox"
                  value=""
                  checked={isCod}
                  onChange={() => setIsCod(!isCod)}
                  className="sr-only peer"
                />
                <div className="relative ml-2 w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800"></div>
              </label>
            </div>
          </PriceCheckOut>
        </div>
      </div>
    </section>
  );
};

export default page;
