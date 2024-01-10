import React from "react";
import { useCookies } from "react-cookie";
import { useGetOrderQuery } from "../services/Orders/orderApi";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const [cookies] = useCookies(["user"]);
  const token = cookies.user?.accessToken;
  const { data } = useGetOrderQuery(token);
  return (
    <>
      <h1 className="text-center my-3">My Order</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="border-0">Order Id</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Coupon</th>
                      <th className="border-0">Order date</th>
                      <th className="border-0">Payment</th>
                      <th className="border-0">Total</th>
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.status}</td>
                          <td>
                            {order.coupon && order.coupon.length > 0
                              ? order.coupon
                              : "N/A"}
                          </td>
                          <td>{order.orderDate}</td>
                          <td>{order.payment}</td>
                          <td>${order.totalOrder}</td>
                          <td>
                            <div className="d-flex justify-content-end align-items-center">
                              <Link
                                state={order.orderDetails}
                                to={"/view-order"}
                                className="btn btn-secondary btn-sm ml-2">
                                View order
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrders;
