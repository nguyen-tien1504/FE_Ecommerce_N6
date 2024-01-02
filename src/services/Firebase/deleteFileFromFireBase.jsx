import { deleteObject, ref } from "firebase/storage";
import { storage } from "./fireBaseInit";

const deleteFileFromFireBase = async (fileUrl) => {
  const storageRef = ref(storage, fileUrl);
  //   console.log((await getMetadata(storageRef)).name);
  deleteObject(storageRef)
    .then(() => {
      // File deleted successfully
      console.log("first");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error);
    });
};
export default deleteFileFromFireBase;
