import { NavLink, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {  FaBoxOpen } from "react-icons/fa";
import Logo from "@/assets/images/B__1_-removebg-preview.png";
import { GiBookshelf } from "react-icons/gi";
import { BiSolidBookAdd } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { logout } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/features/hooks";
import { TYUser } from "@/types";

const Sidebar = ({ user }: { user: TYUser }) => {
  const dispatch = useAppDispatch();
  //   const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/sign-in");
  };

  const menuItems =
    user?.role === "admin"
      ? [
          {
            key: "user-management",
            icon: <FaUser />,
            label: "User Management",
            path: "user-management",
          },
          {
            key: "order-management",
            icon: <FaBoxOpen />,
            label: "Order Management",
            path: "order-management",
          },
          {
            key: "create-product",
            icon: <BiSolidBookAdd />,
            label: "Create Product",
            path: "create-product",
          },
          {
            key: "product-management",
            icon: <GiBookshelf />,
            label: "Product Management",
            path: "product-management",
          },
          { key: "Home", icon: <IoMdHome />, label: "Home", path: "/" },
        ]
      : [
          {
            key: "order-history",
            icon: <FaBoxOpen />,
            label: "Order History",
            path: "order-history",
          },
          {
            key: "update-password",
            icon: <IoMdSettings />,
            label: "Update Password",
            path: "update-password",
          },
          { key: "Home", icon: <IoMdHome />, label: "Home", path: "/" },
        ];

  return (
    <div className="flex">
      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Button variant="outline" size="icon" className="m-2">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] p-4">
            <SidebarMenu items={menuItems} onLogout={handleLogout} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col bg-white min-h-screen border-r transition-all duration-300 ${
          collapsed ? "w-[80px]" : "w-[250px]"
        }`}
      >
        <div className="flex items-center justify-between p-2">
          {/* <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <FaBook />
            {!collapsed && <span>Bookstore</span>}
          </Link> */}
          <div className="flex items-center relative ">
            <div className="">
              <img src={Logo} alt="Logo" className="w-14 h-14" />
            </div>
            <p className="text-xl md:text-2xl lg:text-2xl font-extrabold md:absolute left-11 top-2 ">
              Book<span className="text-[#FD6E0A]">Bridge</span>
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            <MenuIcon className="w-5 h-5" />
          </Button>
        </div>

        <SidebarMenu
          items={menuItems}
          onLogout={handleLogout}
          collapsed={collapsed}
        />
      </div>
    </div>
  );
};

const SidebarMenu = ({
  items,
  onLogout,
  collapsed = false,
}: {
  items: { key: string; icon: JSX.Element; label: string; path: string }[];
  onLogout: () => void;
  collapsed?: boolean;
}) => {
  //   const location = useLocation();

  return (
    <div className="flex flex-col justify-between h-full">
      <nav className="flex flex-col gap-2 px-2">
        {items.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition ${
                isActive ? "bg-gray-200 font-semibold" : ""
              }`
            }
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="p-2 border-t mt-4">
        <Button onClick={onLogout} variant="personal1" className="w-full">
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
