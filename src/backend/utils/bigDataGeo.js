import axios from "axios";
import { NextResponse } from "next/server";
import bigDataCloud from "../DATABASE/BigDataCloud";
async function GeoCoding(latitude, longitude) {
  // Load environment variables (if applicable)
  console.log("BIGDATACLOUDKEY:", bigDataCloud);


  console.log("apiKey:", bigDataCloud.apiKey); // Verify if apiKey is defined first

  console.log("latitude,longitude:", latitude, longitude);

  try {
    const url = `https://api-bdc.net/data/reverse-geocode-with-timezone?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=bdc_b1ad4d66848544e7a3a1397ef103599d`;
    console.log("url:", url); // Verify url construction

    const response = await axios.get(url);
    console.log("respo.....nse:", response); // Check for network errors

    return NextResponse.json({ success: true, message: "GeoCoding", data: response }, { status: 200 });
  } catch (error) {
    console.error("Error:", error); // Log the error object for debugging
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export default GeoCoding;
