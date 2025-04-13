import { baseApi } from "@/redux/api/baseapi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    singleUser: builder.query({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),
    singleUserByEmail: builder.query({
      query: ( email ) => ({
        url: `/users/email/${email}`,
        method: "GET",
      }),
    }),

    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
    }),
    updateUserStatus: builder.mutation({
      query: ({ userId, isActive }) => ({
        url: `/users/${userId}/status`,
        method: "PATCH",
        body: { isActive },
      }),
    }),
  }),
});

export const {
  useUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
  useSingleUserQuery,
  useSingleUserByEmailQuery
} = authApi;
export default authApi;
