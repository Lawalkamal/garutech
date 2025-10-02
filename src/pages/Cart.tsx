import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag,
  ArrowLeft,
  Truck,
  Shield
} from 'lucide-react';

const Cart: React.FC = () => {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white p-8 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h1 className="font-poppins font-bold text-3xl mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any auto parts to your cart yet. 
            Start shopping to find the perfect parts for your vehicle.
          </p>
          <Link to="/shop">
            <Button className="btn-racing text-lg px-8 py-4 h-auto">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const shippingCost = 0;
  const tax = 0;
  const finalTotal = total ;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-poppins font-bold text-3xl mb-2">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className=" mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-xl">Cart Items</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="text-destructive bg-white hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2 " />
                    Clear Cart
                  </Button>
                </div>

                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-border last:border-b-0 last:pb-0">
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/product/${item.id}`}
                          className="font-semibold text-lg hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mb-2">{item.brand}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded-r-none h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 py-1 border-x border-border min-w-[50px] text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded-l-none h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-bold text-lg text-primary">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ₦{item.price.toLocaleString()} each
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive h-8 w-8 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Continue Shopping - Mobile */}
            <div className="md:hidden mb-6">
              <Link to="/shop" className="flex items-center text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className=" sticky top-24">
              <CardContent className="p-6">
                <h2 className="font-semibold text-xl mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                  
                  {/* <div className="flex justify-between">
                    <span className="flex items-center">
                      Shipping
                      {total >= 50 && (
                        <span className="text-green-500 text-xs ml-2">(Free)</span>
                      )}
                    </span>
                    <span>
                      {shippingCost === 0 ? 'Free' : `₦${shippingCost.toFixed(2)}`}
                    </span>
                  </div> */}
                  
                  {/* <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₦{tax.toLocaleString()}</span>
                  </div> */}
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">₦{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout" className="block mb-4">
                  <Button className="btn-racing w-full text-lg py-3 h-auto">
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Free Shipping Notice */}
                {/* {total < 50 && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <Truck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Free Shipping Available</p>
                        <p className="text-xs text-muted-foreground">
                          Add ₦{(50 - total).toFixed(2)} more to qualify for free shipping
                        </p>
                      </div>
                    </div>
                  </div>
                )} */}

                {/* Trust Indicators */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">Chat with us on Whatsapp</span>
                  </div>
                  {/* <div className="flex items-center space-x-3">
                    <Truck className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span className="text-muted-foreground">Fast delivery within 3-5 business days</span>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;