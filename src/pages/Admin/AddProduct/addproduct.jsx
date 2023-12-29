const AddProduct = () => {
  return (
    <>
      <h1 className="text-center my-3">Add A New Product</h1>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card border-0">
              <div className="card-body">
                <form
                  action=""
                  className="sign-in-form">
                  <div className="input-field d-flex align-items-center px-5">
                    <input
                      type="text"
                      placeholder="Product name"
                      name="product_name"
                      className="w-100"
                    />
                  </div>

                  <div className="input-field d-flex align-items-center px-5">
                    <input
                      type="text"
                      placeholder="Product price"
                      name="product_price"
                      className="w-100"
                    />
                  </div>

                  <div className="input-field d-flex align-items-center px-5">
                    <input
                      type="text"
                      placeholder="Product dimension"
                      name="dimension"
                      className="w-100"
                    />
                  </div>

                  <div className="input-field d-flex align-items-center px-5">
                    <input
                      type="text"
                      placeholder="Product material"
                      name="material"
                      className="w-100"
                    />
                  </div>

                  <div className="input-field d-flex align-items-center px-5">
                    <input
                      type="text"
                      placeholder="Product weight"
                      name="weight"
                      className="w-100"
                    />
                  </div>
                  <div className="input-field d-flex align-items-center px-5">
                    <select
                      type="text"
                      placeholder="Product category"
                      name="weight"
                      className="w-100">
                      <option value="1">Quan ao</option>
                      <option value="2">Do mua dong</option>
                      <option value="3">Do mua he</option>
                      <option value="4">Giay dep</option>
                    </select>
                  </div>
                  <div className="input-field d-flex align-items-center px-5">
                    <input
                      type="file"
                      placeholder="Product weight"
                      name="image_file"
                      className="w-100"
                    />
                  </div>
                  <div
                    className="input-field d-flex align-items-center px-5 py-3"
                    style={{ height: "150px" }}>
                    <textarea
                      type="text"
                      placeholder="Product description"
                      name="weight"
                      className="w-100 h-100"></textarea>
                  </div>
                  <input
                    type="submit"
                    value="Create"
                    className="btn solid"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
