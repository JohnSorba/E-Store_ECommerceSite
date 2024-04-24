import React from "react";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const goToProducts = () => {
  navigate("/products");
};

function Header() {
  return (
    <div className="hero grid place-items-center bg-blend-color">
      <div className="hero-details">
        <h1 className="font-bold mb-2">
          <span className="text-8xl">
            Welcome to <span>Mona</span>
          </span>
          <br />
          <span className="text-5xl">ecommerce Store</span>
        </h1>
        <p className="text-2xl text-center">
          Get all your latest products here!
        </p>
        <button onClick={goToProducts} className="btn-goToProducts">
          Go to Products
        </button>
      </div>
    </div>
  );
}

export default Header;
