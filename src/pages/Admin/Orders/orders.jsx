import { useEffect, useState } from "react";
import axios from "axios";
import OrderInfo from "./OrderInfo";
import { showAlert } from "../../../services/Alert/Alert";
const Orders = () => {
  const CANCEL_STATUS = "cancel";
  const [listOrder, setListOrder] = useState([]);

  const updateOrderStatus = (orderId, newStatus) => {
    const url = `http://localhost:8080/api/order/updateStatus/${orderId}/${newStatus}`;
    async function updateStatusOrder() {
      const data = await axios.put(url);
      showAlert(data.data)
    }
    updateStatusOrder();
  };

  useEffect(() => {
    const url = "http://localhost:8080/api/order";
    async function fetchData() {
      const data = await axios.get(url);
      setListOrder([...data.data.data.content]);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center my-3">Order Management</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
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
                      <th className="border-0">User Id</th>
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listOrder
                      .filter((order) => order.status !== CANCEL_STATUS)
                      .map((order) => (
                        <OrderInfo
                          key={order.id}
                          order={order}
                          updateOrderStatus={updateOrderStatus}
                        />
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

export default Orders;
