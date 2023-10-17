import Bookmark from "@/backend/model/Bookmark";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection

export default async function POST(req) {
    await connectDB();
    try {
        const check =  await isOauth(req);
        if (!check._id) {
            return NextResponse.json(
              { success: false, message: "User Not Found" },
              { status: 400 }
            );
          }
        const data = await req.json();
        const { productID,userID } = data;
        if (!productID || !userID) {
            return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }
        const bookmark = await Bookmark.create({
            productID,
            userID
        });
        return NextResponse.json({ success: true, data: bookmark }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });

        
    }
}
