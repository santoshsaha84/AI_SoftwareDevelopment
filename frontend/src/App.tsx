import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoryPage from './pages/CategoryPage';
import ItemPage from './pages/ItemPage';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="register" element={<Register />} />
        <Route path="category/:id" element={<CategoryPage />} />
        <Route path="item/:id" element={<ItemPage />} />
        <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '50px' }}>Page Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
