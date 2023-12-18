import Promocode from "@backend/model/Promocode";
import { NextResponse } from "next/server";
import connectDB from "@backend/DATABASE/ConnectDB";
import { outhRoles } from "@backend/middlewere/outhRoles";
import isOauth from "@backend/middlewere/isOauth";


export async function POST(request) {
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
        const { promocode, discount, maxDiscount, minOrder, maxOrder, startDate, endDate, active } = request.body;
        if (!promocode || !discount || !maxDiscount || !minOrder || !maxOrder || !startDate || !endDate || !active) {
            return NextResponse.json({ success: false, message: "Please Provide All Fields" }, { status: 400 });
        }
        const newPromocode = new Promocode({
            promocode, discount, maxDiscount, minOrder, maxOrder, startDate, endDate, active
        });
        const savePromocode = await newPromocode.save();
        if (!savePromocode) {
            return NextResponse.json({ success: false, message: "Promocode Not Saved" }, { status: 400 });
        }
        return NextResponse.json({ success: true, message: "Promocode Saved", data: savePromocode }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

}