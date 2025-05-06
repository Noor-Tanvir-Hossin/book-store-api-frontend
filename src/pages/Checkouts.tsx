import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../redux/features/cart/cartSlice";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { TMessage } from "../types";
import { MdDelete } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { PiPlus } from "react-icons/pi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useSingleUserByEmailQuery} from "@/redux/features/User/UserApi";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import { useCreateOrderMutation } from "@/redux/features/order/OrderApi";
import CardLoading from "./CardLoadin";

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(useCurrentUser);

  
  const { data: userData, isLoading: UserLoading } = useSingleUserByEmailQuery(user?.email, {
    skip: !user?.email,
  });


  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  console.log(cartItems);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const totalPrice = useAppSelector(
    (state: RootState) => state.cart.totalPrice
  );

  const form = useForm();

  const onSubmit : SubmitHandler<FieldValues> = async (data: FieldValues) => {
    const orderPayload = {
      email: userData?.data?.email,
      name: userData?.data?.name,
      products: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      address: data.address,
      phone: data.phone,
    };

    try {
        console.log(cartItems);
        
      if (cartItems.length > 0) {
        const order = await createOrder(orderPayload);

        if (order?.data?.data) {
          setTimeout(() => {
            toast.success("Order placed successfully!");
            dispatch(clearCart());
            window.location.href = order?.data?.data;
          }, 1500);
        }
      } else {
        toast.error("Cart is empty, please add items to proceed.");
      }
    } catch (error: unknown) {
      toast.error((error as TMessage).data.message);
    }
  };

  if (UserLoading) return <CardLoading />;

  return (
    <div className="max-w-[1720px] mx-auto mt-20">
      <Card className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">Order Information</h2>
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={userData?.data?.name}
                    readOnly
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={userData?.data?.email}
                    readOnly
                    disabled
                    className="mt-1"
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter phone number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter shipping address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div className="w-[150px] truncate">{item.title}</div>
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          onClick={() => dispatch(decreaseQuantity(item._id))}
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          onClick={() => dispatch(increaseQuantity(item._id))}
                        >
                          <PiPlus />
                        </Button>
                      </div>
                      <div>${item.price.toFixed(2)}</div>
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => dispatch(removeItem(item._id))}
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  ))}
                  <div className="text-right font-semibold text-lg">
                    Total: ${totalPrice?.toFixed(2)}
                  </div>
                </div>
              ) : (
                <p>Your cart is empty</p>
              )}
              <Button
                className="mt-6 w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Ordering..." : "Order Now"}
              </Button>
            </Card>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CheckoutPage;
