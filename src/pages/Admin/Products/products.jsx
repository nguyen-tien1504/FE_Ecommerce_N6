import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import deleteFileFromFireBase from "../../../services/Firebase/deleteFileFromFireBase";
import {
  useDeleteProductMutation,
  useGetProductByPageQuery,
} from "../../../services/Product/productApi";

const Products = () => {
  const { data, isLoading } = useGetProductByPageQuery("");
  const [cookies] = useCookies(["user"]);
  const token = cookies.user.accessToken;
  const [handleDeleteProduct] = useDeleteProductMutation();
  const [pageNumber, setPageNumber] = useState(1);
  const navigateToPage = (e) => {
    e.preventDefault();
    const targetAction = e.target.getAttribute("data-page");

    if (targetAction === "previous" && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }

    if (targetAction === "next" && pageNumber < data?.totalPage) {
      setPageNumber(pageNumber + 1);
    }

    if (Number(targetAction)) {
      setPageNumber(+targetAction);
    }
  };
  return (
    <>
      <h1 className="text-center my-3">Product Management</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="border-0">Product Id</th>
                      <th
                        className="border-0"
                        style={{ width: "23%" }}>
                        Product name
                      </th>
                      <th className="border-0">Product price</th>
                      <th className="border-0">Product category</th>
                      <th className="border-0">Product type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading &&
                      data.content.map((product) => {
                        return (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td className="admin-table-product-name">
                              <p>{product.name}</p>
                            </td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.type}</td>
                            <td>
                              <div className="d-flex justify-content-end align-items-center">
                                <Link
                                  to={`/admin/edit/product/${product.id}`}
                                  className="btn btn-danger btn-sm mr-2 my-0">
                                  Edit product
                                </Link>
                                <button
                                  className="btn btn-dark btn-sm ml-2 my-0"
                                  onClick={async () => {
                                    await deleteFileFromFireBase(product.imageUrls);
                                    handleDeleteProduct(product.id);
                                  }}>
                                  Delete product
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* -------------------- Pagination ----------------------- */}
            <div className="row my-5">
              <div className="col-md-12 text-center">
                <div className="site-block-27">
                  <ul>
                    {!isLoading && (
                      <>
                        <li>
                          <a
                            href="#"
                            data-page="previous"
                            onClick={(e) => navigateToPage(e)}>
                            &lt;
                          </a>
                        </li>

                        {[...Array(data.totalPage)].map((pageCount, index) => {
                          const currentPageCounting = index + 1;
                          return (
                            <li
                              className={
                                currentPageCounting == pageNumber ? "active" : undefined
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
    </>
  );
};

export default Products;
