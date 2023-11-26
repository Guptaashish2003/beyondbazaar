"use client"
import { HiOutlineShoppingBag } from "react-icons/hi2";
import React, { useEffect } from "react";
import PriceCheckOut from "@/components/shoppingCart/PriceCheckOut";
import CartDetail from "@/components/shoppingCart/CartDetail";
import { useDispatch, useSelector } from 'react-redux'
import { getUserCart } from "@/redux/action/Services";
import Loading from "@/app/loading";
import { useRouter } from 'next/navigation'
import Link from "next/link";
const ShoppingCart = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {loading,cart,error} = useSelector((state) => state.cart.userCart)
  const {noOfProduct} = useSelector((state) => state.cart)
  useEffect(()=>{
    dispatch(getUserCart())
       
  },[])
  if (loading) {
    return Loading();
  }
  if(cart.length === 0){
    return(
      <div className="h-screen flex justify-center items-center max-md:flex-col">
        <div className="flex w-[50%] text-center  flex-col justify-center items-center ">
          <h1 id="error_404" className="text-4xl mt-6 mb-4">
            Cart is Empty......
          </h1>
          <h4 className="text-gray-600 mb-5 text-left text-xl pr-0">
            Whoops, this is a little embarrassing. <br />
            This page doesn't seem to exist.
          </h4>
          <Link
            className="bg-black text-white text-base font-medium px-4 py-2 rounded text-center inline-block mt-5 border click-attached"
            href="/"
          >
            let's buy a somthing
          </Link>
        </div>
        <div className="flex w-[50%] text-center  flex-col justify-center items-center ">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="50%" height="50%" className="max-lg:w-full " viewBox="0 0 521.000000 456.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,456.000000) scale(0.100000,-0.100000)"
              fill="#000000" stroke="none">
              <path d="M2687 4412 c-9 -10 -23 -38 -32 -62 -15 -42 -14 -45 7 -77 13 -18 27
-33 32 -33 4 0 5 -8 2 -17 -4 -10 -4 -15 -1 -11 11 10 56 -35 50 -50 -2 -7 -1
-11 4 -7 5 3 28 -18 50 -47 45 -56 42 -67 -14 -68 -16 0 -70 -6 -120 -14 -49
-8 -137 -21 -195 -30 -109 -17 -256 -51 -300 -69 -14 -6 -27 -11 -30 -12 -3
-1 -18 -7 -35 -14 -16 -6 -42 -16 -57 -22 -23 -9 -32 -7 -58 11 -16 12 -35 30
-41 41 -5 11 -14 17 -19 14 -5 -3 -14 4 -20 16 -7 11 -14 19 -16 16 -3 -3 -16
5 -30 18 -14 13 -85 53 -158 89 -129 64 -187 79 -202 55 -18 -30 13 -249 39
-274 7 -7 8 -6 4 1 -6 10 -16 62 -21 110 -1 11 -6 26 -11 33 -6 11 221 -176
262 -215 12 -12 5 -15 -124 -60 -33 -11 -49 -22 -46 -30 4 -12 -13 -66 -48
-149 -7 -16 -13 -33 -14 -37 -2 -5 -4 -10 -5 -13 -1 -3 -3 -8 -5 -12 -1 -5 -5
-15 -8 -23 -4 -8 -8 -24 -10 -35 -2 -11 -9 -32 -15 -47 -20 -49 -81 -342 -98
-468 -9 -69 -14 -157 -12 -197 l3 -71 -143 -41 c-79 -22 -147 -42 -150 -45
-15 -16 14 -10 138 25 74 22 142 39 150 39 9 0 23 -19 33 -47 9 -25 16 -47 15
-47 -30 -12 -237 -160 -233 -166 3 -5 33 11 66 35 67 49 179 119 182 114 19
-33 75 -108 91 -122 12 -10 14 -16 6 -12 -8 4 -4 -3 10 -15 14 -12 25 -26 25
-30 0 -4 15 -19 33 -34 18 -16 29 -33 25 -39 -3 -7 -3 -9 1 -5 4 4 22 -9 38
-28 l31 -35 -27 -127 c-14 -70 -29 -138 -31 -152 -3 -14 -7 -32 -9 -40 -1 -8
-5 -24 -9 -35 -7 -24 -54 -316 -63 -395 -3 -30 -7 -66 -10 -80 -7 -43 -19
-271 -19 -360 0 -269 53 -597 116 -724 28 -55 47 -74 94 -98 36 -19 52 -20
172 -15 107 5 140 3 170 -9 26 -11 52 -14 92 -9 72 9 320 9 392 0 43 -5 64 -3
87 9 27 14 108 15 760 9 722 -6 729 -6 773 14 24 12 62 27 84 33 217 68 403
259 464 480 48 171 35 321 -50 566 -97 279 -119 398 -100 527 19 124 56 184
205 332 159 158 199 225 197 331 -2 144 -119 265 -256 265 -30 0 -60 -3 -67
-7 -7 -5 -22 -10 -32 -11 -26 -4 -96 -45 -96 -55 0 -5 -4 -7 -9 -3 -5 3 -17
-5 -25 -17 -9 -12 -16 -18 -16 -13 0 6 -7 1 -16 -10 -8 -11 -19 -20 -23 -20
-5 0 -41 -31 -81 -70 -152 -149 -246 -313 -305 -530 -9 -33 -19 -67 -22 -75
-2 -8 -40 91 -82 220 -84 252 -154 443 -226 615 -25 59 -45 109 -45 109 0 1
33 -1 73 -5 39 -4 74 -5 76 -3 10 9 -10 14 -81 20 l-76 7 -56 124 c-32 69 -55
127 -53 129 2 2 54 12 115 21 62 9 112 20 112 25 0 11 -7 10 -133 -11 l-108
-18 -108 216 c-118 237 -208 403 -223 412 -5 3 -9 9 -9 13 2 17 0 24 -17 42
-18 19 -22 27 -22 42 0 5 -10 19 -22 32 -13 14 -22 27 -21 30 5 9 -68 120 -78
120 -6 0 -7 5 -4 10 3 6 -1 13 -9 16 -9 3 -14 10 -11 14 3 5 -4 15 -15 23 -11
7 -17 17 -14 20 4 4 -1 9 -10 13 -9 3 -14 10 -11 14 3 5 -5 16 -17 25 -13 8
-23 19 -23 24 0 11 -7 19 -106 123 -40 42 -76 75 -80 72 -4 -2 -12 3 -19 11
-17 20 -43 19 -63 -3z m-227 -821 c12 -23 -2 -43 -52 -77 -24 -16 -59 -41 -78
-56 -76 -58 -117 -41 -127 54 -4 39 -2 57 8 65 13 11 147 29 212 30 16 0 32
-7 37 -16z m-415 -58 c3 -9 8 -43 12 -75 l6 -58 -44 0 c-50 0 -182 35 -187 49
-2 6 -9 8 -17 5 -14 -6 -28 11 -32 37 -4 26 22 41 74 45 27 2 73 7 103 12 63
9 76 7 85 -15z m646 -230 c12 -31 6 -133 -9 -174 -26 -68 -110 -128 -181 -129
-30 0 -33 2 -27 25 8 31 -16 90 -42 104 -36 19 -88 13 -120 -14 l-30 -25 -22
30 c-29 40 -42 136 -23 156 8 8 20 14 26 15 7 0 80 9 162 19 83 9 174 18 203
19 49 1 53 -1 63 -26z m-607 -73 c21 -53 20 -126 -3 -175 -34 -73 -120 -135
-188 -135 -26 0 -28 2 -28 45 0 35 -6 50 -28 72 -37 38 -103 39 -141 4 l-26
-24 -21 48 c-12 26 -24 65 -26 86 -7 51 -2 53 237 88 107 16 198 29 201 30 4
1 14 -17 23 -39z m387 -351 c66 -52 88 -121 52 -161 -30 -33 -82 -18 -108 32
-23 44 -18 160 7 160 6 0 28 -14 49 -31z m-662 -73 c17 -68 14 -120 -9 -148
-27 -35 -55 -40 -85 -16 -28 22 -34 72 -14 111 13 25 80 97 90 97 4 0 12 -20
18 -44z m316 4 c-21 -22 -47 -42 -57 -46 -20 -6 -138 34 -138 47 0 5 3 9 8 9
4 1 30 7 57 15 28 7 77 14 110 14 l59 1 -39 -40z m233 -2320 c-4 -217 -14
-249 -96 -301 -41 -26 -54 -30 -100 -26 -90 7 -140 60 -167 180 -9 40 -18 88
-20 108 -1 20 -5 41 -8 46 -3 4 -8 28 -12 53 -4 25 -9 48 -11 52 -3 4 -7 28
-9 53 l-5 47 35 -31 c49 -43 75 -40 126 14 24 25 48 45 55 45 6 0 32 -12 58
-26 56 -31 84 -27 124 17 l27 31 3 -38 c2 -22 2 -122 0 -224z m82 214 c0 -7 9
-18 19 -24 22 -11 55 -2 99 29 54 38 69 37 118 -13 25 -25 49 -46 55 -46 5 0
28 9 50 20 22 12 43 19 47 16 5 -3 6 -21 4 -40 -2 -20 -8 -34 -12 -31 -4 2 -5
-7 -2 -20 2 -14 0 -25 -4 -25 -5 0 -9 -10 -10 -22 -3 -85 -37 -246 -64 -299
-53 -102 -178 -119 -264 -36 -59 57 -66 90 -67 309 0 245 -2 223 16 208 8 -7
15 -18 15 -26z"/>
              <path d="M1716 3792 c-3 -5 1 -9 9 -9 8 0 12 4 9 9 -3 4 -7 8 -9 8 -2 0 -6 -4
-9 -8z"/>
              <path d="M941 793 c-1 -63 3 -103 9 -103 12 0 12 95 1 160 -7 37 -9 27 -10
-57z"/>
              <path d="M1146 743 c-26 -52 -45 -98 -42 -101 8 -8 9 -7 60 95 25 51 42 94 38
97 -5 3 -29 -38 -56 -91z"/>
              <path d="M680 815 c0 -15 92 -186 98 -181 7 8 -79 186 -90 186 -4 0 -8 -2 -8
-5z"/>
              <path d="M908 585 c-2 -2 -39 -6 -83 -9 -44 -3 -90 -8 -102 -10 -11 -3 -42 -8
-68 -12 -43 -6 -107 -45 -95 -57 25 -26 510 -37 645 -15 39 6 79 11 91 12 24
1 31 38 10 55 -22 19 -115 31 -258 35 -76 2 -139 2 -140 1z"/>
              <path d="M1420 396 c0 -11 30 -66 36 -66 2 0 -3 15 -12 33 -19 36 -24 44 -24
33z"/>
              <path d="M480 341 c0 -6 4 -13 10 -16 6 -3 7 1 4 9 -7 18 -14 21 -14 7z" />
              <path d="M443 300 c-6 -16 -8 -30 -3 -30 4 0 11 11 14 25 4 16 11 23 18 19 7
-4 8 -3 4 4 -12 19 -21 14 -33 -18z"/>
              <path d="M1460 315 c0 -5 5 -17 10 -25 5 -8 10 -10 10 -5 0 6 -5 17 -10 25 -5
8 -10 11 -10 5z"/>
              <path d="M1469 251 c-8 -50 -114 -78 -374 -101 -154 -13 -297 -13 -466 1 -158
12 -194 27 -194 77 0 18 -3 32 -7 32 -5 0 -8 -15 -8 -33 0 -72 47 -84 370 -93
220 -6 427 8 578 40 70 14 117 50 110 82 -4 16 -5 15 -9 -5z"/>
            </g>
          </svg>

        </div>
      </div>
    );
  }
  if(error){
    router.push("/")
  }
  console.log(cart)
  return (
    <>
      <section className="flex flex-col lg:mt-[--nav-spc] mt-12">
        <div className="flex gap-3 justify-center align-center text-3xl my-4 ">
          <span className="relative">
            <div className="absolute flex justify-center items-center text-sm top-0 right-0 w-4 h-4 rounded-full bg-[#333] text-white">{noOfProduct}</div>
            <HiOutlineShoppingBag />
          </span>
        <p>My Bag</p>
        </div>
        <div className="flex w-full flex-wrap  justify-between h-[100%] flex-wap">
          <div className="w-[60%] max-lg:w-full max-lg:px-20 max-md:px-5 "> 
          {cart?.map((items)=><CartDetail id={items._id}  key={items._id} title={items?.productID.productName} price={items?.productID.productPrice} stock={items?.productID.productQuantity} quantity={items.productQuantity} img={items.productID.productImage[0]} cart={cart} loading={loading}/>)}
          </div>
          <div className="w-[35%] px-10 max-lg:w-full max-lg:px-20 max-md:px-5">
            <PriceCheckOut />
          </div>
        </div>
      </section> 
    </>
  );
};

export default ShoppingCart;