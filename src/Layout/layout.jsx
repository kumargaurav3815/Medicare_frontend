/** @format */

import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";

const Layout = () => {
  const location = useLocation();

  const isExcludedPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/reset-password/:{token}" ||
    location.pathname === "/forgotPassword";

  return (
    <>
      <main>
        <Routers />
      </main>
      {!isExcludedPage && <Footer />}
    </>
  );
};

export default Layout;
