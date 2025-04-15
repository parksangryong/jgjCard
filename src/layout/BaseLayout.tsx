import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="layout-container">
      <Outlet />
    </div>
  );
};

export default BaseLayout;
