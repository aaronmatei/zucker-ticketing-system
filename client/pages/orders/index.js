import React, * as react from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const showOrders = ({ orders, loading }) => {
  // const { loading, success, successMessage, errors, orders } = useSelector(
  //   (state) => state.ordersss
  // );
  react.useEffect(() => {
    console.log("USE EFFECT ORDERS CALLED", orders);
  }, [orders]);

  const ordersList = orders.map((orderr) => {
    return (
      <tr key={orderr.id}>
        <td>{orderr.id.substring(20, 24)}</td>
        <td>{orderr.status}</td>
        <td>{orderr.ticket.title}</td>
        <td>{orderr.ticket.price}</td>
        <td>{orderr.expiresAt}</td>
        <td>
          <Link href="/orders/[orderId]" as={`/orders/${orderr.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Thsese are your orders</h1>
          <Link href="/">
            <button className="btn btn-info">View tickets</button>
          </Link>
        </div>
        {loading ? (
          "Loading orders..."
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Ticket Title</th>
                <th>Ticket Price</th>
                <th>Expires At</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>{ordersList}</tbody>
          </table>
        )}
      </div>
    </div>
  );
};
showOrders.getInitialProps = async (context) => {
  const { orders, loading } = context.store.getState().ordersss;
  return { orders, loading };
};
export default showOrders;
