import { Outlet } from "react-router-dom";
import "../public/css/style.css";
import Header from "./components/header";
import Footer from "./components/footer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
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
