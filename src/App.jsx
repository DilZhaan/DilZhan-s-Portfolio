import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/index.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
