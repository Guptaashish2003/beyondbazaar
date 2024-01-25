
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import heroSlide from "@/backend/model/heroSlide";

export async function GET(request) {
    await connectDB();
    try {
        const hero = await heroSlide.find({})
        return NextResponse.json({ success: true, message: "all slide", data: hero }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}