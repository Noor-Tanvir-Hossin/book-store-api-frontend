import { baseApi } from "@/redux/api/baseapi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/orders",
        method: "POST",
        body: userInfo,
      }),
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    getSingleOrder: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
    }),
    getOrdersByEmail: builder.query({
      query: (email) => ({
        url: `/orders/email/${email}`,
        method: "GET",
      }),
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include token for auth
        },
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        body: { status },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyOrderQuery,
  useGetSingleOrderQuery, 
  useGetOrdersByEmailQuery,
  useGetOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} = orderApi;
