import Bookmark from "@/backend/model/Bookmark";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection

export async function DELETE(request) {
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
        const bookmark = await Bookmark.deleteOne({
            productID,
            userID
        });
        return NextResponse.json({ success: true, data: bookmark }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
        
    }
}