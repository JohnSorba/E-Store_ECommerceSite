import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  console.log(cartItems);

  // UPDATE ITEM QUANTITY
  const updateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const newSubtotal = item.price * newQuantity;
        return { ...item, quantity: newQuantity, subtotal: newSubtotal };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // SELECT ITEM FOR PREVIEW
  function handleProductClick(id) {
    setSelectedProduct((selectedProduct) =>
      id === selectedProduct ? null : id
    );
  }

  // ADD TO CART
  const addToCart = (item, quantity) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingCartItem) {
      // Item already exists in the cart, update the quantity
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      // Item doesn't exist in the cart, add it
      const newItem = {
        ...item,
        quantity: quantity,
        subtotal: item.price * quantity,
        isChecked: false,
      };
      const updatedCart = [...cartItems, newItem];
      setCartItems(updatedCart);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  // REMOVE FROM CART
  const removeCartItem = (product) => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // DELETE ALL ITEMS FROM CART
  const removeAll = () => {
    setCartItems([]);
    const updatedCart = setCartItems([]);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // PERSIST DATA IN LOCAL STORAGE
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(function () {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("There was an issue fetching the data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar cartItemCount={cartItems.length} />

        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <Loader />
              ) : (
                <HomePage
                  products={products}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onProductClick={handleProductClick}
                />
              )
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeItem={removeCartItem}
                removeAll={removeAll}
                setCartItems={setCartItems}
                updatedQuantity={updateQuantity}
              />
            }
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/product/:id"
            element={
              //
              <ProductDetails
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                addToCart={addToCart}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
