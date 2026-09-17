import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("farmcart_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("farmcart_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const productId = product._id || product.id;

      const existingIndex = prevItems.findIndex(
        (item) => item.product === productId
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];

        const newQty =
          updated[existingIndex].quantity + quantity;

        if (newQty > product.quantity) {
          toast.error(
            `Only ${product.quantity} ${product.unit} available from farm`
          );

          return prevItems;
        }

        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };

        toast.success(
          `Updated ${product.name} quantity in cart!`
        );

        return updated;
      }

      /*
       * Product farmer is populated by the backend:
       *
       * farmer: {
       *   _id,
       *   name,
       *   email,
       *   phone
       * }
       */

      const farmerId =
        typeof product.farmer === "object"
          ? product.farmer?._id
          : product.farmer;

      const farmerName =
        typeof product.farmer === "object"
          ? product.farmer?.name
          : null;

      const farmerPhone =
        typeof product.farmer === "object"
          ? product.farmer?.phone
          : null;

      const farmerEmail =
        typeof product.farmer === "object"
          ? product.farmer?.email
          : null;

      const newItem = {
        // Product
        product: productId,
        name: product.name,
        price: Number(product.price),
        unit: product.unit || "kg",
        quantity: Math.min(
          quantity,
          product.quantity || 999
        ),

        image:
          product.image ||
          (product.images && product.images[0]) ||
          "",

        // Farmer
        farmer: farmerId || null,
        farmerName: farmerName || "Local Farmer",
        farmerPhone: farmerPhone || "Not available",
        farmerEmail: farmerEmail || "",

        // Product location
        location:
          product.location || "Sri Lanka",

        // Stock
        maxQuantity:
          product.quantity || 999,
      };

      toast.success(
        `Harvest added to cart: ${product.name}`
      );

      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => item.product !== productId
      )
    );

    toast.success("Item removed from cart");
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product === productId) {
          if (newQty > item.maxQuantity) {
            toast.error(
              `Maximum available harvest stock is ${item.maxQuantity} ${item.unit}`
            );

            return item;
          }

          return {
            ...item,
            quantity: newQty,
          };
        }

        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);

    localStorage.removeItem("farmcart_cart");
  };

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );

  const itemCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider"
    );
  }

  return context;
};