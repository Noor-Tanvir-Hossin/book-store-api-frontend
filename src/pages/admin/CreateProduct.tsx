import { useForm, Controller, SubmitHandler, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import { toast } from "sonner";
import { TMessage } from "../../types";
import { useCreateProductMutation } from "@/redux/features/ProductsApi/ProductsApi";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { control, handleSubmit, reset } = useForm();
  const [createProduct] = useCreateProductMutation();
  const [imageUrl, setImageUrl] = useState("");
  const navigate= useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!imageUrl) {
      toast.error("Please provide an image URL before submitting.");
      return;
    }

    try {
      const productData = {
        ...data,
        image: imageUrl,
        price: Number(data.price),
        quantity: Number(data.quantity),
        inStock: Number(data.quantity) > 0,
      };
      console.log(productData)
      const response = await createProduct(productData).unwrap();
      toast.success(response.message);
      reset();
      setImageUrl("");
      navigate('/dashboard/product-management')
    } catch (error) {
      toast.error((error as TMessage).data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
      <Card className="w-full max-w-3xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter title" />
                )}
              />
            </div>
            <div>
              <Label>Author</Label>
              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter author" />
                )}
              />
            </div>
            <div>
              <Label>Price</Label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input type="number" {...field} placeholder="Enter price" />
                )}
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter quantity"
                  />
                )}
              />
            </div>
            <div>
              <Label>In Stock</Label>
              <Controller
                name="inStock"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="true/false" />
                )}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fiction">Fiction</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="SelfDevelopment">
                        Self Development
                      </SelectItem>
                      <SelectItem value="Poetry">Poetry</SelectItem>
                      <SelectItem value="Religious">Religious</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea rows={4} {...field} placeholder="Enter description" />
              )}
            />
          </div>

          <div>
            <Label>Image URL</Label>
            <Input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL"
            />
          </div>

          <Button type="submit" className="w-full">
            Create Product
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateProduct;
