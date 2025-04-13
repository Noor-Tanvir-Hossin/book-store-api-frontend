import { useForm, Controller, SubmitHandler, FieldValues } from "react-hook-form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CardLoading from "../CardLoadin";
import { TMessage } from "../../types";
import { useGetProductQuery, useUpdateProductMutation } from "@/redux/features/ProductsApi/ProductsApi";

const UpdateProduct = () => {
  const { id } = useParams();
  console.log(id);
  
  const { data: product, isLoading } = useGetProductQuery(id);
  console.log(product);
  
  const [updateProduct] = useUpdateProductMutation();

  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      price: 0,
      quantity: 0,
      inStock: "No",
      category: "",
      description: "",
      image: "",
    },
  });

  useEffect(() => {
    if (product) {
      const p = product.data;
      form.reset({
        title: p.title,
        author: p.author,
        price: p.price,
        quantity: p.quantity,
        inStock: p.inStock ? "Yes" : "No",
        category: p.category,
        description: p.description,
        image: p.image,
      });
    }
  }, [product]);

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    if (!data.image) {
      toast.error("Please provide an image URL before submitting.");
      return;
    }

    try {
      const productData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        inStock: data.quantity > 0,
      };

      const response = await updateProduct({ id, data: productData }).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error((error as TMessage).data.message);
    }
  };

  if (isLoading) return <CardLoading />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-3xl p-6 shadow-md bg-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Update Product</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" placeholder="Enter image URL" {...form.register("image")} />
            {form.watch("image") && (
              <img
                src={form.watch("image")}
                alt="Preview"
                className="mt-2 w-full max-h-60 object-cover rounded-md border"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...form.register("title")} />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" {...form.register("author")} />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" {...form.register("price")} />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" {...form.register("quantity")} />
            </div>
            <div>
              <Label htmlFor="inStock">In Stock</Label>
              <Input id="inStock" {...form.register("inStock")} />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Controller
                control={form.control}
                name="category"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fiction">Fiction</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="SelfDevelopment">Self Development</SelectItem>
                      <SelectItem value="Poetry">Poetry</SelectItem>
                      <SelectItem value="Religious">Religious</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={4} {...form.register("description")} />
          </div>

          <Button type="submit" className="w-full">
            Update Product
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UpdateProduct;
