import Swal from "sweetalert2";

const showAlert = (message) => {
  Swal.fire({
    text: message,
    icon: "success",
    confirmButtonText: "Ok",
  });
};

export { showAlert };
