import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./components/AuthContext";
// import { FirebaseProvider } from "./components/FirebaseContext";
import { ref, set, get, onValue } from "firebase/database";
import { db } from "./firebase";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductCheckout from "./pages/ProductCheckout";
import CartCheckout from "./pages/CartCheckout";
import OrderConfirm from "./pages/OrderConfirm";
import ProductOrderConfirm from "./pages/ProductOrderConfirm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  const { currentUser } = useAuth();
  console.log(currentUser);
  const userUid = currentUser?.uid;
  console.log("cart items: ", cartItems);

  // RETRIEVE FROM FIREBASE
  const getCartData = async (userId) => {
    try {
      const cartRef = ref(db, `carts/${userId}`);
      const snapshot = await get(cartRef);

      if (snapshot.exists()) {
        return snapshot.val(); // Return the data from the snapshot
      }
      return null;
    } catch (error) {
      console.error("Error fetching user data: ", error.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCartData(userUid);
      if (data) {
        setCartItems(data);
      }
    };
    fetchData();
  }, [userUid]);

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

  // Store USER DATA TO FIREBASE
  const storeUserData = (userId, userData) => {
    // create reference to the user's data in the database
    const userRef = ref(db, `users/${userId}`);
    // Set the user's data in the database
    set(userRef, userData);
  };

  // STORE IN FIREBASE
  const updateCartData = (userId, cartData) => {
    const cartRef = ref(db, `carts/${userId}`);
    set(cartRef, cartData);
  };

  // ADD TO CART
  const addToCart = async (item, quantity) => {
    ///
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
      updateCartData(userUid, updatedCartItems);
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
      updateCartData(userUid, updatedCart);
    }
    alert(`${quantity} ${item.title} added to cart`);

    // STORE IN LOCAL STORAGE
    // localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const selectedProductItems = () => {
    if (cartItems !== null) {
      const selectedItems = cartItems.filter((item) => item.isChecked);
      return selectedItems;
    }
  };
  const selectedItems = selectedProductItems();

  // TOTAL-SUBTOTAL
  const calculateSelectedSubtotals = () => {
    if (cartItems !== null) {
      const selectedItems = cartItems.filter((item) => item.isChecked);
      const selectedSubtotal = selectedItems.reduce(
        (total, item) => total + Number(item.subtotal),
        0
      );
      return selectedSubtotal;
    }
  };
  const totalSubtotals = calculateSelectedSubtotals();

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

  // // PERSIST DATA IN LOCAL STORAGE
  // useEffect(() => {
  //   const storedCartItems = localStorage.getItem("cart");
  //   if (storedCartItems) {
  //     setCartItems(JSON.parse(storedCartItems));
  //   }
  // }, []);

  // RETRIEVE orderDetails from local storage
  useEffect(() => {
    const storedOrderDetails = localStorage.getItem("orderDetails");
    if (storedOrderDetails) {
      setOrderDetails(JSON.parse(storedOrderDetails));
    }
  }, []);

  // Retrieve products from FakeStore API
  useEffect(function () {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("There was an issue fetching the data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Retrieve cart data from Firebase

  return (
    <div className="mt-12">
      <BrowserRouter>
        <Navbar cartItemCount={cartItems.length} db={db} />

        <Routes>
          <Route path="/login" element={<Login getCartData={getCartData} />} />
          <Route
            path="/profile/:currentUser"
            element={<ProfilePage storeUserData={storeUserData} />}
          />
          <Route
            path="/register"
            element={<Register db={db} storeUserData={storeUserData} />}
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/#products-section" element={<HomePage />} />
          <Route
            path="/"
            element={
              <HomePage
                products={products}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onProductClick={handleProductClick}
                loading={isLoading}
              />
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
                product={products}
                onProductClick={handleProductClick}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CartCheckout
                cartItems={cartItems}
                orderDetails={orderDetails}
                setOrderDetails={setOrderDetails}
                selectedItems={selectedItems}
                totalSubtotals={totalSubtotals}
              />
            }
          />
          <Route
            path="/product/:id/checkout/:quantity"
            element={
              <ProductCheckout
                orderDetails={orderDetails}
                setOrderDetails={setOrderDetails}
              />
            }
          />
          <Route
            path="/orderConfirm"
            element={
              <OrderConfirm
                orderDetails={orderDetails}
                selectedItems={selectedItems}
                totalSubtotals={totalSubtotals}
              />
            }
          />
          <Route
            path="/order-confirm/:id/:quantity"
            element={
              <ProductOrderConfirm
                orderDetails={orderDetails}
                totalSubtotals={totalSubtotals}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                addToCart={addToCart}
              />
            }
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
