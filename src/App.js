import logo from './logo.svg';
// import './App.css';
import { Outlet } from 'react-router-dom';
import HeaderHome from './components/Header/HeaderHome';
import FooterHome from './components/Footer/FooterHome';

function App() {
  return (
    <div className="App">
      <HeaderHome/>
       <Outlet/>
       <FooterHome/>
    </div>
  );
}

export default App;
