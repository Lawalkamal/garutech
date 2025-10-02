import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Package, 
  CreditCard, 
  MapPin, 
  Settings,
  Eye,
  Calendar,
  CheckCircle
} from 'lucide-react';

const Account: React.FC = () => {
  // Get orders from localStorage (in a real app, this would come from an API)
  const orders = JSON.parse(localStorage.getItem('autoparts-orders') || '[]');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen ">
      {/* Header
      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="font-poppins font-bold text-3xl mb-2">My Account</h1>
              <p className="text-muted-foreground">Manage your profile and orders</p>
            </div>
          </div>
        </div>
      </section> */}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar
          <div className="lg:col-span-1">
            <Card className="">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  <a
                    href="#profile"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-primary/10 text-primary"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </a>
                  <a
                    href="#orders"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <Package className="h-4 w-4" />
                    <span>Orders</span>
                  </a>
                  <a
                    href="#payment"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Payment Methods</span>
                  </a>
                  <a
                    href="#addresses"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Addresses</span>
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div> */}

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Card */}
            <Card className="">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-2xl mb-2">Welcome back!</h2>
                    <p className="text-muted-foreground">
                      Manage your account and track your orders from this dashboard.
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="font-bold text-2xl text-primary">{orders.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="">
              <CardContent className="p-6 ">
                <div className="flex items-center justify-between mb-6 ">
                  <h2 className=" font-semibold text-xl">Recent Orders</h2>
                  <Button variant="outline" size="sm" className='bg-white'>
                    View All Orders
                  </Button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="bg-secondary/30 p-8 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Package className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">
                      When you place your first order, it will appear here.
                    </p>
                    <Button className="btn-racing">
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order: any) => (
                      <div key={order.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="bg-green-500/10 p-2 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                            <div>
                              <p className="font-semibold">Order #{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(order.orderDate)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">₦{order.total.toFixed(2)}</p>
                            <p className="text-sm text-green-500 capitalize">{order.status}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {order.items.slice(0, 3).map((item: any, index: number) => (
                              <div
                                key={index}
                                className="w-8 h-8 bg-secondary border-2 border-background rounded-full overflow-hidden"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="w-8 h-8 bg-secondary border-2 border-background rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium">
                                  +{order.items.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                          <Button variant="outline" size="sm"  className='bg-white'>
                            <Eye className="h-3 w-3 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Update Profile</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Keep your account information current
                  </p>
                  <Button variant="outline" size="sm"  className='bg-white'>
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="">
                <CardContent className="p-6 text-center">
                  <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Manage Addresses</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Add or update shipping addresses
                  </p>
                  <Button variant="outline" size="sm"  className='bg-white'>
                    Manage
                  </Button>
                </CardContent>
              </Card>

              <Card className="">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Payment Methods</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Manage your payment options
                  </p>
                  <Button variant="outline" size="sm"  className='bg-white'>
                    Add Card
                  </Button>
                </CardContent>
              </Card>
            </div> */}

            {/* Account Information */}
            {/* <Card className="">
              <CardContent className="p-6">
                <h2 className="font-semibold text-xl mb-6">Account Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Personal Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Name:</span> John Doe</p>
                      <p><span className="text-muted-foreground">Email:</span> john.doe@example.com</p>
                      <p><span className="text-muted-foreground">Phone:</span> +1 (555) 123-4567</p>
                      <p><span className="text-muted-foreground">Member since:</span> January 2024</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Preferences</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Newsletter:</span> Subscribed</p>
                      <p><span className="text-muted-foreground">Order notifications:</span> Email & SMS</p>
                      <p><span className="text-muted-foreground">Language:</span> English</p>
                      <p><span className="text-muted-foreground">Currency:</span> USD</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <Button className="btn-racing">
                    Edit Information
                  </Button>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;