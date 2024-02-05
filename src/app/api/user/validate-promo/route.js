import Promocode from "@/backend/model/Promocode";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
//validate promocode for particular user, partucular product and particular category
export async function GET(request) {

    await connectDB();
    try {
        const { promocode, user, product, category } = request.query;
        if (!promocode || !user || !product || !category) {
            return NextResponse.json({ success: false, message: "Please Provide All Fields" }, { status: 400 });
        }
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const role =  outhRoles(["user"], request);
        if (!role) {
            return NextResponse.json({ success: false, message: "You are not Authorized" }, { status: 400 });
        }
        const validatePromocode = await Promocode.findOne({ promocode, user, product, category });
        if (!validatePromocode) {
            return NextResponse.json({ success: false, message: "Promocode Not Found" }, { status: 400 });
        }
        return NextResponse.json({ success: true, message: "Promocode Found", data: validatePromocode }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}