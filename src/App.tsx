// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./contexts/CartContext";
// import { AuthProvider } from "./contexts/AuthContext";
// import Header from "./components/layout/Header";
// import Footer from "./components/layout/Footer";
// import Index from "./pages/Index";
// import Shop from "./pages/Shop";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Account from "./pages/Account";
// import NotFound from "./pages/NotFound";
// import LoginForm from "./components/auth/LoginForm";
// import SignupForm from "./components/auth/SignupForm";
// import AdminDashboard from "./components/admin/AdminDashboard";
// import ProtectedRoute from "./components/auth/ProtectedRoute";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <AuthProvider>
//       <CartProvider>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//             <div className="min-h-screen flex flex-col bg-white text-gray-800">
//               <Header />
//               <main className="flex-1">
//                 <Routes>
//                   <Route path="/" element={<Index />} />
//                   <Route path="/shop" element={<Shop />} />
//                   <Route path="/product/:id" element={<ProductDetail />} />
//                   <Route path="/cart" element={<Cart />} />
//                   <Route path="/checkout" element={<Checkout />} />
//                   <Route path="/about" element={<About />} />
//                   <Route path="/contact" element={<Contact />} />
//                   <Route path="/account" element={<Account />} />
//                   <Route path="/login" element={<LoginForm />} />
//                   <Route path="/signup" element={<SignupForm />} />
//                   <Route 
//                     path="/admin" 
//                     element={
//                       <ProtectedRoute requireAdmin>
//                         <AdminDashboard />
//                       </ProtectedRoute>
//                     } 
//                   />
//                   {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//                   <Route path="*" element={<NotFound />} />
//                 </Routes>
//               </main>
//               <Footer />
//             </div>
//           </BrowserRouter>
//         </TooltipProvider>
//       </CartProvider>
//     </AuthProvider>
//   </QueryClientProvider>
// );

// export default App;

import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import Preloader from "./components/ui/Preloader";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ScrollToTop from './components/ScrollToTop';

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Simulate additional loading time for resources
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show preloader while loading
  if (isLoading || !isAppReady) {
    return <Preloader onLoadingComplete={handleLoadingComplete}/>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen flex flex-col bg-white text-gray-800">
                  <Header />
                  <ScrollToTop />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/login" element={<LoginForm />} />
                      <Route path="/signup" element={<SignupForm />} />
                      <Route 
                        path="/admin" 
                        element={
                          <ProtectedRoute requireAdmin>
                            <AdminDashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;