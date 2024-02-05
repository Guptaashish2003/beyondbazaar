import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import Product from "@/backend/model/Product";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";

//update product

export async function PUT(request, context) {
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
    const data = await request.json();
    const id = context.params.id;
    console.log(data)
    const product = await Product.findByIdAndUpdate(id, {data});
    console.log(data,product)

    return NextResponse.json(
      { success: true, message: "Updated-successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
