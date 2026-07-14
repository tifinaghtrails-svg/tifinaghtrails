import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PageLoading from "../components/layout/PageLoading";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Tours = lazy(() => import("../pages/Tours"));
const TourDetails = lazy(() => import("../pages/TourDetails"));
const Destinations = lazy(() => import("../pages/Destinations"));
const Gallery = lazy(() => import("../pages/Gallery"));
const FAQ = lazy(() => import("../pages/FAQ"));
const Contact = lazy(() => import("../pages/Contact"));
const Booking = lazy(() => import("../pages/Booking"));
const NotFound = lazy(() => import("../pages/NotFound"));

function ScrollToTopOnNav() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
}

function RouteLoadingTransition() {
  const { pathname, search } = useLocation();
  const [loading, setLoading] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return undefined;
    }

    const showTimer = window.setTimeout(() => setLoading(true), 0);
    const hideTimer = window.setTimeout(() => setLoading(false), 520);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [pathname, search]);

  return loading ? <PageLoading overlay /> : null;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTopOnNav />
      <RouteLoadingTransition />
      <Suspense fallback={<PageLoading />}>
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
      </Suspense>
    </>
  );
}
