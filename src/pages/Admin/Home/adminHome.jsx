import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/navbar";

const AdminHome = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AdminHome;
