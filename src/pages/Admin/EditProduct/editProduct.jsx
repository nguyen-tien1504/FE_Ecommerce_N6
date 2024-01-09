import { useNavigate, useParams } from "react-router-dom";

import { Field, FieldArray, Form, Formik, useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import deleteFileFromFireBase from "../../../services/Firebase/deleteFileFromFireBase";
import postFileToFireBase from "../../../services/Firebase/postFileToFireBase";
import {
  useEditProductMutation,
  useGetProductByIdQuery,
} from "../../../services/Product/productApi";

const EditProduct = () => {
  const { productId } = useParams();
  const [cookies] = useCookies(["user"]);
  const token = cookies.user.accessToken;
  const { data, isSuccess } = useGetProductByIdQuery(productId);
  const [productDetailList, setProductDetailList] = useState([]);
  const [handleEditProduct] = useEditProductMutation();
  const navigate = useNavigate();
  const productDetailFormik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    onSubmit: async (values) => {
      const { file, ...rest } = values;
      const dataSend = {
        ...rest,
        productDetails: [...productDetailList],
      };
      console.log(dataSend);

      if (file) {
        await deleteFileFromFireBase(dataSend.imageUrls);
        const imageURL = await postFileToFireBase(file);
        dataSend.imageUrls = imageURL;
      }

      handleEditProduct({ productId, dataSend, token })
        .then((resp) => navigate("/admin/products"))
        .catch((err) => console.log(err));
    },
  });

  // ??? :))
  if (!isSuccess || !productDetailFormik.values) {
    return <div className="px-5 m-5">...Loading</div>;
  }

  return (
    <>
      <form
        className="mt-5"
        onSubmit={productDetailFormik.handleSubmit}>
        <div className="row mb-4 w-75">
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                onChange={productDetailFormik.handleChange}
                value={productDetailFormik.values.name || ""}
                name="name"
              />
              <label className="form-label">Product name</label>
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                name="price"
                onChange={productDetailFormik.handleChange}
                value={productDetailFormik.values.price || ""}
              />
              <label className="form-label">Product price</label>
            </div>
          </div>
        </div>

        <div className="row mb-4 w-75">
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                onChange={productDetailFormik.handleChange}
                value={productDetailFormik.values.dimension || ""}
                name="dimension"
              />
              <label className="form-label">Dimension</label>
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                onChange={productDetailFormik.handleChange}
                value={productDetailFormik.values.weight || ""}
                name="weight"
              />
              <label className="form-label">Weight</label>
            </div>
          </div>
        </div>

        <div className="row mb-4 w-75">
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                onChange={productDetailFormik.handleChange}
                value={productDetailFormik.values.material || ""}
                name="material"
              />
              <label className="form-label">Material</label>
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <select
                className="form-control"
                onChange={productDetailFormik.handleChange}
                defaultValue={productDetailFormik.values.category || ""}
                name="category">
                <option value="Women">Women</option>
                <option value="Children">Children</option>
                <option value="Men">Men</option>
              </select>
              <label className="form-label">Category</label>
            </div>
          </div>
        </div>

        <div className="row mb-4 w-75">
          <div className="col">
            <div className="form-outline">
              <select
                type="text"
                placeholder="Product type"
                name="type"
                className="form-control"
                onChange={productDetailFormik.handleChange}
                defaultValue={productDetailFormik.values.type || ""}>
                <option value="sneaker">Sneaker</option>
                <option value="dress">Dress</option>
                <option value="pants">Pants</option>
                <option value="shirt">Shirt</option>
              </select>
              <label className="form-label">Type</label>
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  productDetailFormik.setFieldValue("file", e.currentTarget.files[0])
                }
              />

              <label className="form-label">Product Image</label>
            </div>
          </div>
        </div>

        <div className="row mb-4 w-75">
          <div className="form-outline mb-4 col-12">
            <textarea
              className="form-control"
              onChange={productDetailFormik.handleChange}
              value={productDetailFormik.values.description || ""}
              name="description"
              rows="8"></textarea>
            <label className="form-label">Description</label>
          </div>
        </div>

        <div className="row mb-5 w-75 align-items-center flex-column">
          <button
            className="btn btn-primary btn-block"
            type="button"
            style={{ width: "300px" }}
            data-toggle="modal"
            data-target="#editProductDetailsModal">
            Edit product details
          </button>
          <input
            type="submit"
            className="btn btn-primary btn-block col-3"
            value={"Save changes"}
          />
        </div>
      </form>

      <div
        className="modal fade"
        id="editProductDetailsModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true">
        <div
          className="modal-dialog"
          role="document"
          style={{ maxWidth: "60%" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit product details</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <Formik
              initialValues={{
                productDetails: data.productDetails,
              }}
              onSubmit={(values) => {
                const { productDetails } = values;
                console.log(productDetails);

                // Generate Id
                const generatIdForProductDetail = productDetails.map((productDetail) => {
                  const id =
                    productDetail.size +
                    productDetail.color +
                    productDetail.quantity +
                    productDetail.outOfStock;
                  return { id, ...productDetail };
                });
                const uniqueProductDetaiListWithId = [
                  ...new Map(
                    generatIdForProductDetail.map((item) => [item.id, item])
                  ).values(),
                ];
                const uniqueProductDetaiList = uniqueProductDetaiListWithId.map(
                  (productDetail) => {
                    const { id, ...rest } = productDetail;
                    return { ...rest };
                  }
                );
                setProductDetailList(uniqueProductDetaiList);
              }}>
              {({ values, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <FieldArray
                      name="productDetails"
                      render={(arrayHelpers) => (
                        <div>
                          {values.productDetails.map((item, index) => (
                            <div
                              className="d-flex flex-wrap w-100"
                              key={index}>
                              <div className="col-2 px-2">
                                <Field
                                  as="select"
                                  name={`productDetails[${index}].size`}
                                  className="w-100"
                                  onChange={handleChange}>
                                  <option value="S">S</option>
                                  <option value="M">M</option>
                                  <option value="L">L</option>
                                  <option value="XL">XL</option>
                                </Field>
                              </div>

                              <div className="col-3 px-2">
                                <Field
                                  type="text"
                                  name={`productDetails[${index}].color`}
                                  className="w-100"
                                  placeholder="Product color"
                                  onChange={handleChange}
                                />
                              </div>

                              <div className="col-2 px-2">
                                <Field
                                  type="text"
                                  name={`productDetails[${index}].quantity`}
                                  className="w-100"
                                  placeholder="Quantity"
                                  onChange={handleChange}
                                />
                              </div>

                              <div className="col-3 px-2">
                                <div className="input-group mb-3">
                                  <div className="input-group-prepend">
                                    <div className="input-group-text d-flex justify-content-center py-1">
                                      <Field
                                        type="checkbox"
                                        className="w-100"
                                        placeholder="outOfStock"
                                        name={`productDetails[${index}].outOfStock`}
                                        defaultChecked={item.outOfStock}
                                      />
                                      <label
                                        htmlFor="outOfStock"
                                        className="mb-0 px-2">
                                        Out of stock?
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-2 px-2">
                                <button
                                  type="button"
                                  className="btn btn-danger w-100 m-0"
                                  style={{
                                    color: "#fff",
                                    backgroundColor: "#dc3545",
                                    borderColor: "#dc3545",
                                    height: "34px",
                                  }}
                                  onClick={() => arrayHelpers.remove(index)}>
                                  X
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className="text-center">
                            <button
                              className="btn btn-outline-primary js-btn-plus"
                              type="button"
                              style={{ fontWeight: 500 }}
                              onClick={() =>
                                arrayHelpers.push({
                                  size: "S",
                                  color: "Red",
                                  quantity: 0,
                                  outOfStock: false,
                                })
                              }>
                              &#43; More option
                            </button>
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal">
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "200px" }}>
                      Save changes
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
