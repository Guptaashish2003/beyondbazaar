import Promocode from "@/backend/model/Promocode";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
 // delete promocode

export async function DELETE(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const role =  outhRoles(["admin"], request);
        if (!role) {
            return NextResponse.json({ success: false, message: "You are not Authorized" }, { status: 400 });
        }
        const { id } = request.body;
        if (!id) {
            return NextResponse.json({ success: false, message: "Please Provide All Fields" }, { status: 400 });
        }
        const deletePromocode = await Promocode.findByIdAndDelete(id);
        if (!deletePromocode) {
            return NextResponse.json({ success: false, message: "Promocode Not Deleted" }, { status: 400 });
        }
        return NextResponse.json({ success: true, message: "Promocode Deleted", data: deletePromocode }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}