import { NextResponse } from "next/server";
import axios from "axios";


export async function POST(request, context) {
  try {
    const { latitude, longitude } = await request.json();
  const url = `${process.env.BGDATAURL}?q=${latitude}%2C${longitude}&key=${process.env.BIGDATACLOUDKEY}`;
  const getaddress = await axios.get(url);

  const adress ={
    country : getaddress.data.results[0].components.country,
    city : getaddress.data.results[0].components.city,
    state : getaddress.data.results[0].components.state,
    pincode : getaddress.data.results[0].components.postcode,
    District : getaddress.data.results[0].components.state_district,
    street: getaddress.data.results[0].components.suburb,
  }
  return NextResponse.json(
    { success: true, message: "GeoCoding", data:adress },
    { status: 200 }
  );
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
    
  }
}
