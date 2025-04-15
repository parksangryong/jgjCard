import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="layout-container">
      <Outlet />
      <span className="copyright">
        © {currentYear} Memomo. Mirr56 All rights reserved. 2025
      </span>
    </div>
  );
};

export default BaseLayout;
