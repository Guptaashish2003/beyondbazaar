import Promocode from "@backend/model/Promocode";
import { NextResponse } from "next/server";
import connectDB from "@backend/DATABASE/ConnectDB";
import { outhRoles } from "@backend/middlewere/outhRoles";
import isOauth from "@backend/middlewere/isOauth";

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
        
        const promocodes = await Promocode.find({}).sort({ createdAt: -1 });
        if (!promocodes) {
            return NextResponse.json({ success: false, message: "Promocode Not Found" }, { status: 400 });
        }
        const lenPromocode = promocodes.length;
        return NextResponse.json({ success: true, length: lenPromocode, message: "Promocode Found", data: promocodes }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}