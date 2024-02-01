import {app} from "@/backend/DATABASE/firebaseConfig"
import {  uploadBytes,getDownloadURL,getStorage, ref, deleteObject } from "firebase/storage";
const storage = getStorage(app);
const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + time;
  return dateTime;
}
// storage.maxUploadRetryTime = 120000;
export const imageUpload = (data,path) => {
  
  const formData = data;
  const file = formData.get("file");
    console.log(file,path,"files")
    const dateTime = giveCurrentDateTime();
    console.log(dateTime,"dateTime")
    console.log(storage)
    // const name = `${path}/${dateTime}${file.name}`;
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {console.log(error)},
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log(downloadURL)
         return (downloadURL);
      });
    }
  );
};
export async function deleteImage(imageUrl) {

  try {
    // Extract the file path from the URL
    const filePath = imageUrl.split('?')[0]; // Remove query parameters
    console.log(filePath,"filePath")
    const fileName = imageUrl.split('/').pop();
    console.log(fileName,"fileName")
    // Create a reference to the file
    const imageRef = ref(storage, filePath);

    // Delete the file
    await deleteObject(imageRef);

    return "Image deleted successfully";
  } catch (error) {
    console.error("Error deleting image:", error);
    return error;
  }
}