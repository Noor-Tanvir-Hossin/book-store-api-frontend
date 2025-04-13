import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { TMessage } from "../../types";

// Zod schema
const formSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmNewPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap();

      toast.success("Password updated successfully");
      navigate("/login");
    } catch (error) {
      toast.error((error as TMessage).data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[85vh] px-4">
      <Card className="w-full max-w-md shadow-md border rounded-xl">
        <CardContent className="py-8">
          <h2 className="text-2xl font-semibold text-center text-primary mb-6">
            Update Password
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Old Password */}
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm New Password */}
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button variant="personal1" type="submit" className="w-full">
                Update Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePassword;
