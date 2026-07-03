import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import React from "react";
import { createOrder } from "../../api/orders.api"; // connect backend

export default function CartPreview({ user, pharmacyId }) {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch cart items from backend or localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateQty = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1),
            }
          : item,
      ),
    );
  };

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to place an order.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Cart is empty.");
      return;
    }

    const orderData = {
      pharmacy: pharmacyId,
      items: cartItems.map((i) => ({
        medicine: i.id,
        name: i.name,
        price: i.price,
        quantity: i.qty,
      })),
      deliveryAddress: user.address, // or a form input
      pricing: {
        total,
        tax: 0,
        discount: 0,
      },
      paymentMethod: "cod",
    };

    try {
      setLoading(true);
      const res = await createOrder(orderData);
      alert(res.message);
      setCartItems([]);
      localStorage.removeItem("cart");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Cart Icon */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed right-6 top-24 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition z-50"
      >
        <FaShoppingCart size={20} />
      </button>

      {/* Cart Panel */}
      {isOpen && (
        <aside className="fixed right-6 top-32 w-80 bg-white p-6 rounded-xl border shadow-lg z-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Cart Summary</h3>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="divide-y">
              {cartItems.map((item) => (
                <li key={item.id} className="py-3 flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQty(item.id, "dec")}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, "inc")}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="font-semibold">
                    ₹{item.price * item.qty}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full bg-gray-800 hover:bg-gray-900 text-gray-100 py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Checkout"}
          </button>
        </aside>
      )}
    </>
  );
}
