/* eslint-disable no-unused-vars */
import { Field, FieldArray, Form, Formik, useFormik } from "formik";
import { useAddNewProductMutation } from "../../../services/Redux/ProductService/productApi";
import { useState } from "react";
import postFileToFireBase from "../../../services/Firebase/postFileToFireBase";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const AddProduct = () => {
  const [handleAddNewProduct, { isSuccess }] = useAddNewProductMutation();
  const [cookies] = useCookies(["user"]);
  const token = cookies.user.accessToken;
  const [file, setFile] = useState();
  const [productDetailList, setProductDetailList] = useState([]);
  const productFormik = useFormik({
    initialValues: {
      name: "",
      price: "",
      dimension: "",
      material: "",
      weight: "",
      categoryName: "Women",
      description: "",
      typeName: "sneaker",
    },
    onSubmit: async (values, actions) => {
      const imageURL = await postFileToFireBase(file);
      const dataSend = {
        ...values,
        imageUrls: imageURL,
        productDetailRequestList: productDetailList,
      };

      handleAddNewProduct({ dataSend, token });
      if (isSuccess) {
        actions.resetForm();
      }
    },
  });
  return (
    <>
      <h1 className="text-center my-3">Add A New Product</h1>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-0">
              <div className="card-body px-0">
                <form
                  className="sign-in-form px-0"
                  onSubmit={productFormik.handleSubmit}
                  encType="multipart/form-data">
                  <div className="d-flex flex-wrap">
                    <div className="px-2 col-6">
                      <div className="input-field d-flex align-items-center px-5">
                        <input
                          type="text"
                          placeholder="Product name"
                          name="name"
                          className="w-100"
                          onChange={productFormik.handleChange}
                          value={productFormik.values.name}
                        />
                      </div>
                    </div>

                    <div className="px-2 col-6">
                      <div className="input-field d-flex align-items-center px-5">
                        <input
                          type="text"
                          placeholder="Product price"
                          name="price"
                          className="w-100"
                          onChange={productFormik.handleChange}
                          value={productFormik.values.price}
                        />
                      </div>
                    </div>

                    <div className="px-2 col-6">
                      <div className="input-field d-flex align-items-center px-5">
                        <input
                          type="text"
                          placeholder="Product dimension"
                          name="dimension"
                          className="w-100"
                          onChange={productFormik.handleChange}
                          value={productFormik.values.dimension}
                        />
                      </div>
                    </div>

                    <div className="px-2 col-6">
                      <div className="input-field d-flex align-items-center px-5">
                        <input
                          type="text"
                          placeholder="Product material"
                          name="material"
                          className="w-100"
                          onChange={productFormik.handleChange}
                          value={productFormik.values.material}
                        />
                      </div>
                    </div>

                    <div className="px-2 col-6">
                      <div className="input-field d-flex align-items-center px-5">
                        <input
                          type="text"
                          placeholder="Product weight"
                          name="weight"
                          className="w-100"
                          onChange={productFormik.handleChange}
                          value={productFormik.values.weight}
                        />
                      </div>
                    </div>

                    <div className="px-2 col-6">
                      <div className="input-field d-flex align-items-center px-5">
                        <select
                          type="text"
                          placeholder="Product category"
                          name="categoryName"
                          className="w-100"
                          onChange={productFormik.handleChange}
                          value={productFormik.values.categoryName}>
                          <option value="Women">Women</option>
                          <option value="Children">Children</option>
                          <option value="Men">Men</option>
                        </select>
                      </div>
                    </div>

                    <div className="px-2 col-6">
                      <div className="input-field d-flex align-items-center px-5">
                        <select
                          type="text"
                          placeholder="Product type"
                          name="typeName"
                          className="w-100"
                          onChange={productFormik.handleChange}
                          value={productFormik.values.typeName}>
                          <option value="sneaker">Sneaker</option>
                          <option value="dress">Dress</option>
                          <option value="pants">Pants</option>
                          <option value="shirt">Shirt</option>
                        </select>
                      </div>
                    </div>

                    <div className="px-2 col-6">
                      <div className="input-field d-flex align-items-center px-5">
                        <input
                          type="file"
                          placeholder="Product image"
                          name="files"
                          className="w-100"
                          accept="image/*"
                          onChange={(e) => setFile(e.currentTarget.files[0])}
                          value={productFormik.values.files}
                        />
                      </div>
                    </div>

                    <div className="px-2 col-12">
                      <div
                        className="input-field d-flex align-items-center px-5 py-3 mx-auto"
                        style={{ height: "150px", maxWidth: "500px" }}>
                        <textarea
                          type="text"
                          placeholder="Product description"
                          name="description"
                          className="w-100 h-100"
                          onChange={productFormik.handleChange}
                          value={productFormik.values.description}></textarea>
                      </div>
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="Create"
                    className="btn solid"
                  />
                </form>

                <div className="px-2">
                  <div className="d-flex align-items-center justify-content-center">
                    {/* <!-- Button trigger modal --> */}
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#addProductDetailsModal"
                      style={{ width: "290px" }}>
                      Add more details
                    </button>
                    {/* <!-- Modal --> */}
                    <div
                      className="modal fade"
                      id="addProductDetailsModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-hidden="true">
                      <div
                        className="modal-dialog"
                        role="document"
                        style={{ maxWidth: "60%" }}>
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Add product details</h5>
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
                              productInputRow: [
                                {
                                  sizeName: "S",
                                  color: "Red",
                                  quantity: 0,
                                  outOfStock: false,
                                },
                              ],
                            }}
                            onSubmit={(values) => {
                              const { productInputRow } = values;
                              // Generate Id
                              const generatIdForProductDetail = productInputRow.map(
                                (productDetail) => {
                                  const id =
                                    productDetail.sizeName +
                                    productDetail.color +
                                    productDetail.quantity +
                                    productDetail.outOfStock;
                                  return { id, ...productDetail };
                                }
                              );
                              const uniqueProductDetaiListWithId = [
                                ...new Map(
                                  generatIdForProductDetail.map((item) => [item.id, item])
                                ).values(),
                              ];
                              const uniqueProductDetaiList =
                                uniqueProductDetaiListWithId.map((productDetail) => {
                                  const { id, ...rest } = productDetail;
                                  return { ...rest };
                                });

                              setProductDetailList([...uniqueProductDetaiList]);
                            }}>
                            {({ values, handleChange, handleSubmit }) => (
                              <Form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                  <FieldArray
                                    name="productInputRow"
                                    render={(arrayHelpers) => (
                                      <div>
                                        {values.productInputRow.map((item, index) => (
                                          <div
                                            className="d-flex flex-wrap w-100"
                                            key={index}>
                                            <div className="col-2 px-2">
                                              <Field
                                                as="select"
                                                name={`productInputRow[${index}].sizeName`}
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
                                                name={`productInputRow[${index}].color`}
                                                className="w-100"
                                                placeholder="Product color"
                                                onChange={handleChange}
                                              />
                                            </div>

                                            <div className="col-2 px-2">
                                              <Field
                                                type="text"
                                                name={`productInputRow[${index}].quantity`}
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
                                                      name={`productInputRow[${index}].outOfStock`}
                                                      onChange={handleChange}
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
                                                onClick={() =>
                                                  arrayHelpers.remove(index)
                                                }>
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
                                                sizeName: "S",
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
