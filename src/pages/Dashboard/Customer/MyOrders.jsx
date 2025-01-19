import { Helmet } from "react-helmet-async";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/customer-orders/${user?.email}`);

      return data;
    },
  });
  console.log(orders);

  // Step 1: Group data by transactionId and sum price, quantity, medicine names, and capture the first status
  const groupedByTransaction = orders.reduce((acc, order) => {
    // Check if the transactionId already exists in the accumulator
    if (!acc[order.transactionId]) {
      // If not, initialize it with a new object
      acc[order.transactionId] = {
        transactionId: order.transactionId,
        totalPrice: 0,
        totalQuantity: 0,
        medicineNames: new Set(), // Use a Set to avoid duplicates
        status: order.status, // Capture the first status encountered
      };
    }

    // Add the current order's price and quantity to the totals
    acc[order.transactionId].totalPrice += order.price * order.quantity;
    acc[order.transactionId].totalQuantity += order.quantity;

    // Add the medicine name to the set (ensures unique names)
    acc[order.transactionId].medicineNames.add(order.name);

    return acc;
  }, {});

  // Step 2: Convert the grouped object to an array of objects and format the names
  const resultArray = Object.values(groupedByTransaction).map((item) => {
    // Convert the Set of medicine names to a comma-separated string
    return {
      transactionId: item.transactionId,
      totalPrice: item.totalPrice,
      totalQuantity: item.totalQuantity,
      name: Array.from(item.medicineNames).join(", "), // Join names with a comma
      status: item.status, // Add the status field (first encountered)
    };
  });

  console.log(resultArray);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Helmet>
        <title>My Orders</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8 overflow-auto">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="text-center">
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Medicine Name
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Total Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Total Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Transaction ID
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resultArray.map((orderData, i) => (
                    <CustomerOrderDataRow
                      key={i}
                      i={i}
                      refetch={refetch}
                      orderData={orderData}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
