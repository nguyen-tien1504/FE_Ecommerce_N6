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

const noPermissionForAdmin = (message) => {
  return Swal.fire({
    icon: "error",
    timer: 2000,
    text: message,
    showConfirmButton: false,
  });
};

export { showAlert, noPermissionForAdmin };
