import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetOrdersByEmailQuery } from "@/redux/features/order/OrderApi";
import TableLoading from "../TableLoading";
import { TOrder } from "@/types";

// type TProduct = {
//   _id: string;
//   product: {
//     title: string;
//   };
//   quantity: number;
// };

const Orders: React.FC = () => {
  const user = useSelector(useCurrentUser);
  const { data, isLoading } = useGetOrdersByEmailQuery(user?.email, {
    skip: !user?.email,
  });
  // console.log(data?.data);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  if (isLoading) return <TableLoading />;

  const orders = data?.data || [];
  console.log(orders);
  const totalPages = Math.ceil(orders.length / pageSize);
  const currentData = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  console.log(currentData);

  const getStatusColor = (status: string) => {
    if (status === "Paid") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-orange-100 text-orange-700";
    if (status === "Cancelled") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  const renderDate = (createdAt: string) => {
    const date = new Date(createdAt);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="w-full p-4 space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Products Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Order At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((order: TOrder) => (
            <TableRow key={order._id}>
              <TableCell>{order.transaction?.id}</TableCell>
              <TableCell>
                {order.populatedProducts.map((p) => (
                  <div key={p._id}>{p?.title}</div>
                ))}
              </TableCell>
              <TableCell>
                {order.products.map((p) => (
                  <div key={p._id}>{p.quantity}</div>
                ))}
              </TableCell>
              <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>{order.transaction?.method}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "text-sm px-2 py-1 rounded",
                    getStatusColor(order.status)
                  )}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell>{renderDate(order.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium border",
                  currentPage === pageNum
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300"
                )}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
