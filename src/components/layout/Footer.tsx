import React from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { categories } from "@/data/products";

const Footer: React.FC = () => {
  return (
    <footer className="bg-automotive-darker text-gray-700 py-8 mt-12 ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2 hover-lift">
                <img
                  src="src\assets\logo.png"
                  alt="AutoParts Logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for premium automotive parts and equipment.
              Quality products, expert service, and fast delivery nationwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-poppins font-semibold text-lg text-foreground">
              Quick Links
            </h4>
            <nav className="space-y-2">
              <Link
                to="/shop"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Shop All Parts
              </Link>
              <Link
                to="/about"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Contact
              </Link>
              <Link
                to="/account"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                My Account
              </Link>
              <a
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Track Order
              </a>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-poppins font-semibold text-lg text-foreground">
              Categories
            </h4>
            <nav className="space-y-2">
              <Link
                to={`/shop?categories.bodyparts}`}
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Body Equipment
              </Link>
              <a
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Diagnostic Tools
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Garage Tools
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Diagnostic Scanners
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Lube Bay
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Our Brand
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-poppins font-semibold text-lg text-foreground">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+234 802 319 0606</span>

              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  garutech@gmail.com
                </span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  20 Akinremi Street
                  <br />
                  Anifowose, Ikeja, Lagos.
                </span>
              </div>
            </div>

            {/* Business Hours */}
            <div className="pt-2">
              <h5 className="font-medium text-foreground text-sm mb-2">
                Business Hours
              </h5>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Mon - Fri: 8:00 AM - 6:00 PM</div>
                <div>Sat: 9:00 AM - 4:00 PM</div>
                <div>Sun: Closed</div>
              </div>
            </div>
          </div>
        </div>
{/* 
        Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground text-center">
              © 2025 Garu Technologies Nig Ltd. All rights reserved.
            </p>
            {/* <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Shipping Info
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Returns
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
