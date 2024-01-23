import { NextResponse } from "next/server";

export const outhRoles = (role, request) => {
    console.log(request.user.role)
        if (role.includes(request.user.role)) {

            return true;
        } else {
           return false;
        }
    }
