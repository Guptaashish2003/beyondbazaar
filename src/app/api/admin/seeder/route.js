import Product from "@/backend/model/Product.js";
import User from "@/backend/model/User";
import { NextResponse } from "next/server"
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
import ConnectDB from "@/backend/DATABASE/ConnectDB";
import userdata from "@/Data/user.json";
import product from "@/Data/product.json";
import Category from "@/backend/model/Category";
import category from "@/Data/category.json";
import SubCategory from "@/backend/model/SubCategory";
import subCategory from "@/Data/subCategory.json";
export async function GET(request){
    await ConnectDB();
    try {
        // const  user  = await isOauth(request);
        // if (!user) {
        //     return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
        // }
        // const role =  outhRoles(["admin"], request);
        // if (!role) {
        //     return NextResponse.json({ success: false, message: "You are not Authorized" }, { status: 400 });
        // }

        // await User.deleteMany();
        await Product.deleteMany();
        // await Category.deleteMany();
        // await SubCategory.deleteMany();
        console.log("all Data deleted...")
        // await User.insertMany(userdata)
        // await Product.insertMany(product)

        for (let i = 0; i < product.length; i++) {  //insert product using  for loop by creating a unique slug of the product
            const element = product[i];
            await Product.create(element);  
        }



        //--------------------subcategory --------------------------------------



        // for (let i = 0; i < subCategory.length; i++) {  //insert product using  for loop by creating a unique slug of the product
        //     const element = subCategory[i];
        //     await SubCategory.create(element);  
        // }
        




        // for (let i = 0; i < category.length; i++) {  //insert product using  for loop by creating a unique slug of the product
        //     const element = category[i];
        //     await Category.create(element);  
        // }
        // await Category.insertMany(category)
        // await SubCategory.insertMany(subCategory)
       return NextResponse.json({success:true,message:"Data added successfully"},{status:200})
        
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({success:true,message:error.message},{status:200})
        
    }
  
}
