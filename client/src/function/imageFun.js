import {ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
const uniqueIdentifier = `image_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

const uploadImage = async (fileName, file) => {
  try {
      // Create a reference to the storage bucket
      const storageRef = ref(storage, `${fileName.replace(/\s+/g, '')}/${uniqueIdentifier} ${file.name}`);
  
      // Upload the file to the storage bucket
      const snapshot = await uploadBytes(storageRef, file);

      // Get the download URL of the uploaded image
    
      return await getDownloadURL(snapshot.ref);

  } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Re-throw the error for handling in the caller function
  }
};


//   export {uploadImage}
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../firebase/firebase";

// const uniqueIdentifier = `image_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

// const uploadImage = async (fileName, file, progressCallback) => {
//   try {
//     // Create a reference to the storage bucket
//     const storageRef = ref(storage, `${fileName.replace(/\s+/g, '')}/${uniqueIdentifier} ${file.name}`);

//     // Upload the file to the storage bucket
//     const uploadTask = uploadBytes(storageRef, file);

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on("state_changed",
//       (snapshot) => {
//         // Get upload progress
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         progressCallback(progress);
//       },
//       (error) => {
//         // Handle unsuccessful uploads
//         console.error("Error uploading image:", error);
//         throw error; // Re-throw the error for handling in the caller function
//       },
//       () => {
//         // Handle successful uploads on complete
//         console.log("Upload complete");
//       });

//     // Wait for the upload task to complete
//     await uploadTask;

//     // Get the download URL of the uploaded image
//     return await getDownloadURL(storageRef);

//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw error; // Re-throw the error for handling in the caller function
//   }
// };

export { uploadImage };


  // .then(() => {
  //   console.log("Image uploaded successfully");
  // }).catch((error) => {
  //   console.error("Error uploading image:", error);
  // });