import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext'; // ✅ Added missing import
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Lock, 
  X, 
  MessageCircle, 
  User, 
  MapPin 
} from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const Checkout: React.FC = () => {
  const { items, total, itemCount, clearCart } = useCart(); // ✅ Using your cart context
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="font-poppins font-bold text-3xl mb-4">No Items to Checkout</h1>
          <p className="text-muted-foreground mb-8">
            Your cart is empty. Add some auto parts to proceed with checkout.
          </p>
          <Link to="/shop">
            <Button className="btn-racing">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const finalTotal = total;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateWhatsAppMessage = () => {
    let message = `🛒 *New Order from Garutech*\n\n`;
    
    // Customer Information
    message += `👤 *Customer Information:*\n`;
    message += `Name: ${formData.firstName} ${formData.lastName}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Phone: ${formData.phone || 'Not provided'}\n\n`;
    
    // Shipping Address
    message += `📍 *Shipping Address:*\n`;
    message += `${formData.address}\n`;
    message += `${formData.city}, ${formData.state} ${formData.zipCode}\n\n`;
    
    // Order Items
    message += `📦 *Order Items:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Brand: ${item.brand || 'N/A'}\n`; // ✅ Added fallback for brand
      message += `   Qty: ${item.quantity} × ₦${item.price.toLocaleString()} = ₦${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    
    // Order Summary
    message += `💰 *Order Summary:*\n`;
    message += `Subtotal (${itemCount} items): ₦${total.toLocaleString()}\n`;
    message += `*Total: ₦${finalTotal.toLocaleString()}*\n\n`;
    message += `Please confirm this order and provide payment instructions. Thank you! 🙏`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppRedirect = () => {
    // Replace with your actual WhatsApp business number (without + sign)
    const phoneNumber = "+2348023190606"; // ✅ Update this with your number
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    setShowWhatsAppModal(false);

    // Show success toast
    toast({
      title: "Redirecting to WhatsApp",
      description: "Complete your order through WhatsApp chat with our team."
    });
  };

  const validateAndShowModal = () => {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      toast({
        title: "Please fill in all required fields",
        description: "Complete the customer information and shipping address to continue.",
        variant: "destructive"
      });
      return;
    }

    // Show WhatsApp modal
    setShowWhatsAppModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="flex items-center text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
            <div className="h-4 w-px bg-border"></div>
            <h1 className="font-poppins font-bold text-2xl">Secure Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <Card className="">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-semibold text-xl">Customer Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="font-semibold text-xl">Shipping Address</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Street Address *</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className=" sticky top-24">
              <CardContent className="p-6">
                <h2 className="font-semibold text-xl mb-6">Order Summary</h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">₦{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={validateAndShowModal}
                  className="btn-racing w-full text-lg py-3 h-auto"
                >
                  Place Order - ₦{finalTotal.toLocaleString()}
                </Button>

               <div className="flex items-center justify-center mt-4 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3 mr-1" />
                  Our Payment system is not available for now
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowWhatsAppModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-red-500" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Payment System Unavailable
              </h3>
              
              <p className="text-gray-600 mb-6">
                Oops! Our payment system is not working for now. Chat us on WhatsApp to complete your order.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowWhatsAppModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWhatsAppRedirect}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 transition-colors font-medium"
                >
                  <MessageCircle size={16} />
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;