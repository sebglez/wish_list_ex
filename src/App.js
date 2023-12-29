import { useEffect } from "react";
import "./App.scss";
import { ContextProvider, useContextWishes } from "./context/useContextWishes";
import ActiveWishes from "./pages/ActiveWished";
import CompletedWishes from "./pages/CompletedWishes";
import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";

const router = createBrowserRouter([
  { path: "/", element: <Home></Home> },

  { path: "/completed", element: <CompletedWishes></CompletedWishes> },

  { path: "/active", element: <ActiveWishes></ActiveWishes> },
]);

function App() {
  const { getWishes } = useContextWishes();

  useEffect(() => {
    async function getApiWishes() {
      const apiWishes = await axios.get("http://localhost:3001/wish");
      getWishes(apiWishes.data);
    }
    getApiWishes();
  }, []);

  return (
    <div className="mainDiv">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
