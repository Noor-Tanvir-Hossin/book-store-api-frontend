import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "@/assets/images/B__1_-removebg-preview.png"; // Import your logo
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/features/hooks";
import { logout, useCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

export default function Navbar() {
  const user = useSelector(useCurrentUser);
  console.log(user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Logo */}
      <div className="flex relative ">
        <div className="">
          <img src={Logo} alt="Logo" className="w-20 h-20" />
        </div>
        <p className="text-4xl font-extrabold absolute left-20 top-2 ">
          Book<span className="text-[#FD6E0A]">Bridge</span>
        </p>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 transition-all ${
              isActive
                ? "text-[#FD6E0A]  text-xl font-bold"
                : "text-gray-700 text-xl"
            } hover:text-[#FD6E0A]`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-4 py-2 transition-all ${
              isActive
                ? "text-[#FD6E0A]  text-xl font-bold"
                : "text-gray-700 text-xl"
            } hover:text-[#FD6E0A]`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `px-4 py-2 transition-all ${
              isActive
                ? "text-[#FD6E0A]  text-xl font-bold"
                : "text-gray-700 text-xl"
            } hover:text-[#FD6E0A]`
          }
        >
          All Products
        </NavLink>
      </div>

      {/* Login / Sign Up Buttons */}
      <div className="hidden md:flex">
        {user ? (
          // 👉 User is logged in → show LogOut only
          <Button
            onClick={handleLogout}
            variant="personal1"
            className="transition-transform transform hover:scale-105"
          >
            Log Out
          </Button>
        ) : (
          // 👉 No user → show Login + Sign Up
          <div className="space-x-4">
            <Button
              variant="personal2"
              className="transition-transform transform hover:scale-105"
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              variant="personal1"
              className="transition-transform transform hover:scale-105"
            >
              <Link to="/signup">Sign UP</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-6">
              <NavLink to="/" className="text-gray-700 hover:text-blue-500">
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="text-gray-700 hover:text-blue-500"
              >
                About
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-[#FD6E0A] font-bold"
                      : "text-gray-700 hover:text-blue-500"
                  } hover:text-[#FD6E0A]`
                }
              >
                All Products
              </NavLink>
              <NavLink
                to="/contact"
                className="text-gray-700 hover:text-blue-500"
              >
                Contact
              </NavLink>
              <Button variant="outline" className="mt-4">
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="default">
                <Link to="/signup">Sign UP</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
