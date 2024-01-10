import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#00ABB3" }}
      >
        <div className="container-fluid">
          <Link to={"/admin"} className="navbar-brand text-black">
            Management System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-label="Toggle navigation"
          >
            <span className="icon icon-list-ul"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link to={"/admin/add-product"} className="nav-link text-black">
                  Add Product
                </Link>
              </li>
              <li>
                <Link className="nav-link text-black" to={"/admin/products"}>
                  View Product Table
                </Link>
              </li>
              <li>
                <a className="nav-link text-black" href="/emp/home/">
                  View User Table
                </a>
              </li>
              <li>
                <Link className="nav-link text-black" to={"/admin/statistic"}>
                  Statistic Order
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
