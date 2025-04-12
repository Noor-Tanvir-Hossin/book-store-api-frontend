import React from "react";

import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TMessage } from "@/types";
import TableLoading from "../TableLoading";
import { TProduct } from "@/types/product.type";

import { useDeleteProductMutation, useGetProductsQuery } from "@/redux/features/ProductsApi/ProductsApi";

const ProductManagement: React.FC = () => {
  const { data, isLoading, refetch } = useGetProductsQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const [confirmDialog, setConfirmDialog] = React.useState<null | string>(null);

  if (isLoading) {
    return <TableLoading />;
  }

  const handleDelete = async (productId: string) => {
    try {
      const res = await deleteProduct(productId);
      console.log(productId)
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        refetch();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error((error as TMessage)?.data?.message);
    } finally {
      setConfirmDialog(null);
    }
  };

  return (
    <div className="w-full p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Product Management</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((product: TProduct) => (
            <tr key={product._id} className="text-center">
              <td className="px-4 py-2 border">
                <img src={product.image} alt="product" className="w-12 h-12 object-cover mx-auto" />
              </td>
              <td className="px-4 py-2 border">{product.title}</td>
              <td className="px-4 py-2 border">{product.author}</td>
              <td className="px-4 py-2 border">${product.price.toFixed(2)}</td>
              <td className="px-4 py-2 border">{product.category}</td>
              <td className="px-4 py-2 border">{product.quantity}</td>
              <td className="px-4 py-2 border">
                <div className="flex items-center justify-center gap-2">
                  <Link to={`/dashboard/update-product/${product._id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">Update</Button>
                  </Link>

                  <Dialog open={confirmDialog === product._id} onOpenChange={() => setConfirmDialog(null)}>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        onClick={() => setConfirmDialog(product._id)}
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          Do you really want to delete this product? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2 mt-4">
                        {/* <Button variant="ghost" onClick={() => setConfirmDialog(null)}>Cancel</Button> */}
                        <Button variant="destructive" onClick={() => handleDelete(product._id)}>Delete</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
