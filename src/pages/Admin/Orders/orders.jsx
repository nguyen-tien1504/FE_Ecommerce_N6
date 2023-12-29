const Orders = () => {
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
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="d-flex justify-content-end align-items-center">
                          <a
                            href="/emp/delete-emp/{{e.id}}"
                            className="btn btn-danger btn-sm mr-2">
                            Delete order
                          </a>
                          <a
                            href="/emp/update-emp/{{e.id}}"
                            className="btn btn-dark btn-sm ml-2">
                            View order
                          </a>
                        </div>
                      </td>
                    </tr>
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
