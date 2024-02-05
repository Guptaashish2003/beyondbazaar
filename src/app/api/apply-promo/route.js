import Promocode from "@/backend/model/Promocode"
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import isOauth from "@/backend/middlewere/isOauth";

function calculateDiscount(promoCodeType,discountValue, totalOrderValue,maxDiscount=0) {
   if(promoCodeType === "Percentage") {
    if (maxDiscount < 0 && ((discountValue/100)*totalOrderValue)>maxDiscount) {
        return maxDiscount;
    }else{
       return ((discountValue/100)*totalOrderValue); 
    }
}
   if(promoCodeType === "Fixed") return (totalOrderValue-discountValue)
//    if(promoCodeType === "FreeShipping") return ((discountValue/100)*totalOrderValue)
   
  }
export async function POST(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const { promocode,orderItems,totalPrice,category } = await request.json();
        // if (!promocode || !orderItems  ) {
        //     return NextResponse.json({ success: false, message: "promo code not exist" }, { status: 400 });
        // }
        const promocodeDoc = await Promocode.findOne({
            promocode: promocode,
            active: true,
            startDate: { $lte: new Date() },
            endDate: { $gte: new Date() },
            limit: { $gte: 0 },
            maxOrder: { $gte: totalPrice },
          });
          if (!promocodeDoc ) {
              return NextResponse.json({ success: false, message: "Invalid or inactive promo code" }, { status: 404 });
            }
            if (promocodeDoc.userRestriction.includes(check._id)) {
              return NextResponse.json({ success: false, message: "User not eligible for this promo code" }, { status: 403 });
            }
            let validProducts;
            console.log(orderItems)
        if(!promocodeDoc.product.length !== 0) {
            validProducts = orderItems.every((item) => {
                const productId = item.product; // Assuming productId is available in cart items
                return promocodeDoc.product.includes(productId) || !promocodeDoc.product.length;
              });
        }
        if (!validProducts) {
            return NextResponse.json({ success: false, message: "not applicable for that product" }, { status: 403 });
          }
          const discountValue = calculateDiscount(promocodeDoc.discountType,promocodeDoc.discountValue,totalPrice,promocodeDoc.maxDiscount);
          const promo = {disCountId:promocodeDoc._id,discountValue};
        return NextResponse.json({ success: true, message: "Promocode created", data: promo }, { status: 200 });
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });     
    }
}