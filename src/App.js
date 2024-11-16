import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';
import Products from './pages/products/Products';
import Users from './pages/users/Users';
import PrivateRoute from './common/components/PrivateRoute';
import NotFound from './pages/not-found/NotFound';

function App() {
  return (
    <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/sign-up' element={<Signup />}></Route>
        <Route path='/profile' element={<PrivateRoute component={<Profile />} />}></Route>
        <Route path='/products' element={<PrivateRoute component={<Products />} />}></Route>
        <Route path='/users' element={<Users />}></Route>
        <Route path='/' element={<Navigate to={'/login'}/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
    </Routes>
  );
}

export default App;
