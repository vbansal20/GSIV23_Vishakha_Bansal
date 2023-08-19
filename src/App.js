import './App.css';
import NavBar from './Components/NavBar';
import DetailsPage from './Components/DetailsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path='/' element={<NavBar/>} />
            <Route path='/details/:id' element={<DetailsPage/>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
