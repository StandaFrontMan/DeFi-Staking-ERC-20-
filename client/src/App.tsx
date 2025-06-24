import "./App.css";
import { HomePage } from "./pages/home_page";
import { Web3Provider } from "./store/store";

function App() {
  return (
    <Web3Provider>
      <HomePage />
    </Web3Provider>
  );
}

export default App;
