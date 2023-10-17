import Favorite from "@/backend/model/Favorite";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection

//creating a new Favorite for all

export async function Delete(request) {
    await connectDB();
    try {

        const check =  await isOauth(request);
        if (!check._id) {
            return NextResponse.json(
              { success: false, message: "User Not Found" },
              { status: 400 }
            );
          }
        const data = await request.json();
        const { productID,userID } = data;
        if (!productID || !userID) {
            return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }
        const favorite = await Favorite.deleteOne({
            productID,
            userID
        });
        return NextResponse.json({ success: true, data: favorite }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}