import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
          <div className="p-4 sm:p-6 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
