
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useGetSingleOrderQuery, useVerifyOrderQuery } from "@/redux/features/order/OrderApi";
import CardLoading from "./CardLoadin";

type TProduct = {
  _id: string;
  product: {
    title: string;
  };
  quantity: number;
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const OrderVerificationPage = () => {
  const query = useQuery();
  const order_id = query.get("order_id");

  const { data, error, isLoading } = useVerifyOrderQuery(order_id);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (data?.data?.[0]?.customer_order_id) {
      setOrderId(data.data[0].customer_order_id);
    }
  }, [data]);

  const {
    data: order_Data,
    error: orderError,
    isLoading: orderIsLoading,
  } = useGetSingleOrderQuery(orderId, { skip: !orderId });

  if (isLoading || orderIsLoading) {
    return <CardLoading />;
  }
  if (error || orderError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error fetching order data
      </div>
    );
  }

  const orderData = order_Data?.data;

  return (
    <div className="max-w-screen-xl mx-auto my-20 px-4">
      <Card className="p-6 shadow-md rounded-xl">
        <h2 className="text-2xl font-semibold mb-6">Order Details</h2>
        <div className="space-y-4">
          <InfoRow label="Order ID" value={orderData?._id} />
          <InfoRow label="Email" value={orderData?.email} />
          <InfoRow
            label="Status"
            value={<Badge variant="outline">{orderData?.status}</Badge>}
          />
          <InfoRow
            label="Payment Method"
            value={orderData?.transaction?.method}
          />
          <InfoRow
            label="Transaction Date"
            value={orderData?.transaction?.date_time}
          />
          <InfoRow label="SP Code" value={orderData?.transaction?.sp_code} />
          <InfoRow
            label="SP Message"
            value={orderData?.transaction?.sp_message}
          />
          <InfoRow label="Phone" value={orderData?.phone} />
          <InfoRow label="Address" value={orderData?.address} />
          <div>
            <p className="font-medium">Items:</p>
            <div className="pl-4 space-y-2 mt-1">
              {orderData?.products?.length > 0 ? (
                orderData.products.map((product: TProduct) => (
                  <div key={product._id} className="text-gray-700">
                    {product?.product?.title || "N/A"} - Quantity:{" "}
                    {product?.quantity || "N/A"}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items found</p>
              )}
            </div>
          </div>
          <InfoRow
            label="Total Price"
            value={`$${orderData?.totalPrice || "0"}`}
          />
        </div>
        <Separator className="my-6" />
        <Link to="/dashboard/order-history">
          <Button className="w-full">View All Orders</Button>
        </Link>
      </Card>
    </div>
  );
};

export default OrderVerificationPage;

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
    <span className="font-medium text-gray-900">{label}:</span>
    <span className="text-gray-700">{value || "N/A"}</span>
  </div>
);
