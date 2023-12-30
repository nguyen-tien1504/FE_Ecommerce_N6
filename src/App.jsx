import { Outlet } from "react-router-dom";
import "../public/css/style.css";
import Header from "./components/header";
import Footer from "./components/footer";
function App() {
  return (
    <div className="site-wrap">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
