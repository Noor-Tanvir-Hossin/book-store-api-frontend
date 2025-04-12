import { toast } from "sonner";
import { TMessage } from "../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useUpdateUserRoleMutation, useUpdateUserStatusMutation, useUsersQuery } from "@/redux/features/User/UserApi";
import TableLoading from "../TableLoading";

type TypeUser = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isActive: boolean;
  createdAt: string;
  updatedAt:string
};


const UserManagement: React.FC = () => {
  const { data, isLoading, refetch } = useUsersQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();
  console.log(data);
  

  if (isLoading) return <TableLoading />;

  const handleStatusChange = async (userId: string, isActive: boolean) => {
    try {
      await updateUserStatus({ userId, isActive });
      toast.success("User status updated");
      refetch();
    } catch (error) {
      toast.error((error as TMessage).data.message);
    }
  };

  const handleRoleChange = async (userId: string, role: "admin" | "user") => {
    try {
      await updateUserRole({ userId, role });
      toast.success("User role updated");
      refetch();
    } catch (error) {
      toast.error((error as TMessage).data.message);
    }
  };

  return (
    <div className="overflow-x-auto w-full p-4">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Created At</th>
            <th className="border px-4 py-2 text-left">Updated At</th>
            <th className="border px-4 py-2 text-left">Role</th>
            <th className="border px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((user:TypeUser) => (
            <tr key={user._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                {new Date(user.createdAt).toLocaleDateString("en-GB")}
              </td>
              <td className="px-4 py-2">
                {new Date(user.updatedAt).toLocaleDateString("en-GB")}
              </td>
              <td className="px-4 py-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {user.role}
                      <ArrowDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => handleRoleChange(user._id, "admin")}>Admin</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleChange(user._id, "user")}>User</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
              <td className="px-4 py-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {user.isActive ? "Active" : "Inactive"}
                      <ArrowDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => handleStatusChange(user._id, true)}>Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(user._id, false)}>Inactive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
