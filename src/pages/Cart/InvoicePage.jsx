import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import logo from "../../assets/images/logo.png";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useParams } from "react-router-dom";
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";

const InvoicePage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/customer-orders/${user?.email}/${id}`
      );
      return data;
    },
  });

  const calculateTotal = () => {
    let total = 0;
    orders.forEach((order) => {
      total += order.price;
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [orders]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleDownload = () => {
    const doc = new jsPDF();

    // Add logo
    const imgWidth = 30;
    const imgHeight = 13;
    doc.addImage(logo, "PNG", 14, 10, imgWidth, imgHeight);

    // Add title
    doc.text("Invoice", 105, 30, { align: "center" });

    // Add customer details
    doc.text(`Customer Name: ${orders[0]?.customer?.name || "N/A"}`, 14, 40);
    doc.text(`Customer Email: ${orders[0]?.customer?.email || "N/A"}`, 14, 50);
    doc.text(`Seller Email: ${orders[0]?.seller || "N/A"}`, 14, 60);
    doc.text(
      `Payment Transaction ID: ${orders[0]?.transactionId || "N/A"}`,
      14,
      70
    );

    // Define table content
    const tableData = orders.map((order) => [
      order?.name || "N/A",
      order?.category || "N/A",
      order?.quantity || 0,
      `$${order?.price / order?.quantity || 0}`,
      `$${(order?.price || 0).toFixed(2)}`,
    ]);

    // Add the table
    autoTable(doc, {
      startY: 80,
      head: [
        ["Medicine Name", "Category", "Quantity", "Price/Piece", "Total Price"],
      ],
      body: tableData,
    });

    // Add total price and quantity
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(
      `Total Quantity: ${orders.reduce(
        (sum, order) => sum + (order?.quantity || 0),
        0
      )}`,
      14,
      finalY
    );
    doc.text(`Total Price: $${totalPrice.toFixed(2)}`, 14, finalY + 10);

    // Save the PDF
    doc.save("invoice.pdf");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Helmet>
        <title> Medicine Hub | Incoice</title>
      </Helmet>
      <div
        id="invoice"
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Header Section */}
        <header
          style={{
            textAlign: "center",
            borderBottom: "2px solid #003f60",
            paddingBottom: "15px",
            marginBottom: "20px",
          }}
        >
          <img
            src={logo}
            alt="Website Logo"
            style={{ width: "120px", marginBottom: "10px" }}
          />
          <h1 style={{ color: "#333", fontSize: "24px" }}>Invoice</h1>
        </header>

        {/* Customer Information */}
        <section
          style={{
            marginBottom: "20px",
            backgroundColor: "#f9f9f9",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ color: "#003f60", marginBottom: "5" }}>
            Seller Information
          </h3>
          <p className="mb-4">
            <strong>Seller Email:</strong> {orders[0]?.seller || "N/A"}
          </p>
          <h3 style={{ color: "#003f60", marginBottom: "5px" }}>
            Customer Information
          </h3>
          <p>
            <strong>Customer Name:</strong> {orders[0]?.customer?.name || "N/A"}
          </p>
          <p>
            <strong>Customer Email:</strong>{" "}
            {orders[0]?.customer?.email || "N/A"}
          </p>

          <p>
            <strong>Payment Transaction ID</strong>{" "}
            {orders[0]?.transactionId || "N/A"}
          </p>
          <img
            src={orders[0]?.customer?.image || "/path/to/default-image.png"}
            alt="Customer"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              marginTop: "10px",
              border: "2px solid #003f60",
            }}
          />
        </section>

        {/* Address */}
        <section
          style={{
            marginBottom: "20px",
            backgroundColor: "#f9f9f9",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ color: "#003f60", marginBottom: "10px" }}>
            Shipping Address
          </h3>
          <p style={{ marginBottom: "0" }}>
            {orders[orders.length - 1]?.address || "N/A"}
          </p>
        </section>

        {/* Medicines Table */}
        <section style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#003f60", marginBottom: "15px" }}>
            Medicine Details
          </h3>
          <table
            border="0"
            cellPadding="10"
            style={{
              width: "100%",
              textAlign: "left",
              borderCollapse: "collapse",
              fontSize: "14px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#003f60",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <th>Medicine Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price/Piece</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    textAlign: "center",
                  }}
                >
                  <td>{order?.name || "N/A"}</td>
                  <td>{order?.category || "N/A"}</td>
                  <td>{order?.quantity || 0}</td>
                  <td>${order?.price / order?.quantity || 0}</td>
                  <td>${(order?.price || 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Total Price Section */}
        <section
          style={{
            marginTop: "20px",
            textAlign: "right",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          <p>
            <strong>Total Quantity:</strong>{" "}
            {orders?.reduce((sum, order) => sum + (order?.quantity || 0), 0)}
          </p>
          <p>
            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
          </p>
        </section>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            marginTop: "40px",
            color: "#777",
            fontSize: "14px",
          }}
        >
          <p>Thank you for shopping with us!</p>
          <p>Contact us for any questions: admin@gmail.com</p>
        </footer>

        {/* Download Invoice Button */}
        <button
          onClick={handleDownload}
          style={{
            marginTop: "20px",
            backgroundColor: "#003f60",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Download Invoice as PDF
        </button>
      </div>
    </Container>
  );
};

export default InvoicePage;
