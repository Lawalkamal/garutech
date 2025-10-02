import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { categories } from "@/data/products";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  Wrench,
  LogOut,
  Settings,
  Shield,
} from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, userProfile, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <p className="text-1xl md:text-1xl text-black bg-yell mb-8 mx-auto text-center">
        Chat us on Whatsapp
      </p>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-lift">
            <img
              src="src\assets\logo.png"
              alt="AutoParts Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-accent">
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger
                className="text-sm font-medium text-black transition-colors hover:text-primary"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                Categories
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id}>
                    <Link to={`/shop?category=${category.id}`}>
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActiveLink(item.href)
                    ? "text-primary border-b-2 border-primary"
                    : "text-black"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search auto parts..."
                className="w-full pl-10 pr-4 py-2  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Mobile */}
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* User Account - Desktop */}
            <div className="hidden sm:block">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <User className="h-5 w-5" />
                      <span className="hidden lg:block text-sm">
                        {userProfile?.displayName ||
                          user.displayName ||
                          "Account"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link
                        to="/account"
                        className="flex items-center space-x-2"
                      >
                        <User className="h-4 w-4" />
                        <span>My Account</span>
                      </Link>
                    </DropdownMenuItem>

                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link
                            to="/admin"
                            className="flex items-center space-x-2 text-primary"
                          >
                            <Shield className="h-4 w-4" />
                            <span>Admin Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-destructive cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="btn-racing">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative hover-glow-red"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search auto parts..."
                    className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="block px-3 py-2 text-base font-medium rounded-md transition-colors">
                  Categories
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.id}>
                      <Link
                        to={`/shop?category=${category.id}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Navigation */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActiveLink(item.href)
                      ? "text-primary"
                      : "text-black hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile User Account */}
              {user ? (
                <>
                  <Link
                    to="/account"
                    className="block px-3 py-2 text-base font-medium text-black hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 text-base font-medium text-primary hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-destructive hover:text-destructive"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-2 text-base font-medium text-black hover:text-primary border border-border rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center px-4 py-2 text-base font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
