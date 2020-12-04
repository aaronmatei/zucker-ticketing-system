import React, * as react from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const showOrders = () => {
  const { loading, success, successMessage, errors, orders } = useSelector(
    (state) => state.ordersss
  );
  react.useEffect(() => {
    console.log("USE EFFECT ORDERS CALLED");
    console.log("ORDERS INDEX", orders);
  }, []);

  const ordersList = orders.map((orderr) => {
    return (
      <tr key={orderr.id}>
        <td>{orderr.id.substring(20, 24)}</td>
        <td>{orderr.userId}</td>
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
        <h1>This are your orders</h1>
        {loading ? (
          "Loading orders..."
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>User Id</th>
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
  return {};
};
export default showOrders;
