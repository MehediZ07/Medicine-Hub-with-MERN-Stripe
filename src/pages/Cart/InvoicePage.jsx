import React from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const InvoicePage = ({ cartItems, user }) => {
  const { paymentId } = useParams();
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.buyQuantity,
      0
    );
  };

  return (
    <div className="invoice-page" ref={componentRef}>
      <h1>Invoice</h1>
      <p>Website Logo</p>
      <p>User Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Payment ID: {paymentId}</p>

      <table>
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.buyQuantity}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total: ${calculateTotal()}</h2>
      <button onClick={handlePrint}>Print Invoice</button>
    </div>
  );
};

export default InvoicePage;
