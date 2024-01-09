import { useEffect, useState } from "react";

const STATUS = ["PENDING", "SHIPPING", "DONE"];
const OrderInfo = ({ order, updateOrderStatus }) => {
  const [select, setSelect] = useState();

  useEffect(() => {
    const index = STATUS.findIndex(
      (status) => status.toLowerCase() === order.status.toLowerCase()
    );
    if (index <= 1) {
      setSelect(STATUS[index + 1]);
    }
  }, []);
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.status}</td>
      <td>{order.coupon && order.coupon.length > 0 ? order.coupon : "N/A"}</td>
      <td>{order.orderDate}</td>
      <td>{order.payment}</td>
      <td>{order.userOrder.userId}</td>
      <td>
        <div className="d-flex justify-content-end align-items-center">
          <button className="btn btn-dark btn-sm ml-2">View order</button>
          <button
            className="btn btn-secondary btn-sm ml-2"
            onClick={() => updateOrderStatus(order.id, select)}
            disabled={order.status === STATUS[2]}
          >
            {select ?? "FINISH"}
          </button>
        </div>
      </td>
    </tr>
  );
};
export default OrderInfo;
