import { deleteObject, ref } from "firebase/storage";
import { storage } from "./fireBaseInit";

const deleteFileFromFireBase = async (fileUrl) => {
  const storageRef = ref(storage, fileUrl);
  deleteObject(storageRef)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};
export default deleteFileFromFireBase;
