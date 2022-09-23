import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateStudent from './components/CreateStudent/CreateStudent';
import EditStudent from './components/EditStudent/EditStudent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateStudent />} />
          <Route path="/edit" element={<EditStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
