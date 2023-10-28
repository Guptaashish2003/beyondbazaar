import { NextResponse } from "next/server";

export const outhRoles = (role, request) => {
        console.log(request.user.role,"ddd",role)
        if (role.includes(request.user.role)) {
            console.log(request.user.role,"dlkjkfe")
            return true;
        } else {
           return false;
        }
    }
