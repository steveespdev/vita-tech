import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BuyerForm from "./pages/buyerForm";
import Tracker from "./pages/Tracker";
import NavBar from "./components/navbar";




function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<BuyerForm />}></Route>
          <Route path="/tracking" element={<Tracker />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
