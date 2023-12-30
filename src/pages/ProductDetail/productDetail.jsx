import { useState } from "react";
import { useGetProductByIdQuery } from "../../services/Redux/ProductService/productApi";
import { Link, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();

  const [productQuantity, setProductQuantity] = useState(1);
  const { data, isLoading } = useGetProductByIdQuery(productId);
  console.log(data);

  return (
    <>
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <Link to={"/"}>Home</Link> <span className="mx-2 mb-0">/</span>{" "}
              <strong className="text-black">{!isLoading && data.name}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {!isLoading && (
                <img
                  src={data.imageUrls}
                  alt="Image"
                  className="img-fluid"
                />
              )}
            </div>
            <div className="col-md-6">
              <h2 className="text-black">{!isLoading && data.name}</h2>
              <p className="mb-4">{!isLoading && data.description}</p>
              <p>
                <strong className="text-primary h4">${!isLoading && data.price}</strong>
              </p>
              <div className="mb-1 d-flex">
                <label
                  htmlFor="size"
                  className="d-flex mr-3 mb-3">
                  <span
                    className="d-inline-block mr-2"
                    style={{ top: "0", position: "relative" }}>
                    <input
                      type="radio"
                      id="S"
                      name="shop-sizes"
                    />
                  </span>{" "}
                  <span className="d-inline-block text-black">Small</span>
                </label>
                <label
                  htmlFor="size"
                  className="d-flex mr-3 mb-3">
                  <span
                    className="d-inline-block mr-2"
                    style={{ top: "0", position: "relative" }}>
                    <input
                      type="radio"
                      id="M"
                      name="shop-sizes"
                    />
                  </span>{" "}
                  <span className="d-inline-block text-black">Medium</span>
                </label>
                <label
                  htmlFor="size"
                  className="d-flex mr-3 mb-3">
                  <span
                    className="d-inline-block mr-2"
                    style={{ top: "0", position: "relative" }}>
                    <input
                      type="radio"
                      id="L"
                      name="shop-sizes"
                    />
                  </span>{" "}
                  <span className="d-inline-block text-black">Large</span>
                </label>
                <label
                  htmlFor="size"
                  className="d-flex mr-3 mb-3">
                  <span
                    className="d-inline-block mr-2"
                    style={{ top: "0", position: "relative" }}>
                    <input
                      type="radio"
                      id="XL"
                      name="shop-sizes"
                    />
                  </span>{" "}
                  <span className="d-inline-block text-black"> Extra Large</span>
                </label>
              </div>
              <div className="mb-5">
                <div className="input-group mb-3 d-flex align-items-center">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-outline-primary js-btn-minus"
                      type="button"
                      onClick={() => {
                        if (productQuantity == 1) return;
                        setProductQuantity(productQuantity - 1);
                      }}>
                      &#45;
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control text-center"
                    style={{ height: "49px" }}
                    value={productQuantity}
                    readOnly
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-primary js-btn-plus"
                      type="button"
                      onClick={() => setProductQuantity(productQuantity + 1)}>
                      &#43;
                    </button>
                  </div>
                </div>
              </div>
              <p>
                <Link
                  to={"/cart"}
                  className="buy-now btn btn-sm btn-primary">
                  Add To Cart
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section block-3 site-blocks-2 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 site-section-heading text-center pt-4">
              <h2>Featured Products</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="nonloop-block-3 owl-carousel">
                <div className="item">
                  <div className="block-4 text-center">
                    <figure className="block-4-image">
                      <img
                        src="images/cloth_1.jpg"
                        alt="Image placeholder"
                        className="img-fluid"
                      />
                    </figure>
                    <div className="block-4-text p-4">
                      <h3>
                        <a href="#">Tank Top</a>
                      </h3>
                      <p className="mb-0">Finding perfect t-shirt</p>
                      <p className="text-primary font-weight-bold">$50</p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="block-4 text-center">
                    <figure className="block-4-image">
                      <img
                        src="images/shoe_1.jpg"
                        alt="Image placeholder"
                        className="img-fluid"
                      />
                    </figure>
                    <div className="block-4-text p-4">
                      <h3>
                        <a href="#">Corater</a>
                      </h3>
                      <p className="mb-0">Finding perfect products</p>
                      <p className="text-primary font-weight-bold">$50</p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="block-4 text-center">
                    <figure className="block-4-image">
                      <img
                        src="images/cloth_2.jpg"
                        alt="Image placeholder"
                        className="img-fluid"
                      />
                    </figure>
                    <div className="block-4-text p-4">
                      <h3>
                        <a href="#">Polo Shirt</a>
                      </h3>
                      <p className="mb-0">Finding perfect products</p>
                      <p className="text-primary font-weight-bold">$50</p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="block-4 text-center">
                    <figure className="block-4-image">
                      <img
                        src="images/cloth_3.jpg"
                        alt="Image placeholder"
                        className="img-fluid"
                      />
                    </figure>
                    <div className="block-4-text p-4">
                      <h3>
                        <a href="#">T-Shirt Mockup</a>
                      </h3>
                      <p className="mb-0">Finding perfect products</p>
                      <p className="text-primary font-weight-bold">$50</p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="block-4 text-center">
                    <figure className="block-4-image">
                      <img
                        src="images/shoe_1.jpg"
                        alt="Image placeholder"
                        className="img-fluid"
                      />
                    </figure>
                    <div className="block-4-text p-4">
                      <h3>
                        <a href="#">Corater</a>
                      </h3>
                      <p className="mb-0">Finding perfect products</p>
                      <p className="text-primary font-weight-bold">$50</p>
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

export default ProductDetail;
