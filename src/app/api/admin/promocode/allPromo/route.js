import Promocode from "@/backend/model/Promocode";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
import Apifeatures from "@/backend/utils/apiFeatures";

export async function GET(request) {
    await connectDB();
    try {
        const  user  = await isOauth(request);
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
        
        const rawParams = request.url.split('?')[1];
        const page = new URLSearchParams(rawParams).get('page')
        const limit = new URLSearchParams(rawParams).get('limit')
        const apiFeatures = new Apifeatures(Promocode.find(),{page,limit})
        .paginate()
      const promocodes = await apiFeatures.query;
        if (!promocodes) {
            return NextResponse.json({ success: false, message: "Promocode Not Found" }, { status: 400 });
        }
        const lenPromocode = await Promocode.countDocuments();
        return NextResponse.json({ success: true, length: lenPromocode, message: "Promocode Found", data: promocodes }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}