import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  useDeleteCartMutation,
  useGetCartQuery,
  usePostCartMutation,
} from "../../services/Cart/cartApi";
import { useEffect, useState } from "react";

const Cart = () => {
  const [cartProductDetail, setCartProductDetail] = useState();
  const [cookies] = useCookies(["user"]);
  const token = cookies.user ? cookies.user.accessToken : null;
  const { data, isSuccess } = useGetCartQuery(token, { refetchOnMountOrArgChange: true });
  const [handlePostCart] = usePostCartMutation();
  const [handleDeleteCart] = useDeleteCartMutation();
  const cartList = !isSuccess ? [] : Object.values(data.listItems);
  const cartTotal = cartList.reduce(
    (prev, current) => (prev += current.amount * current.product.price),
    0
  );
  useEffect(() => {
    if (cartProductDetail) {
      const { productId, amount, size, color } = cartProductDetail;
      handlePostCart({ productId, amount, productDetail: { size, color }, token })
        .unwrap()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }, [cartProductDetail]);
  return (
    <>
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100 px-0">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col px-0">
              <div className="card">
                <div className="card-body py-4 px-3">
                  <div className="row">
                    <div className="col-lg-8">
                      <h5 className="mb-3">
                        <Link
                          to={"/shop"}
                          className="text-body">
                          <i className="fas fa-long-arrow-alt-left me-2"></i>Continue
                          shopping
                        </Link>
                      </h5>
                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">
                            You have {cartList.length} items in your cart
                          </p>
                        </div>
                        <div>
                          <p className="mb-0">
                            <span className="text-muted">Sort by:</span>{" "}
                            <a
                              href="#!"
                              className="text-body">
                              price <i className="fas fa-angle-down mt-1"></i>
                            </a>
                          </p>
                        </div>
                      </div>

                      {cartList.map((item, index) => {
                        return (
                          <div
                            className="card mb-3"
                            key={index}>
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center col-5">
                                  <div>
                                    <img
                                      src={item.product.imageUrls}
                                      className="img-fluid rounded-3"
                                      alt="Shopping item"
                                      style={{ width: "65px" }}
                                    />
                                  </div>
                                  <div className="ml-3">
                                    <h5 className="product-item-name">
                                      {item.product.name}
                                    </h5>
                                    <p className="small mb-0">{`${item.size}, ${item.color}`}</p>
                                  </div>
                                </div>
                                <div className="d-flex col-3 align-items-center">
                                  <button
                                    className="btn px-2 d-flex justify-content-center align-items-center"
                                    style={{
                                      height: "35px",
                                      width: "70px",
                                      borderRadius: "50%",
                                    }}
                                    onClick={() => {
                                      if (item.amount == 1) {
                                        handleDeleteCart({
                                          productId: item.product.id,
                                          amount: item.amount,
                                          productDetail: {
                                            size: item.size,
                                            color: item.color,
                                          },
                                          token,
                                        });
                                        return;
                                      }
                                      setCartProductDetail({
                                        productId: item.product.id,
                                        size: item.size,
                                        color: item.color,
                                        amount: -1,
                                      });
                                    }}>
                                    <i className="icon icon-minus-circle"></i>
                                  </button>

                                  <input
                                    className="form-control form-control-sm mx-2 text-center"
                                    value={item.amount}
                                    readOnly
                                  />

                                  <button
                                    className="btn px-2 d-flex justify-content-center align-items-center"
                                    style={{
                                      height: "35px",
                                      width: "70px",
                                      borderRadius: "50%",
                                    }}
                                    onClick={() =>
                                      setCartProductDetail({
                                        productId: item.product.id,
                                        size: item.size,
                                        color: item.color,
                                        amount: 1,
                                      })
                                    }>
                                    <i className="icon icon-plus-circle"></i>
                                  </button>
                                </div>
                                <div className="d-flex flex-row align-items-center col-4">
                                  <div className="col-5 px-0">
                                    <h5 className="fw-normal mb-0">
                                      {item.product.price}
                                    </h5>
                                  </div>
                                  <div className="col-5 px-0">
                                    <h5 className="mb-0">
                                      ${item.product.price * item.amount}
                                    </h5>
                                  </div>
                                  <button
                                    className="border-0 bg-white curser-pointer col-2 px-0"
                                    onClick={() =>
                                      handleDeleteCart({
                                        productId: item.product.id,
                                        amount: item.amount,
                                        productDetail: {
                                          size: item.size,
                                          color: item.color,
                                        },
                                        token,
                                      })
                                    }>
                                    <i className="icon icon-trash-o"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="col-lg-4">
                      <div className="card bg-primary text-white rounded-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0">Card details</h5>
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                              className="img-fluid rounded-3"
                              style={{ width: "45px" }}
                              alt="Avatar"
                            />
                          </div>

                          <p className="small mb-2">Card type</p>
                          <a
                            href="#!"
                            type="submit"
                            className="text-white">
                            <i className="fab fa-cc-mastercard fa-2x me-2"></i>
                          </a>
                          <a
                            href="#!"
                            type="submit"
                            className="text-white">
                            <i className="fab fa-cc-visa fa-2x me-2"></i>
                          </a>
                          <a
                            href="#!"
                            type="submit"
                            className="text-white">
                            <i className="fab fa-cc-amex fa-2x me-2"></i>
                          </a>
                          <a
                            href="#!"
                            type="submit"
                            className="text-white">
                            <i className="fab fa-cc-paypal fa-2x"></i>
                          </a>

                          <form className="mt-4 px-4">
                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeName"
                                className="form-control form-control-lg"
                                placeholder="Cardholder's Name"
                              />
                              <label
                                className="form-label"
                                htmlFor="typeName">
                                Cardholder&apos;s Name
                              </label>
                            </div>

                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeText"
                                className="form-control form-control-lg"
                                placeholder="1234 5678 9012 3457"
                                minLength="19"
                                maxLength="19"
                              />
                              <label
                                className="form-label"
                                htmlFor="typeText">
                                Card Number
                              </label>
                            </div>

                            <div className="row mb-4">
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="MM/YYYY"
                                    size="7"
                                    minLength="7"
                                    maxLength="7"
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="typeExp">
                                    Expiration
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="&#9679;&#9679;&#9679;"
                                    size="1"
                                    minLength="3"
                                    maxLength="3"
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="typeText">
                                    Cvv
                                  </label>
                                </div>
                              </div>
                            </div>
                          </form>

                          <hr className="my-4" />

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">${cartTotal}</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">$00.00</p>
                          </div>

                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2">${cartTotal}</p>
                          </div>

                          <Link
                            to={"/checkout"}
                            className="btn btn-info btn-block btn-lg w-100">
                            <div className="d-flex justify-content-between">
                              <span>${cartTotal}</span>
                              <span>
                                Checkout
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
