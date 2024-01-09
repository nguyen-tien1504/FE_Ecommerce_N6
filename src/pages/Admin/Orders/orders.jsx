import { useEffect, useState } from "react";
import axios from "axios";
import OrderInfo from "./OrderInfo";
import { showAlert } from "../../../services/Alert/Alert";
const Orders = () => {
  const CANCEL_STATUS = "cancel";
  const [listOrder, setListOrder] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateOrderStatus = (orderId, newStatus) => {
    const url = `http://localhost:8080/api/order/updateStatus/${orderId}/${newStatus}`;
    async function updateStatusOrder() {
      const data = await axios.put(url);
      showAlert(data.data);
    }
    updateStatusOrder();
  };

  useEffect(() => {
    const url = `http://localhost:8080/api/order?pageNum=${pageNumber - 1}`;
    async function fetchData() {
      const data = await axios.get(url);
      setListOrder(data.data.data);
    }
    fetchData();
  }, [pageNumber]);
  const navigateToPage = (e) => {
    e.preventDefault();
    const targetAction = e.target.getAttribute("data-page");

    if (targetAction === "previous" && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }

    if (targetAction === "next" && pageNumber < listOrder.totalPage) {
      setPageNumber(pageNumber + 1);
    }

    if (Number(targetAction)) {
      setPageNumber(+targetAction);
    }
  };
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
                    {listOrder &&
                      listOrder.content
                        ?.filter((order) => order.status !== CANCEL_STATUS)
                        .map((order) => (
                          <OrderInfo
                            key={order.id}
                            order={order}
                            updateOrderStatus={updateOrderStatus}
                          />
                        ))}
                  </tbody>
                </table>

                {/* -------------------- Pagination ----------------------- */}
                <div
                  className="row"
                  data-aos="fade-up">
                  <div className="col-md-12 text-center">
                    <div className="site-block-27">
                      <ul>
                        {listOrder && (
                          <>
                            <li>
                              <a
                                href="#"
                                data-page="previous"
                                onClick={(e) => navigateToPage(e)}>
                                &lt;
                              </a>
                            </li>

                            {[...Array(listOrder.totalPage)].map((pageCount, index) => {
                              const currentPageCounting = index + 1;
                              return (
                                <li
                                  className={
                                    currentPageCounting == pageNumber
                                      ? "active"
                                      : undefined
                                  }
                                  key={index}>
                                  <a
                                    href="#"
                                    data-page={currentPageCounting}
                                    onClick={(e) => navigateToPage(e)}>
                                    {currentPageCounting}
                                  </a>
                                </li>
                              );
                            })}

                            <li>
                              <a
                                href="#"
                                data-page="next"
                                onClick={(e) => navigateToPage(e)}>
                                &gt;
                              </a>
                            </li>
                          </>
                        )}
                      </ul>
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

export default Orders;
