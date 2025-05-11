import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/index.jsx";

// Get the base URL from Vite environment or use empty string for local development
const basename = import.meta.env.BASE_URL !== '/' ? import.meta.env.BASE_URL : '';

function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
