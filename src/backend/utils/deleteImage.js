

import { getStorage, ref, deleteObject } from "firebase/storage";
export async function deleteImage(imageUrl) {
  const storage = getStorage();

  try {
    // Extract the file path from the URL
    const filePath = imageUrl.split('?')[0]; // Remove query parameters
    // console.log(filePath,"filePath")
    const fileName = imageUrl.split('/').pop();
    // console.log(fileName,"fileName")
    // Create a reference to the file
    const imageRef = ref(storage, filePath);

    // Delete the file
    await deleteObject(imageRef);

    return "Image deleted successfully";
  } catch (error) {
    // console.error("Error deleting image:", error);
    return error;
  }
}
