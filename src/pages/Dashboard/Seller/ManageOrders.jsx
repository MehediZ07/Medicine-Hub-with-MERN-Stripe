import { Helmet } from "react-helmet-async";

import SellerOrderDataRow from "../../../components/Dashboard/TableRows/SellerOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useRole from "../../../hooks/useRole";

const ManageOrders = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", role === "seller" ? user?.email : "All orders"],
    queryFn: async () => {
      if (role === "seller") {
        const { data } = await axiosSecure(
          `/seller-orders?email=${user?.email}`
        );
        return data;
      }
      const { data } = await axiosSecure(`/seller-orders`);
      return data.reverse();
    },
  });

  // Group orders by date
  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.date]) {
      acc[order.date] = [];
    }

    acc[order.date].push(order);

    return acc;
  }, {});

  const groupedArray = Object.keys(groupedOrders).map((date) => ({
    date: date,
    orders: groupedOrders[date],
  }));

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Helmet>
        <title>Medicine Hub || Manage Orders</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Transaction Id
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    {role === "seller" ? (
                      <></>
                    ) : (
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((orderData) => (
                    <SellerOrderDataRow
                      key={orderData?._id}
                      orderData={orderData}
                      refetch={refetch}
                      role={role}
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

export default ManageOrders;
