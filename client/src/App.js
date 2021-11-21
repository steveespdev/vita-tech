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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




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
      <ToastContainer />
    </div>
  );
}

export default App;
