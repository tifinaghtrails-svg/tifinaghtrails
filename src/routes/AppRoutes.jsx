import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Destinations from "../pages/Destinations";
import Gallery from "../pages/Gallery";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";
import Booking from "../pages/Booking";
import NotFound from "../pages/NotFound";

function ScrollToTopOnNav() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTopOnNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:slug" element={<TourDetails />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
