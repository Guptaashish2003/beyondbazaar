"use client";
import Loading from "@/app/loading";
import SelectAdres from "@/components/PaymentPageTools/SelectAdres";
import SumCard from "@/components/PaymentPageTools/SumCard";
import PriceCheckOut from "@/components/shoppingCart/PriceCheckOut";
import { errorTostHandler } from "@/redux/api/errorTostHandler";
import { useGetData, useGetDataProtected } from "@/redux/api/useGetData";
import { usePostDataProtected } from "@/redux/api/usePostData";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCashfreeInstance } from "@/backend/utils/cashfreePay";

const page = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const qty = searchParams.get("qty");
  const variantId = searchParams.get("variantId");
  const variantDetailId = searchParams.get("variantDetailId");
  const addressRef = useRef();
  const [address, setAddress] = useState([]);
  const [product, setProduct] = useState([]);
  const [discount, setDiscount] = useState({ discountValue: 0 });
  const [method, setMethod] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState();

  const getData = async () => {
    try {
      setLoading(true);
      const res = await useGetDataProtected("/api/user/address/me");
      console.log("res", res?.data);
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
          let price = res?.data.productPrice;
          if (res.data.isVariantAvailable) {
            res.data.productID.variants.map((item) => {
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
              price,
            },
          ]);
          setOrder({
            orderItems: [
              {
                qty: qty,
                product: res?.data._id,
                price,
                variantDetailId,
                variantId,
                isVariantAvailable: res.data.isVariantAvailable,
              },
            ],
            itemsPrice: price * qty,
          });
        }
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      errorTostHandler(error);
    }
  };

  const onCheckout = async () => {
    try {
      const orderId = await useGetData("/api/user/order/gen-order-Id");
      const paymentRes = await usePostDataProtected(
        "/api/user/payment/session-create-order",
        {
          orderItems: order.orderItems,
          orderId: orderId.data,
          discount: discount.disCountId,
          shippingInfo: addressRef.current.value,
          shippingPrice: "0",
          method,
        }
      );
      if (paymentRes.success) {
        const { session, expiry } = paymentRes.data;
        const cashfree = await getCashfreeInstance();

        let checkoutOptions = {
          paymentSessionId: session,
          redirectTarget: document.getElementById("cf_checkout"),
          appearance: {
            width: "425px",
            height: "700px",
          },
        };

        cashfree.checkout(checkoutOptions).then((result) => {
          if (result.error) {
            // This will be true when there is any error during the payment
            console.log(
              "There is some payment error, Check for Payment Status"
            );
            console.log(result.error);
          }
          if (result.redirect) {
            // This will be true when the payment redirection page couldnt be opened in the same window
            // This is an exceptional case only when the page is opened inside an inAppBrowser
            // In this case the customer will be redirected to return url once payment is completed
            console.log("Payment will be redirected");
          }
          if (result.paymentDetails) {
            // This will be called whenever the payment is completed irrespective of transaction status
            console.log("Payment has been completed, Check for Payment Status");
            console.log(result.paymentDetails.paymentMessage);
          }
        });
      }
    } catch (error) {
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
                  >{`${val?.street} ${val?.state} ${val?.pincode} ${val?.number}`}</option>
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
            btnName="Checkout"
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
          </PriceCheckOut>
        </div>
      </div>
    </section>
  );
};

export default page;
