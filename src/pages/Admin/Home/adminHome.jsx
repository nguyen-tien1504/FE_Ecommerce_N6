import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { noPermissionForAdmin } from "../../../services/Alert/Alert";

const AdminHome = () => {
  const [cookies] = useCookies(["user"]);
  const [visible, setVisible] = useState(false);
  const token = cookies.user.accessToken;
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://103.90.228.14:8080/api/auth/authorization", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.role !== "ROLE_ADMIN") {
          const alert = noPermissionForAdmin(
            "You do not have permission. Please login again"
          ).then((result) => navigate("/"));
        } else {
          setVisible(true);
        }
      })
      .catch((err) => {
        setVisible(false);
      });
  }, []);
  if (visible)
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
};

export default AdminHome;
