import User from "@/backend/model/User";
import connectDB from "@/backend/DATABASE/ConnectDB";
import isOauth from "@/backend/middlewere/isOauth";
import { outhRoles} from "@/backend/middlewere/outhRoles";
import { NextResponse } from "next/server";
// suspend and unsuspend user api


export  async function PUT(req,context) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const role = outhRoles(["admin"], req);
        if (!role) {
            return  NextResponse.json({ success: false, message: "You are not Authorized" },{status: 404});
        }
        const { id } = context.params;
        const { suspend } = req.body;
        if (!id) {
            return  NextResponse.json({ success: false, message: "User Not Found" },{status: 404});
        }
        const user = await User.findById(id);
        if (!user) {
            return  NextResponse.json({ success: false, message: "User Not Found" },{status: 404});
        }
        if (suspend) {
            user.suspend = true;
            await user.save();
            return NextResponse.json({ success: true, message: "User Suspended" },{status: 200});
        }
        user.suspend = false;
        await user.save();
        return NextResponse.json({ success: true, message: "User Unsuspended" },{status: 200});
        
    } catch (error) {
        return  NextResponse.json({ success: false, message: error.message });
        
    }
}