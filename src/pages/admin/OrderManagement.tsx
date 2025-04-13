import  { useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";


import { toast } from "sonner";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useDeleteOrderMutation, useGetOrdersQuery, useUpdateOrderStatusMutation } from "@/redux/features/order/OrderApi";
import { TMessage, TOrder } from "@/types";
import TableLoading from "../TableLoading";

// type TProduct = {
//   _id: string;
//   products: { title: string };
//   quantity: number;
// };

const OrderManagement = () => {
  const user = useSelector(useCurrentUser);
  const { data, isLoading, refetch } = useGetOrdersQuery(user?.email, {
    skip: !user?.email,
  });
  console.log(data);
  
  console.log(data?.data?.produts);
  
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirmId) return;
    try {
      const res = await deleteOrder(confirmId);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        refetch();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error((error as TMessage)?.data?.message);
    } finally {
      setConfirmId(null);
    }
  };

  const handleStatusChange = async (value: string, orderId: string) => {
    try {
      const res = await updateOrderStatus({ orderId, status: value });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        refetch();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error((error as TMessage)?.data?.message);
    }
  };

  if (isLoading) return <TableLoading />;

  return (
    <div className="p-4 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Quantities</TableHead>
            <TableHead>Total Price</TableHead>
            {/* <TableHead>Payment</TableHead> */}
            <TableHead>Status</TableHead>
            <TableHead>Order At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((order: TOrder) => (
            <TableRow key={order._id}>
              <TableCell>{order.transaction?.id}</TableCell>
              <TableCell>
                {order.products.map((p) => (
                  <div key={p._id}>{p.product?.title}</div>
                ))}
              </TableCell>
              <TableCell>
                {order.products.map((p) => (
                  <div key={p._id}>{p.quantity}</div>
                ))}
              </TableCell>
              <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              {/* <TableCell>{order.transaction?.method}</TableCell> */}
              <TableCell>
                <Select
                  defaultValue={order.status}
                  onValueChange={(val) => handleStatusChange(val, order._id)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString("en-GB")}
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      onClick={() => setConfirmId(order._id)}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this order.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setConfirmId(null)}>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderManagement;
