import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavBar from './components/user/NavBar';
import HomePageCard from './components/user/HomePageCard'; // Correct import path
// import FoodItems from './Page/FoodItems';
import SouthIndianFoodItems from './Page/SouthIndianFoodItems';
import ChineseFoodItems from './Page/ChineseFoodItems';
import PunjabiFoodItems from './Page/PunjabiFoodItems';
import PizzaFoodItems from './Page/PizzaFoodItems';
import Cart from './Page/Cart';
import TotalBill from './components/user/TotalBill';
import { CartProvider } from './context/CartContext';
// import AdminLogin from './components/user/Login';
import Admin from './components/admin/Admin';
// import parent from './components/user/parent';
import AddItem from './components/admin/AddItem';
import UpdateItem from './components/admin/UpdateItem';
import ChefPanel from './Page/ChefPanel';
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          {/* <NavBar title="La'RIVERA INN" /> */}
          <Routes>
            {/* <Route path="/"  element={<NavBar title="La'RIVERA INN"/>} /> */}
            <Route path="/" element={<HomePageCard />} />
            <Route path="/title" element={<HomePageCard />} />
            <Route path="/south-indian" element={<SouthIndianFoodItems />} />
            <Route path="/chinese" element={<ChineseFoodItems />} />
            <Route path="/punjabi" element={<PunjabiFoodItems />} />
            <Route path="/pizza" element={<PizzaFoodItems />} />
            {/* <Route path="/food-items" element={<FoodItems />} /> */}
            <Route path="/total-bill" element={<TotalBill />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/Login" element={<AdminLogin/>} /> */}
            <Route path="/Admin" element={<Admin/>} />
            <Route path="/AddItem" element={<AddItem/>} />
            <Route path="/UpdateItem" element={<UpdateItem/>} />
            <Route path="/chefpanel" element={<ChefPanel/>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
