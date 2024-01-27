import Order from "@/backend/model/Order";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
import Apifeatures from "@/backend/utils/apiFeatures";

export async function GET(request) {
    await connectDB();
    try {
        const  user  = await isOauth(request);
        if (!user) {
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
        }
        const role =  outhRoles(["admin"], request);
        if (!role) {
            return NextResponse.json({ success: false, message: "You are not Authorized" }, { status: 400 });
        }
        
        const rawParams = request.url.split('?')[1];
        const page = new URLSearchParams(rawParams).get('page')
        const limit = new URLSearchParams(rawParams).get('limit')
        const apiFeatures = new Apifeatures(Order.find(),{page,limit})
        .paginate()
      const orders = await apiFeatures.query.populate({
        path: 'orderItems',
        populate: [
          {
            path: 'product',
            select: 'productName productImage ',
          },
        ],
      });
        if (!orders) {
            return NextResponse.json({ success: false, message: "Order Not Found" }, { status: 400 });
        }
        let newOrder = orders.map((val)=>{
            return val.orderItems.map((inside)=>{return ({...inside._doc,ctmName:val.shippingInfo.name,number:val.shippingInfo.number,mainId:val._id,itemsPrice:val.itemsPrice,shippingInfo:`${val.shippingInfo.street} ${val.shippingInfo.city}`})})
         })
         newOrder = newOrder.flat();
        let lenOrder = await Order.countDocuments(); 
        lenOrder = lenOrder + newOrder.length
        return NextResponse.json({ success: true, length: lenOrder, message: "Order Found", data: newOrder }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}