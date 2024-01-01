
import connectDB from "@/backend/DATABASE/ConnectDB"; // database connection
import product from "@/Data/product.json";
import { NextResponse } from "next/server";
import { uploadBytes,getDownloadURL } from 'firebase/storage';
import { ref } from 'firebase/storage';
import {storage} from "@/backend/DATABASE/firebaseConfig"

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
}

export async function POST(request) {
  await connectDB();
  try {

    const formData = await request.formData();
  const files = formData.get("file");
    console.log(files,"files")
    const dateTime = giveCurrentDateTime();

    const filename = `images/${dateTime}${files.name}`;
    const imageRef = ref(storage, filename);
    const response = await uploadBytes(imageRef, files);
      const imageUrl = await getDownloadURL(response.ref);
      console.log(imageUrl);

    // Return a valid response
    return NextResponse.json({ success: true, data:imageUrl }, { status: 200 });

  } catch (error) {
    // Handle errors and return an appropriate response
    console.error(error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 400 });
  }
}
