import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import Home from "./page/Home";
import CardFlip from "./page/CardFlip";

// layout
import BaseLayout from "./layout/BaseLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/card-flip",
          element: <CardFlip />,
        },
      ],
    },
    {
      path: "/card-flip",
      element: <CardFlip />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
