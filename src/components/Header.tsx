"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Home,
  ShoppingCart,
  Package,
  User,
  LogOut,
  LogIn,
  Store,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { getAuthToken, getUserType, logout } from "@/lib/apiUtils";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
    setUserType(getUserType());
  }, []);

  const customerMenu = [
    { name: "Home", href: "/", icon: Home },
    { name: "Cart", href: "/cart", icon: ShoppingCart },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const merchantMenu = [
    { name: "Dashboard", href: "/merchant", icon: Store },
    { name: "Products", href: "/merchant/products", icon: Package },
    { name: "Payments", href: "/merchant/payments", icon: ShoppingCart },
  ];

  const adminMenu = [
    { name: "Admin Panel", href: "/admin", icon: Shield },
    { name: "Users", href: "/admin/users", icon: User },
  ];

  const menu =
    userType === "merchant"
      ? merchantMenu
      : userType === "admin"
      ? adminMenu
      : customerMenu;

  return (
    <header className="bg-secondary text-foreground border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold text-foreground hover:text-muted-foreground flex items-center gap-2"
        >
          DuDu
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-1 text-foreground hover:text-muted-foreground"
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                setIsLoggedIn(false);
              }}
              className="flex items-center gap-1 text-foreground hover:text-muted-foreground"
            >
              <LogOut size={20} />
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 text-foreground hover:text-muted-foreground"
            >
              <LogIn size={20} />
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-secondary border-t px-4 pb-4 animate-slideDown">
          <nav className="flex flex-col gap-4 mt-2">
            {menu.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-foreground hover:text-muted-foreground"
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  setIsLoggedIn(false);
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 text-left text-foreground hover:text-muted-foreground"
              >
                <LogOut size={20} />
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-foreground hover:text-muted-foreground"
              >
                <LogIn size={20} />
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
