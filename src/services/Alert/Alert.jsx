import Swal from "sweetalert2";

const showAlert = (message) => {
  Swal.fire({
    text: message,
    icon: "success",
    confirmButtonText: "Ok",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
    }
  });
};

export { showAlert };
