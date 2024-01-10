import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../../services/Cart/cartApi";
import {
  useCreatePaymentVnPayMutation,
  usePaymentSelectMutation,
  usePostPaymentDetailMutation,
} from "../../services/Checkout/checkOutApi";
import { useEffect } from "react";

const Checkout = () => {
  const [cookies] = useCookies(["user"]);
  const token = cookies.user ? cookies.user.accessToken : null;
  const { data, isSuccess } = useGetCartQuery(token);
  const [handlePaymentSelect] = usePaymentSelectMutation();
  const [handleCreateVnPay] = useCreatePaymentVnPayMutation();
  const [handlePostVnPayStatus] = usePostPaymentDetailMutation();
  const navigate = useNavigate();
  const cartList = !isSuccess ? [] : Object.values(data.listItems);
  const cartTotal = cartList.reduce(
    (prev, current) => (prev += current.amount * current.product.price),
    0
  );
  const postPaymentSelect = ({ payment }) => {
    handlePaymentSelect({ payment, token })
      .unwrap()
      .then(({ status, orderId }) => {
        if (status === "Đặt Hàng Thành Công") {
          alert(status);
          navigate("/thank-you");
        } else {
          handleCreateVnPay(orderId)
            .unwrap()
            .then(({ url }) => window.open(url, "_blank"))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (window.location.href.includes("?")) {
      const queryString = window.location.href.substring(
        window.location.href.lastIndexOf("?") + 1
      );
      const newQueryString =
        queryString.substring(0, queryString.indexOf("&")) +
        "?" +
        queryString.substring(queryString.indexOf("&") + 1);
      handlePostVnPayStatus(newQueryString)
        .unwrap()
        .then(({ message }) => {
          if (message === "Thanh Toán Thành Công") {
            navigate("/thank-you");
          } else {
            alert(message);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <>
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <Link to={"/"}>Home</Link> <span className="mx-2 mb-0">/</span>
              <Link to={"/cart"}>Cart</Link> <span className="mx-2 mb-0">/</span>
              <strong className="text-black">Checkout</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12">
              <div
                className="border p-4 rounded"
                role="alert">
                Returning customer? <a href="#">Click here</a> to login
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                  <div className="p-3 p-lg-5 border">
                    <label
                      htmlFor="c_code"
                      className="text-black mb-3">
                      Enter your coupon code if you have one
                    </label>
                    <div className="input-group w-75">
                      <input
                        type="text"
                        className="form-control"
                        id="c_code"
                        placeholder="Coupon Code"
                        aria-label="Coupon Code"
                        aria-describedby="button-addon2"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary btn-sm my-0 h-100"
                          type="button"
                          id="button-addon2">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Your Order</h2>
                  <div className="p-3 p-lg-5 border">
                    <table className="table site-block-order-table mb-5">
                      <thead>
                        <th>Product</th>
                        <th>Total</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-black font-weight-bold">
                            <strong>Order Total</strong>
                          </td>
                          <td className="text-black font-weight-bold">
                            <strong>${cartTotal}</strong>
                          </td>
                        </tr>
                        {cartList.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {item.product.name} ({`${item.size}, ${item.color}`})
                                <strong className="mx-2">x</strong> {item.amount}
                              </td>
                              <td>${item.amount * item.product.price}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    <div className="border p-3 mb-3">
                      <h3 className="h6 mb-0">
                        <a
                          className="d-block"
                          href="#momo"
                          role="button">
                          Momo
                        </a>
                      </h3>
                    </div>

                    <div className="border p-3 mb-3">
                      <h3 className="h6 mb-0">
                        <a
                          className="d-block"
                          href="#shipcod"
                          role="button"
                          onClick={() => postPaymentSelect({ payment: "shipcod" })}>
                          Ship cod
                        </a>
                      </h3>
                    </div>

                    <div className="border p-3 mb-5">
                      <h3 className="h6 mb-0">
                        <a
                          className="d-block"
                          href="#vnpay"
                          role="button"
                          onClick={() => postPaymentSelect({ payment: "vnpay" })}>
                          VnPay
                        </a>
                      </h3>
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

export default Checkout;
