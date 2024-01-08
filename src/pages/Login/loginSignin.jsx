import { useState } from "react";
import "./style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../services/User/UserService/userApi";
import { login } from "../../services/User/UserSlice/userSlice";
const LoginSignin = () => {
  const [signup, setIsSignUp] = useState(false);
  const [handleRegisterUser] = useRegisterMutation();
  const [handleLoginUser] = useLoginMutation();
  const [cookies, setCookies] = useCookies(["user"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleToggleSignUp = () => {
    setIsSignUp(!signup);
  };

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Not a valid email!!!"
        )
        .required("Email is required."),
      password: Yup.string()
        .min(4, "Mininum 4 characters")
        .required("Password is required."),
    }),
    onSubmit: (values) => {
      handleLoginUser(values)
        .then(({ data }) => {
          setCookies("user", data);
          dispatch(login(values));
          navigate("/");
        })
        .catch((err) => console.log(err));
    },
  });
  const signUpformik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      phone: "",
      address: "",
      ward: "",
      district: "",
      city: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(4, "Mininum 4 characters").required("Name is required!"),
      password: Yup.string()
        .min(4, "Mininum 4 characters")
        .required("Password is required."),
      email: Yup.string()
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Not a valid email!!!"
        )
        .required("Email is required."),
      phone: Yup.string().matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        "Not a valid phone number"
      ),
    }),

    onSubmit: (values) => {
      handleRegisterUser(values)
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
    },
  });

  return (
    <>
      <div className={`login-container ${signup && "sign-up-mode"}`}>
        <div className="forms-container">
          <div className="signin-signup">
            {/* -------------------- Login ------------------- */}
            <form
              action=""
              className="sign-in-form"
              onSubmit={loginFormik.handleSubmit}>
              <h2 className="title">Sign In</h2>
              <div className="input-field">
                <span className="icon icon-envelope-o d-flex justify-content-center align-items-center"></span>
                <input
                  type="text"
                  placeholder="User email"
                  name="email"
                  value={loginFormik.values.email}
                  onChange={loginFormik.handleChange}
                />
              </div>
              {loginFormik.errors.email && loginFormik.touched.email && (
                <div className="">{loginFormik.errors.email}</div>
              )}
              <div className="input-field">
                <span className="icon icon-lock d-flex justify-content-center align-items-center"></span>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginFormik.values.password}
                  onChange={loginFormik.handleChange}
                />
              </div>
              {loginFormik.errors.password && loginFormik.touched.password && (
                <div className="">{loginFormik.errors.password}</div>
              )}
              <input
                type="submit"
                value="Login"
                className="btn solid"
              />

              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a
                  href="#"
                  className="social-icon">
                  <span className="icon icon-facebook"></span>
                </a>
                <a
                  href="#"
                  className="social-icon">
                  <span className="icon icon-twitter"></span>
                </a>
                <a
                  href="#"
                  className="social-icon">
                  <span className="icon icon-google"></span>
                </a>
                <a
                  href="#"
                  className="social-icon">
                  <span className="icon icon-linkedin"></span>
                </a>
              </div>
            </form>

            {/* -------------------- Signup ------------------- */}
            <form
              action=""
              className="sign-up-form"
              onSubmit={signUpformik.handleSubmit}>
              <h2 className="title">Sign Up</h2>
              <div className="d-flex flex-wrap">
                <div className="col-6 px-2">
                  <div className="input-field">
                    <span className="icon icon-user d-flex justify-content-center align-items-center"></span>
                    <input
                      type="text"
                      placeholder="Username"
                      name="name"
                      onChange={signUpformik.handleChange}
                      value={signUpformik.values.name}
                    />
                  </div>
                  {signUpformik.errors.name && signUpformik.touched.name && (
                    <div className="">{signUpformik.errors.name}</div>
                  )}
                </div>
                <div className="col-6 px-2">
                  <div className="input-field">
                    <span className="icon icon-envelope-o d-flex justify-content-center align-items-center"></span>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      onChange={signUpformik.handleChange}
                      value={signUpformik.values.email}
                    />
                  </div>
                  {signUpformik.errors.email && signUpformik.touched.email && (
                    <div className="">{signUpformik.errors.email}</div>
                  )}
                </div>
                <div className="col-6 px-2">
                  <div className="input-field ">
                    <span className="icon icon-lock d-flex justify-content-center align-items-center"></span>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={signUpformik.handleChange}
                      value={signUpformik.values.password}
                    />
                  </div>
                  {signUpformik.errors.password && signUpformik.touched.password && (
                    <div className="">{signUpformik.errors.password}</div>
                  )}
                </div>
                <div className="col-6 px-2">
                  <div className="input-field">
                    <span className="icon icon-phone d-flex justify-content-center align-items-center"></span>
                    <input
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      onChange={signUpformik.handleChange}
                      value={signUpformik.values.phone}
                    />
                  </div>
                  {signUpformik.errors.phone && signUpformik.touched.phone && (
                    <div className="">{signUpformik.errors.phone}</div>
                  )}
                </div>
                <div className="col-6 px-2">
                  <div className="input-field">
                    <span className="icon icon-address-card d-flex justify-content-center align-items-center"></span>
                    <input
                      type="text"
                      placeholder="Address"
                      name="address"
                      onChange={signUpformik.handleChange}
                      value={signUpformik.values.address}
                    />
                  </div>
                </div>
                <div className="col-6 px-2">
                  <div className="input-field">
                    <span className="icon icon-home d-flex justify-content-center align-items-center"></span>
                    <input
                      type="password"
                      placeholder="Ward"
                      name="ward"
                      onChange={signUpformik.handleChange}
                      value={signUpformik.values.ward}
                    />
                  </div>
                </div>
                <div className="col-6 px-2">
                  <div className="input-field">
                    <span className="icon icon-home d-flex justify-content-center align-items-center"></span>
                    <input
                      type="password"
                      placeholder="District"
                      name="district"
                      onChange={signUpformik.handleChange}
                      value={signUpformik.values.district}
                    />
                  </div>
                </div>
                <div className="col-6 px-2">
                  <div className="input-field">
                    <span className="icon icon-home d-flex justify-content-center align-items-center"></span>
                    <input
                      type="password"
                      placeholder="City"
                      name="city"
                      onChange={signUpformik.handleChange}
                      value={signUpformik.values.city}
                    />
                  </div>
                </div>
              </div>
              <input
                type="submit"
                value="Sign Up"
                className="btn solid"
              />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a
                  href="#"
                  className="social-icon">
                  <span className="icon icon-facebook"></span>
                </a>
                <a
                  href="#"
                  className="social-icon">
                  <span className="icon icon-twitter"></span>
                </a>
                <a
                  href="#"
                  className="social-icon">
                  <span className="icon icon-google"></span>
                </a>
                <a
                  href="#"
                  className="social-icon">
                  <span className="icon icon-linkedin"></span>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio minus natus
                est.
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={handleToggleSignUp}>
                Sign Up
              </button>
            </div>
            <img
              src="../../../public/images/log.svg"
              className="image"
              alt=""
            />
          </div>

          <div className="panel right-panel">
            <div className="content">
              <h3>One of us?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio minus natus
                est.
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={handleToggleSignUp}>
                Sign In
              </button>
            </div>
            <img
              src="../../../public/images/register.svg"
              className="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignin;
