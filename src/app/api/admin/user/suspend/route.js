import User from "@/backend/model/User";
import connectDB from "@/backend/DATABASE/ConnectDB";
import isOauth from "@/backend/middlewere/isOauth";
import { outhRoles} from "@/backend/middlewere/outhRoles";
import { NextResponse } from "next/server";
// suspend and unsuspend user api


export default async function PUT(req) {
    await connectDB();
    try {
        const admin = await isOauth(req);
        if (!admin) {
            return NextResponse.status(400).json({ success: false, message: "User Not Found" });
        }
        const role = outhRoles(["admin"], req);
        if (!role) {
            return NextResponse.status(400).json({ success: false, message: "You are not Authorized" });
        }
        const { id } = req.query;
        const { suspend } = req.body;
        if (!id) {
            return NextResponse.status(400).json({ success: false, message: "User Not Found" });
        }
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.status(400).json({ success: false, message: "User Not Found" });
        }
        if (suspend) {
            user.suspend = true;
            await user.save();
            return NextResponse.status(200).json({ success: true, message: "User Suspended" });
        }
        user.suspend = false;
        await user.save();
        return NextResponse.status(200).json({ success: true, message: "User Unsuspended" });
        
    } catch (error) {
        return NextResponse.status(400).json({ success: false, message: error.message });
        
    }
}