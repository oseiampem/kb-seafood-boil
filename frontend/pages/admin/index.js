import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await api.get("/api/orders");
        setOrders(res.data.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>KB Seafood Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <h3>{order.customerName}</h3>
            <p>Phone: {order.phone}</p>
            <p>Location: {order.location}</p>

            <strong>Items:</strong>
            <ul>
              {order.orderItems.map((item, i) => (
                <li key={i}>
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}