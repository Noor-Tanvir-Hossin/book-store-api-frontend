import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "@/assets/logo.png"; // Import your logo

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-bold">MyBrand</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 transition-all ${
              isActive ? "text-blue-600 font-bold" : "text-gray-700"
            } hover:text-blue-500`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-4 py-2 transition-all ${
              isActive ? "text-blue-600 font-bold" : "text-gray-700"
            } hover:text-blue-500`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `px-4 py-2 transition-all ${
              isActive ? "text-blue-600 font-bold" : "text-gray-700"
            } hover:text-blue-500`
          }
        >
          Services
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `px-4 py-2 transition-all ${
              isActive ? "text-blue-600 font-bold" : "text-gray-700"
            } hover:text-blue-500`
          }
        >
          Contact
        </NavLink>
      </div>

      {/* Login / Sign Up Buttons */}
      <div className="hidden md:flex space-x-4">
        <Button
          variant="outline"
          className="transition-transform transform hover:scale-105 hover:bg-gray-100"
        >
          Login
        </Button>
        <Button
          variant="default"
          className="transition-transform transform hover:scale-105 hover:bg-blue-600"
        >
          Sign Up
        </Button>
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
              <NavLink to="/about" className="text-gray-700 hover:text-blue-500">
                About
              </NavLink>
              <NavLink to="/services" className="text-gray-700 hover:text-blue-500">
                Services
              </NavLink>
              <NavLink to="/contact" className="text-gray-700 hover:text-blue-500">
                Contact
              </NavLink>
              <Button variant="outline" className="mt-4">Login</Button>
              <Button variant="default">Sign Up</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
