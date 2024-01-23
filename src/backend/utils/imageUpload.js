
import { uploadBytes,getDownloadURL } from 'firebase/storage';
import { ref } from 'firebase/storage';
import {storage} from "@/backend/DATABASE/firebaseConfig"

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + time;
  return dateTime;
}

export async function imageUpload(data,path) {
  try {

    const formData = data;
  const files = formData.get("file");
    console.log(files,"files")
    const dateTime = giveCurrentDateTime();
    console.log(dateTime,"dateTime")

    const filename = `${path}/${dateTime}${files.name}`;
    const imageRef = ref(storage, filename);
    const response = await uploadBytes(imageRef, files);
      const imageUrl = await getDownloadURL(response.ref);
      console.log(imageUrl);

    // Return a valid response
    return imageUrl;

  } catch (error) {
    // Handle errors and return an appropriate response
    console.error(error);
    return error;
  }
}
