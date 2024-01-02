import { Link } from "react-router-dom";

const ProductItem = ({ data }) => {
  return (
    <>
      <div
        className="col-sm-6 col-lg-4 mb-4"
        data-aos="fade-up">
        <div className="block-4 text-center border">
          <figure className="block-4-image">
            <Link to={`/product-detail/${data.id}`}>
              <img
                src={data.imageUrls}
                alt="Image placeholder"
                width={"100%"}
                height={"240px"}
              />
            </Link>
          </figure>
          <div className="block-4-text p-4">
            <h3>
              <Link
                to={`/product-detail/${data.id}`}
                className="product-item-name">
                {data.name}
              </Link>
            </h3>
            <p className="mb-0">Finding perfect t-shirt</p>
            <p className="text-primary font-weight-bold">${data.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
