import "./App.css";
import { HomePageWrapper } from "./pages/home_page_wrapper";
import { Web3Provider } from "./store/store";

function App() {
  return (
    <Web3Provider>
      <HomePageWrapper />
    </Web3Provider>
  );
}

export default App;
