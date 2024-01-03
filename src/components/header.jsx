import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  
  return (
    <header
      className="site-navbar"
      role="banner">
      <div className="site-navbar-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
              <form
                action=""
                className="site-block-top-search">
                <span className="icon icon-search2"></span>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search"
                />
              </form>
            </div>

            <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
              <div className="site-logo">
                <Link
                  to="/"
                  className="js-logo-clone">
                  Shoppers
                </Link>
              </div>
            </div>

            <div className="col-6 col-md-4 order-3 order-md-3 text-right">
              <div className="site-top-icons">
                <ul>
                  <li>
                    {user ? (
                      <a href="">Hello {user.email}</a>
                    ) : (
                      <Link to={"/login"}>
                        <span className="icon icon-person"></span>
                      </Link>
                    )}
                  </li>
                  <li>
                    <a href="#">
                      <span className="icon icon-heart-o"></span>
                    </a>
                  </li>
                  <li>
                    <Link
                      to={"/cart"}
                      className="site-cart">
                      <span className="icon icon-shopping_cart"></span>
                      <span className="count">2</span>
                    </Link>
                  </li>
                  <li className="d-inline-block d-md-none ml-md-0">
                    <a
                      href="#"
                      className="site-menu-toggle js-menu-toggle">
                      <span className="icon-menu"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        className="site-navigation text-right text-md-center"
        role="navigation">
        <div className="container">
          <ul className="site-menu js-clone-nav d-none d-md-block">
            <li className="has-children active">
              <Link to="/">Home</Link>
              <ul className="dropdown">
                <li>
                  <a href="#">Menu One</a>
                </li>
                <li>
                  <a href="#">Menu Two</a>
                </li>
                <li>
                  <a href="#">Menu Three</a>
                </li>
                <li className="has-children">
                  <a href="#">Sub Menu</a>
                  <ul className="dropdown">
                    <li>
                      <a href="#">Menu One</a>
                    </li>
                    <li>
                      <a href="#">Menu Two</a>
                    </li>
                    <li>
                      <a href="#">Menu Three</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="has-children">
              <Link to={"/about"}>About</Link>
              <ul className="dropdown">
                <li>
                  <a href="#">Menu One</a>
                </li>
                <li>
                  <a href="#">Menu Two</a>
                </li>
                <li>
                  <a href="#">Menu Three</a>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/shop"}>Shop</Link>
            </li>
            <li>
              <Link to={"/catalogue"}>Catalogue</Link>
            </li>
            <li>
              <Link to={"/new-arrivals"}>New Arrivals</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
