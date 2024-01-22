import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';

function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <Header />
      <Routes>
      <Route path='/' Component={Homepage } exact/>
      <Route path='/coins/:id' Component={CoinPage} exact/>  
      </Routes>
        
    </div>
    </BrowserRouter>
  );
}

export default App;
