import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Layouts/Home";
import Card from "./Layouts/Card";
import HomeRoom from "./Layouts/RoomList/HomeRoom";
import ClientForm from "./Layouts/Form/ClientForm";
import LoginClients from "./Layouts/Form/LoginClients";

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<ClientForm />} />
            <Route path="/Login" element={<LoginClients />} />
            <Route path="/RoomDashboard" element={<HomeRoom />} />
            <Route path="/Chat" element={<Home />} />
            <Route path="/card" element={<Card />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
