import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTopBtn from "./components/layout/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <div className="page-wrapper">
        <Navbar />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
        <ScrollToTopBtn />
      </div>
    </BrowserRouter>
  );
}
