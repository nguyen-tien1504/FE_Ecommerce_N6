import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./fireBaseInit";

const postFileToFireBase = async (file) => {
  const storageRef = ref(storage, "ATC_N6/" + file.name);
  // Upload the file and metadata
  const uploadTask = uploadBytesResumable(storageRef, file);
  return await uploadTask
    .then(() => getDownloadURL(storageRef))
    .catch((err) => console.log(err));
};

export default postFileToFireBase;
