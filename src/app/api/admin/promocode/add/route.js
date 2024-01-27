import Promocode from "@/backend/model/Promocode"
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";

export async function POST(request) {
    await connectDB();
    try {
        const  user  = await isOauth(request);
        console.log(user)
        if(user.role ==undefined){
            return NextResponse.json({ success: false, message: "token is expired login again" }, { status: 400 });
        }
       
        if (!user) {
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
        }
       
        const role =  outhRoles(["admin"], request);

        if (!role) {
            return NextResponse.json({ success: false, message: "You are not Authorized" }, { status: 400 });
        }
        const { promocode,discountType, discountValue, maxDiscount, minOrder, maxOrder, startDate, endDate, active,limit, product, category } = await request.json();
        // if (!promocode || !discountType || !limit ||  !discountValue || !maxDiscount || !minOrder || !maxOrder || !startDate || !endDate || !active ) {
        //     return NextResponse.json({ success: false, message: "Please Provide All Fields" }, { status: 400 });
        // }
    
        const newPromocode = await  Promocode.create({ promocode,discountType, discountValue, maxDiscount, minOrder, maxOrder, startDate:Date.now(), endDate:Date.now(), active,limit, product, category });

        return NextResponse.json({ success: true, message: "Promocode created", data: newPromocode }, { status: 200 });
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });     
    }
}