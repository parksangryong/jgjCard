import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactGA4 from "react-ga4";
import { useEffect } from "react";
// pages
import Home from "./page/Home";
import CardFlip from "./page/CardFlip";

// layout
import BaseLayout from "./layout/BaseLayout";

function App() {
  useEffect(() => {
    ReactGA4.initialize([
      {
        trackingId: "G-85STCFYNCW", //받은 키
        gaOptions: {
          siteSpeedSampleRate: 100,
        },
      },
    ]);
  }, []);
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
