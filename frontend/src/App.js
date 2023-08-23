import Home from "./component/Home.jsx";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'

function App() {
  return (
      <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </Router>

  );
}

export default App;
