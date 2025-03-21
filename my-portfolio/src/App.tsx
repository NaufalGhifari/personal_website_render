import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home.tsx'
import Pharmacy from './pages/Pharmacy.tsx'

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
      </Routes>
    </Router>
  )
}

export default App
