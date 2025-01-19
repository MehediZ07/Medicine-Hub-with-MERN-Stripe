import { useState } from "react";
import DataTable from "react-data-table-component";
import { DateRangePicker } from "react-date-range";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

export default function SalesReport() {
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { user } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();

  const { data: salesData = [], isLoading } = useQuery({
    queryKey: ["orders", role === "seller" ? user?.email : "All orders"],
    queryFn: async () => {
      if (role === "seller") {
        const { data } = await axiosSecure(
          `/seller-orders?email=${user?.email}`
        );
        return data;
      }
      const { data } = await axiosSecure(`/seller-orders`);
      return data;
    },
  });

  // Filter data by date range
  const handleFilter = () => {
    const startDate = dateRange[0].startDate;
    const endDate = dateRange[0].endDate;
    const filtered = salesData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
    setFilteredData(filtered);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 105, 10, { align: "center" });
    autoTable(doc, {
      head: [
        [
          "Medicine Name",
          "Seller Email",
          "Buyer Email",
          "Quantity",
          "Total Price",
        ],
      ],
      body: (filteredData.length > 0 ? filteredData : salesData).map((item) => [
        item.name,
        item.seller,
        item.buyer,
        item.quantity,
        `$${(item.price * item.quantity).toFixed(2)}`,
      ]),
    });
    doc.save("sales_report.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.length > 0 ? filteredData : salesData
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
    XLSX.writeFile(workbook, "sales_report.xlsx");
  };

  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.length > 0 ? filteredData : salesData
    );
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "sales_report.csv");
  };

  const columns = [
    { name: "Medicine Name", selector: (row) => row.name, sortable: true },
    { name: "Seller Email", selector: (row) => row.seller, sortable: true },
    {
      name: "Buyer Email",
      selector: (row) => row.customer.email,
      sortable: true,
    },
    { name: "Quantity", selector: (row) => row.quantity, sortable: true },
    {
      name: "Total Price",
      selector: (row) => `$${(row.price * row.quantity).toFixed(2)}`,
      sortable: true,
    },
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 overflow-auto">
      <h1 className="text-center font-bold text-2xl text-gray-800 mb-6">
        Sales Report
      </h1>

      <div className="flex flex-col gap-4 justify-between items-center mb-6">
        <DateRangePicker
          ranges={dateRange}
          onChange={(item) => setDateRange([item.selection])}
          className="rounded-lg shadow-md"
        />
        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
        >
          Filter
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData.length > 0 ? filteredData : salesData}
        pagination
        highlightOnHover
        className="shadow-md rounded-lg"
      />

      <div className="flex gap-4 mt-6 justify-center">
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Export PDF
        </button>
        <button
          onClick={exportExcel}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Export Excel
        </button>
        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Export CSV
        </button>
      </div>
    </div>
  );
}
