import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import TestRoute from "./routes/TestRoute.tsx";
import Home from "./routes/Home.tsx";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // mTODO: Add error catch element here
    errorElement: <div>ERROR</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/test",
        element: <TestRoute />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
