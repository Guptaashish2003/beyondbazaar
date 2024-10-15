"use client";
import React,{useState,useEffect} from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useGetDataProtected } from '@/redux/api/useGetData'
import SubmitButton from "@/components/Form/SubmitButton";
import { errorTostHandler } from "@/redux/api/errorTostHandler";
import { useParams } from "next/navigation";
import { ToWords } from 'to-words';
import { padStart } from "@fullcalendar/core/internal";
import { formatDates } from "@/backend/utils/basicTools";

const page = () => {
  const toWords = new ToWords();

  const {id} = useParams();
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState()
 
  

  
  const Print = () =>{     
    const printContents = document.getElementById('invoice').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  const getData = async () => {
    try {
      const res = await useGetDataProtected(`/api/invoice/${id}`);
      if(res.success){
        console.log("res....",res.data,"ress")
        setData(res.data)
        setLoading(false);

      }
    } catch (error) {
      errorTostHandler(error);
      setLoading(false);
    }
  }

  useEffect(()=>{
    getData()

    
  },[])

  const exortHeader = [
    {name:"S.No"},
    {name:"Product Name"},
    {name:"Qty"},
    {name:"Price"},
    {name:"Amount"},
  ]
  const totalPriceIsFiniteNumber = Number.isFinite(data?.totalPrice);
  return (
    <div className="printable-area absolute w-screen mx-auto px-16  flex justify-center items-center bg-gray-300 z-[1000]">
      <div id="invoice" className="p-4 a4-sheet relative  left-0 right-0 bg-white mx-auto ">
        <div className="flex  ">
          <Image className="w-20 h-20 " src={logo} alt="logo" />
          <div className="flex pr-3 flex-col ml-auto">
            <p className="font-bold text-gray-900 text-md mt-4 ">
              Tax Invoice/Bill of Supply/Cash Memo/Warranty
            </p>
            <p className="text-md mt-2 order-2 text-gray-800 ml-auto">
              (Original for Recipient)
            </p>
          </div>
        </div>

        <div className=" pl-3 grid grid-cols-2 ">
          <div className="flex flex-col">
            <p className="text-sm text-gray-900 font-bold ">Sold By:</p>
            <p className="text-sm text-gray-700"> biyond Bazaar </p>
            <p className="text-sm text-gray-700"> 123, Main Road, </p>
            <p className="text-sm text-gray-700"> New Delhi, 110001</p>
            {/* <p className="text-sm pt-2 text-gray-700">
              <span className="text-sm text-gray-900 mt-2 font-bold">
                GSTIN:
              </span>{" "}
              07AABCB1491A1ZQ
            </p> */}
          </div>
          <div className=" pr-3 pt-2 text-end flex flex-col">
            <p className="text-sm text-gray-900 font-bold ">Billig Address :</p>
            <p className="text-sm text-gray-700">
              {" "}
              {data?.shippingInfo?.name}{" "}
            </p>
            <p className="text-sm text-gray-700">
              {" "}
              {data?.shippingInfo?.houseNo} {data?.shippingInfo?.street}{" "}
            </p>
            <p className="text-sm text-gray-700">
              {" "}
              {data?.shippingInfo?.city} {data?.shippingInfo?.state}{" "}
              {data?.shippingInfo?.pincode} {data?.shippingInfo?.country}{" "}
            </p>
          </div>
          <div className="flex pt-2 flex-col">
            <p className="text-sm text-gray-700">
              <span className="text-sm text-gray-900 mt-2 font-bold">
                Order Number:
              </span>{" "}
              {data?.orderId}
            </p>
            <p className="text-sm text-gray-700">
              <span className="text-sm text-gray-900 mt-4 font-bold">
                Order Date:
              </span>{" "}
              {/* foramt this date */}

              {formatDates(data?.createdAt)}
            </p>
            <p className="text-sm text-gray-700">
              <span className="text-sm text-gray-900 mt-4 font-bold">
                Invoice Number:
              </span>{" "}
              07AABCB1491A1ZQ
            </p>
            <p className="text-sm text-gray-700">
              <span className="text-sm text-gray-900 mt-4 font-bold">
                Invoice Details:
              </span>{" "}
              07AABCB1491A1ZQ
            </p>
            <p className="text-sm text-gray-700">
              <span className="text-sm text-gray-900 mt-4 font-bold">
                Invoice Date:
              </span>{" "}
              {formatDates(data?.Paymentdetails?.payment_time)}
            </p>
          </div>
          <div className=" pr-3 pt-2 text-end flex flex-col">
            <p className="text-sm text-gray-900 font-bold ">
              Shipping Address :
            </p>
            <p className="text-sm text-gray-700">
              {" "}
              {data?.shippingInfo?.name}{" "}
            </p>
            <p className="text-sm text-gray-700">
              {" "}
              {data?.shippingInfo?.number}{" "}
            </p>
            <p className="text-sm text-gray-700">
              {" "}
              {data?.shippingInfo?.email}{" "}
            </p>
            <p className="text-sm text-gray-700">
              {" "}
              {data?.shippingInfo?.houseNo} {data?.shippingInfo?.street}{" "}
            </p>
            <p className="text-sm text-gray-700">
              {" "}
              {data?.shippingInfo?.city} {data?.shippingInfo?.state}{" "}
              {data?.shippingInfo?.pincode} {data?.shippingInfo?.country}{" "}
            </p>
          </div>
        </div>

        <div className="m-2 md:m-10  p-2 md:p-10 rounded-3xl">
          <table className="w-full border-gray-600 border-collapse border">
            <thead>
              <tr>
                {exortHeader.map((item, index) => (
                  <th
                    key={index}
                    className="text-left text-gray-800 font-bold border p-2"
                  >
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.orderItems.map((item, index) => (
                <tr key={index}>
                  <td className="border  text-gray-800 p-2">{index + 1}</td>
                  <td className="border  text-gray-800 p-2">
                    {item?.productDetails?.productName}
                  </td>
                  <td className="border flex gap-1  text-gray-800 p-2">
                    {item.qty}{" "}
                    <span className="font-thin text-gray-900">Pcs</span>{" "}
                  </td>
                  <td className="border  text-gray-800 p-2">
                    {item.price}
                  </td>
                  <td className="border  text-gray-800 p-2">
                    {item.productDetails?.productPrice * item.qty}
                  </td>
                </tr>
              ))}
            </tbody>
            <tbody>
              {/* give tax price in gst terms ,discount and total price */}
              <tr>
                <td className="border  text-gray-800 p-2" colSpan="3"></td>
                <td className="border  font-bold text-gray-800 p-2">
                  Sub Total
                </td>
                <td className="border  text-gray-800 p-2">
                  {data?.itemsPrice}
                </td>
              </tr>
              <tr>
                <td className="border  text-gray-800 p-2" colSpan="3"></td>
                <td className="border font-bold text-gray-800 p-2">Charges</td>
                <td className="border  text-gray-800 p-2">
                  {Math.ceil(data?.taxPrice)}
                </td>
              </tr>
              <tr>
                <td className="border  text-gray-800 p-2" colSpan="3"></td>
                <td className="border font-bold  text-gray-800 p-2">
                  Discount
                </td>
                <td className="border  text-gray-800 p-2">
                  {Math.floor(data?.discountAmount)}
                </td>
              </tr>
              {/* here claculate total price and total qty compulsary  */}
              <tr>
                <td className="border  text-gray-800 p-2" colSpan="2"></td>
                <td className="border  font-bold text-gray-800 p-2">
                  {data?.orderItems.length}Pcs
                </td>
                <td className="border font-bold  text-gray-800 p-2">Total</td>
                <td className="border font-bold text-gray-800 p-2">
                  {Math.ceil(data?.totalPrice)}
                </td>
              </tr>

              <tr>
                <td className="border font-bold  text-gray-800 p-2" colSpan="4">{totalPriceIsFiniteNumber ? toWords.convert(data.totalPrice) : 'Loading...'}</td>
                <td className="border  text-gray-800 p-2" colSpan="3">
                  E.& O.E
                </td>
              </tr>
              <tr>
                {/* signature  */}
                <td className="border  text-gray-800 p-2" colSpan="3"></td>
                <td className="border  text-gray-800 p-2" colSpan="3">
                  For biyond Bazaar
                  <Image
                    className="w-20 h-20 "
                    src={logo}
                    alt="logo"
                  />
                </td>

              </tr>
            </tbody>
          </table>
          <p className="font-semibold text-lg text-gray-900 capitalize"  >wheather text is payble  under reverse charge-No</p>
          <table className="w-full border-gray-600 border-collapse border">
            {/* getting details of payment */}
            <thead>
              <tr>
                <th className="text-left text-gray-800 font-bold border p-2">Payment Details</th>
                <th className="text-left text-gray-800 font-bold border p-2">Date & Time</th>
                <th className="text-left text-gray-800 font-bold border p-2">Invoice Value </th>
                <th className="text-left text-gray-800 font-bold border p-2">Mode of Payment </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border  text-gray-800 p-2">Payment</td>
                <td className="border  text-gray-800 p-2">{data?.createdAt}</td>
                <td className="border  text-gray-800 p-2">{Math.ceil(data?.Paymentdetails?.order_amount)}</td>
                <td className="border  text-gray-800 p-2">{data?.Paymentdetails?.payment_group.toUpperCase()
                }</td>
              </tr>
            </tbody>

          </table>
          <p className="font-semibold pt-4 mx-auto text-sm text-center text-gray-400 capitalize"  >This is a computer generated invoice only for retail cusotmers, Please note that this invoice is not a demand for payment</p>
        </div>
        
        <div>
      </div>

      </div>
        <SubmitButton onClick={Print} className='absolute bottom-0 left-0 right-0 mx-auto'>
          Print
        </SubmitButton>
    </div>
  );
};

export default page;
