import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserOrder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  useEffect(() => {
    if (!state) navigate("/view-orders");
  }, []);
  const orderTotal = state.reduce(
    (prev, current) => prev + current.quantity * current.item.price,
    0
  );
  return (
    <>
      {state && (
        <section className="h-100 gradient-custom view-order">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-10 col-xl-9">
                <div
                  className="card"
                  style={{ borderRadius: "10px" }}>
                  <div className="card-header px-4 py-5">
                    <h5 className="text-muted mb-0">Thanks for your Order, </h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p
                        className="lead fw-normal mb-0"
                        style={{ color: "#a8729a" }}>
                        Receipt
                      </p>
                    </div>
                    {state.map((productDetail, index) => {
                      return (
                        <div
                          className="card shadow-0 border mb-4"
                          key={index}>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-2">
                                <img
                                  src={productDetail.item.imageUrls}
                                  className="img-fluid"
                                  alt="Phone"
                                />
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 product-item-name">
                                  {productDetail.item.name}
                                </p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">
                                  Size: {productDetail.size}
                                </p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">
                                  Color: {productDetail.color}
                                </p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">
                                  Qty: {productDetail.quantity}
                                </p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">
                                  ${productDetail.quantity * productDetail.item.price}
                                </p>
                              </div>
                            </div>
                            <hr
                              className="mb-4"
                              style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="card-footer border-0 px-4 py-5"
                    style={{
                      backgroundColor: "#a8729a",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}>
                    <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                      Total paid: <span className="h2 mb-0 ms-2">${orderTotal}</span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UserOrder;
