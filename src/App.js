import "./App.scss";
import { ContextProvider } from "./context/useContextWishes";
import ActiveWishes from "./pages/ActiveWished";
import CompletedWishes from "./pages/CompletedWishes";
import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home></Home> },

  { path: "/completed", element: <CompletedWishes></CompletedWishes> },

  { path: "/active", element: <ActiveWishes></ActiveWishes> },
]);

function App() {
  return (
    <div className="mainDiv">
      <ContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </ContextProvider>
    </div>
  );
}

export default App;
