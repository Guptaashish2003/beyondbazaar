import React, { useState } from "react";
import Image from "next/image";
import productImg from "@/assets/productImag1.jpg";
import { useRouter } from "next/navigation";
import Link from "next/link";

const OrderDetail = ({
  variants,
  id,
  title,
  img,
  price,
  discription,
  quantity,
  address,
  orderId,
  orderDate,
  isCod,
  status = 2,
}) => {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState(status);
  function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }


  return (
    <>
      <div className="bg-gray-50">
        <main className="mx-auto max-w-2xl pb-1 pt-1 sm:px-6 sm:pt-16 lg:max-w-7xl lg:px-8">
          {/* Products */}
          <section aria-labelledby="products-heading">
            <div className="flex justify-start item-start   my-8 space-y-2 flex-col">
              <h1 className="text-3xl  dark:text-black lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Order #{orderId}
              </h1>
              <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                {formatDate(orderDate)}
              </p>
            </div>

            <div className="space-y-8">
              <div className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                <div className="space-y-2 px-8 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 ">
                  <div className="flex sm:items-baseline my-2 sm:space-x-4">
                    <Link href={`/user/invoice/${id}`}>
                      <p className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:block">
                        View invoice
                        <span aria-hidden="true"> →</span>
                      </p>
                    </Link>
                  </div>
                  <p className="text-sm text-gray-600">
                    Order placed{" "}
                    <time
                      dateTime="2021-03-22"
                      className="font-medium text-gray-900"
                    >
                      {formatDate(orderDate)}
                    </time>
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:hidden"
                  >
                    View invoice
                    <span aria-hidden="true"> →</span>
                  </a>
                </div>
                <div className="px-4 py-2 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                  <div className="sm:flex lg:col-span-7">
                    <div className="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                      <Image
                        src={img}
                        width={50}
                        height={60}
                        alt="Insulated bottle with white base and black snap lid."
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                      />
                    </div>
                    <div className="mt-6 sm:ml-6 sm:mt-0">
                      <h3 className="text-base font-medium text-gray-900">
                        <a href="#">{title}</a>
                      </h3>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {price?.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </p>
                      {variants.isVariantAvailable && (
                        <>
                          <p>
                            {variants?.variant?.color &&
                              `Color : ${variants?.variant?.color}`}
                          </p>
                          <p>Size :{variants?.variant?.size} </p>
                        </>
                      )}
                      <p className="mt-3 text-sm text-gray-500">
                        Quantity: {quantity}
                      </p>
                      <p className="mt-3 text-sm text-gray-500">
                        {discription}
                      </p>
                      
                    </div>
                  </div>
                  <div className="mt-6 lg:col-span-5 lg:mt-0">
                    <dl className="grid grid-cols-2 gap-x-6 text-sm">
                      <div>
                        <dt className="font-medium text-gray-900">
                          Delivery address
                        </dt>
                        <dd className="mt-3 text-gray-500">
                          <span className="block">{address?.houseNo}</span>
                          <span className="block">{address?.street}</span>
                          <span className="block">
                            {address?.city} {address?.pincode}
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">
                          Shipping updates
                        </dt>
                        <dd className="mt-3 space-y-3 text-gray-500">
                          <p>{address.email}</p>
                          <p>+91 {address.phNumber}</p>
                        </dd>
                      </div>
                    </dl>
                  <p className="mt-3 text-md font-medium text-gray-900">
                        {isCod ? "Cash on delivery" : "Online payment"}
                      </p>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-3 sm:px-6 lg:p-8">
                  <h4 className="sr-only">Status</h4>
                  <p className="text-sm font-medium text-gray-900">
                    Preparing to ship on{" "}
                    <time dateTime="2021-03-24">March 24, 2021</time>
                  </p>
                  <div className="mt-6" aria-hidden="true">
                    <div className="overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`h-2 rounded-full ${orderStatus === 10 ?"bg-red-600":"bg-indigo-600"}`}
                        style={{
                          width: `calc((1 * ${orderStatus} + 1) / 8 * 100%)`,
                        }}
                      />
                    </div>
                    <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                      <div className={` ${orderStatus === 10 ?"text-red-600":"text-indigo-600"}`}>Pending</div>
                      <div
                        className={`text-center ${
                          orderStatus >= 2 ?` ${orderStatus === 10 ?"text-red-600":"text-indigo-600"}` : ""
                        }`}
                      >
                        Processing
                      </div>
                      <div
                        className={`text-center ${
                          orderStatus >= 4 ? ` ${orderStatus === 10 ?"text-red-600":"text-indigo-600"}` : ""
                        }`}
                      >
                        Shipped
                      </div>
                      <div
                        className={`text-right ${
                          orderStatus >= 8 ? ` ${orderStatus === 10 ?"text-red-600":"text-indigo-600"}` : ""
                        }`}
                      >
                       {orderStatus === 10 ?"Cancelled":"Delivered"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default OrderDetail;
