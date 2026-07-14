import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import OptionalTracking from "./components/layout/OptionalTracking";
import ScrollToTopBtn from "./components/layout/ScrollToTop";
import FloatingWhatsApp from "./components/layout/FloatingWhatsApp";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <div className="page-wrapper">
        <Navbar />
        <OptionalTracking />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <ScrollToTopBtn />
      </div>
    </BrowserRouter>
  );
}
