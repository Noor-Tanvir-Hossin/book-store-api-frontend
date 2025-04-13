import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import {
//   clearCart,
//   increaseQuantity,
//   decreaseQuantity,
//   removeItem,
// } from "../redux/features/cart/cartSlice";
// import { useAppSelector } from "../redux/hooks";
// import BSForm from "../component/form/BSForm";
// import BSInput from "../component/form/BSInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TMessage } from "../types";
import { MdDelete } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { PiPlus } from "react-icons/pi";
// import { useCreateOrderMutation } from "../redux/features/order/orderApi";
// import { useCurrentUser } from "../redux/features/auth/authSlice";
// import { useUserQuery } from "../redux/features/users/usersApi";
// import CardLoading from "../component/Loading/CardLoading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/redux/features/store";
import { useAppSelector } from "@/redux/features/hooks";
import BSForm from "@/component/form/Form";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "@/redux/features/cart/cartSlice";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useSingleUserByEmailQuery } from "@/redux/features/User/UserApi";
import { useCreateOrderMutation } from "@/redux/features/order/OrderApi";
import BSInput from "@/component/form/FormInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoddingPage from "./LoddingPage";

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(useCurrentUser);
  const { data: userData, isLoading: UserLoading } = useSingleUserByEmailQuery(
    user?.email,
    {
      skip: !user?.email,
    }
  );

  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const totalPrice = useAppSelector(
    (state: RootState) => state.cart.totalPrice
  );

  if (UserLoading) {
    return <LoddingPage />;
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
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

  return (
    <div className="max-w-screen-xl mx-auto mt-20 p-4">
      <Card className="mb-6">
        <CardContent className="py-6">
          <BSForm onSubmit={onSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle>Order Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={userData?.data?.name} readOnly />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={userData?.data?.email} readOnly  />
                  </div>
                  <div>
                    <BSInput label="Phone" type="text" fieldName="phone" />
                  </div>
                  <div>
                    <BSInput
                      label="Shipping Address"
                      type="text"
                      fieldName="address"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {cartItems.length > 0 ? (
                    <ScrollArea className="max-h-[300px]">
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div
                            key={item._id}
                            className="flex justify-between items-center gap-4 border-b pb-2"
                          >
                            <div className="w-1/2 truncate text-sm font-medium">
                              {item.title}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  dispatch(decreaseQuantity(item._id))
                                }
                                disabled={item.quantity <= 1}
                              >
                                <FiMinus />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  dispatch(increaseQuantity(item._id))
                                }
                              >
                                <PiPlus />
                              </Button>
                            </div>
                            <div className="text-right text-sm font-semibold">
                              ${item.price.toFixed(2)}
                            </div>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => dispatch(removeItem(item._id))}
                            >
                              <MdDelete />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <p>Your cart is empty</p>
                  )}
                  <div className="mt-4 text-lg font-bold">
                    Total: ${totalPrice.toFixed(2)}
                  </div>
                  <Button
                    type="submit"
                    className="mt-4 w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Placing Order..." : "Order Now"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </BSForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
