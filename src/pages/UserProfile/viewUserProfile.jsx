import { useFormik } from "formik";
import React from "react";
import { useCookies } from "react-cookie";
import {
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} from "../../services/User/UserService/userApi";

const ViewUserProfile = () => {
  const [cookies] = useCookies(["user"]);
  const { data, isSuccess } = useGetUserByEmailQuery(cookies.user?.email);
  const [handleEditUserProfile] = useUpdateUserMutation();

  const userProfileFormilk = useFormik({
    enableReinitialize: true,
    initialValues: data,
    onSubmit: (values) => {
      handleEditUserProfile(values)
        .unwrap()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  });
  // ??? :))
  if (!isSuccess || !userProfileFormilk.values) {
    return <div className="px-5 m-5">...Loading</div>;
  }

  return (
    <>
      <form
        className="mt-5"
        onSubmit={userProfileFormilk.handleSubmit}>
        <div className="row mb-4 w-75">
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                name="phone"
                placeholder="Phone number"
                onChange={userProfileFormilk.handleChange}
                value={userProfileFormilk.values.phone || ""}
              />
              <label className="form-label">Phone number</label>
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                onChange={userProfileFormilk.handleChange}
                value={userProfileFormilk.values.address || ""}
                name="address"
                placeholder="Address"
              />
              <label className="form-label">Address</label>
            </div>
          </div>
        </div>

        <div className="row mb-4 w-75">
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                onChange={userProfileFormilk.handleChange}
                value={userProfileFormilk.values.ward || ""}
                name="ward"
                placeholder="Ward"
              />
              <label className="form-label">Ward</label>
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                onChange={userProfileFormilk.handleChange}
                value={userProfileFormilk.values.district || ""}
                name="district"
                placeholder="District"
              />
              <label className="form-label">District</label>
            </div>
          </div>
        </div>

        <div className="row mb-4 w-75">
          <div className="col-6">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                onChange={userProfileFormilk.handleChange}
                value={userProfileFormilk.values.city || ""}
                name="city"
                placeholder="City"
              />
              <label className="form-label">City</label>
            </div>
          </div>
        </div>

        <div className="row mb-5 w-75 align-items-center flex-column">
          <input
            type="submit"
            className="btn btn-primary btn-block col-3"
            value={"Save changes"}
          />
        </div>
      </form>
    </>
  );
};

export default ViewUserProfile;
