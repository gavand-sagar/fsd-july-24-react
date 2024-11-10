import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './features/login/Login';
import Signup from './features/signup/Signup';
import Profile from './features/profile/Profile';
import Products from './features/products/Products';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/sign-up' element={<Signup />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/products' element={<Products />}></Route>
      </Routes>
    </div>
  );
}

export default App;
