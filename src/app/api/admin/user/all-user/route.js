import User from "@/backend/model/User";
import connectDB from "@/backend/DATABASE/ConnectDB";
import isOauth from "@/backend/middlewere/isOauth";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import { NextResponse } from "next/server";
import Apifeatures from "@/backend/utils/apiFeatures";
//get all user data api

export async function GET(request) {
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
          const rawParams = request.url.split('?')[1];
          const page = new URLSearchParams(rawParams).get('page')
          const limit = new URLSearchParams(rawParams).get('limit')
          const apiFeatures = new Apifeatures(User.find(),{page,limit})
          .paginate()
        const users = await apiFeatures.query;
        if (!users) {
            return NextResponse.json({ success: false, message: "User Not Found" },{ status: 400 });
        }
        const lenUser = await User.countDocuments();
        return NextResponse.json({ success: true, length: lenUser, message: "User Found", data: users },{ status: 200 });
        
    } catch (error) {
        // console.error(error);
        return NextResponse.json({ success: false, message: error.message },{ status: 400 });
    }
}