import React from "react";
import Image from "next/image";
import productImg from "@/assets/productImag1.jpg";

const OrderDetail = () => {
  return (
    <>
      <div className="bg-gray-50">

        <main className="mx-auto max-w-2xl pb-24 pt-8 sm:px-6 sm:pt-16 lg:max-w-7xl lg:px-8">
          {/* Products */}
          <section aria-labelledby="products-heading" className="mt-6">
            
            <div className="space-y-8">
              <div className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
          <div className="space-y-2 px-8 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 ">
            <div className="flex sm:items-baseline sm:space-x-4">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">
                Order #54879
              </h1>
              <a
                href="#"
                className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:block"
              >
                View invoice
                <span aria-hidden="true"> →</span>
              </a>
            </div>
            <p className="text-sm text-gray-600">
              Order placed{" "}
              <time dateTime="2021-03-22" className="font-medium text-gray-900">
                March 22, 2021
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
                        src={productImg}
                        alt="Insulated bottle with white base and black snap lid."
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                      />
                    </div>
                    <div className="mt-6 sm:ml-6 sm:mt-0">
                      <h3 className="text-base font-medium text-gray-900">
                        <a href="#">Nomad Tumbler</a>
                      </h3>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        $35.00
                      </p>
                      <p className="mt-3 text-sm text-gray-500">
                        This durable and portable insulated tumbler will keep
                        your beverage at the perfect temperature during your
                        next adventure.
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
                          <span className="block">Floyd Miles</span>
                          <span className="block">7363 Cynthia Pass</span>
                          <span className="block">Toronto, ON N3Y 4H8</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">
                          Shipping updates
                        </dt>
                        <dd className="mt-3 space-y-3 text-gray-500">
                          <p>f•••@example.com</p>
                          <p>1•••••••••40</p>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Edit
                          </button>
                        </dd>
                      </div>
                    </dl>
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
                        className="h-2 rounded-full bg-indigo-600"
                        style={{ width: "calc((1 * 2 + 1) / 8 * 100%)" }}
                      />
                    </div>
                    <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                      <div className="text-indigo-600">Order placed</div>
                      <div className="text-center text-indigo-600">
                        Processing
                      </div>
                      <div className="text-center">Shipped</div>
                      <div className="text-right">Delivered</div>
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
