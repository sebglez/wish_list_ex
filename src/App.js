import "./App.css";
import { Counter } from "./components/Counter";
import CreateWish from "./components/CreateWish";
import WishList from "./components/WishList";
import { ContextProvider } from "./context/useContextWishes";

function App() {
  return (
    <div>
      <ContextProvider>
        <WishList></WishList>
        <CreateWish></CreateWish>
        <Counter></Counter>
      </ContextProvider>
    </div>
  );
}

export default App;
