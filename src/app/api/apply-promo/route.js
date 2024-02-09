import Promocode from "@/backend/model/Promocode"
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import isOauth from "@/backend/middlewere/isOauth";
import Cart from "@/backend/model/Cart";
import Product from "@/backend/model/Product";

export function calculateDiscount(promoCodeType,discountValue, totalOrderValue,maxDiscount=0) {
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
        const { promocode,orderItems,method } = await request.json();
        if (!promocode || !orderItems || !method  ) {
            return NextResponse.json({ success: false, message: "promo code not exist" }, { status: 400 });
        }
        let totalPrice 
        if(method === "bycart") {
           const cart = await Cart.find({ userID:check._id }).populate("productID", "productPrice productQuantity");
           totalPrice = cart.reduce((acc, curr) =>{
            return acc + curr.productID.productPrice * curr.productQuantity;
         
         },0)
        }
        else if(method === "byproduct") {
          const product = await Product.findById(orderItems[0].product);
          console.log(product.productPrice)
          console.log(orderItems[0].qty)
          totalPrice = product.productPrice * Number(orderItems[0].qty);
        }
        const promocodeDoc = await Promocode.findOne({
            promocode: promocode.toUpperCase(),
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
        return NextResponse.json({ success: true, message: "Promocode added", data: promo }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });     
    }
}