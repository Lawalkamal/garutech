import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  Send,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store contact form data in localStorage (in a real app, this would be sent to a backend)
    const contactSubmission = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
    };

    const existingSubmissions = JSON.parse(localStorage.getItem('contact-submissions') || '[]');
    localStorage.setItem('contact-submissions', JSON.stringify([...existingSubmissions, contactSubmission]));

    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });

    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours."
    });
  };

  const faqs = [
    {
      question: 'What are your shipping options?',
      answer: 'We offer free standard shipping on orders over $50. Expedited shipping options are available including overnight and 2-day delivery. All orders are processed same-day when placed before 3 PM EST.'
    },
    {
      question: 'Do you offer warranties on your parts?',
      answer: 'Yes, all our parts come with comprehensive warranties ranging from 1-3 years depending on the product. We also offer extended warranty options for additional peace of mind.'
    },
    {
      question: 'Can you help me find the right part for my vehicle?',
      answer: 'Absolutely! Our team of automotive experts can help you identify the correct parts for your specific vehicle. Contact us with your VIN number or vehicle details for personalized assistance.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on most items. Parts must be in original packaging and unused condition. Return shipping is free for defective items, and we provide prepaid return labels for your convenience.'
    },
    {
      question: 'Do you sell to commercial customers?',
      answer: 'Yes, we offer special pricing and terms for auto shops, dealerships, and fleet managers. Contact our commercial sales team for volume discounts and credit account options.'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className=" py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-poppins font-bold text-5xl mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about our products or need expert advice? 
              Our automotive specialists are here to help you find the perfect parts for your vehicle.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Contact Cards */}
              <Card className="">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Phone Support</h3>
                      <p className="text-muted-foreground">Speak with our experts</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Sales:</strong> +234 802 319 0606</p>
                    <p><strong>Technical:</strong> +234 802 319 0606</p>
                    <p><strong>Customer Service:</strong> +234 802 319 0606</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email Support</h3>
                      <p className="text-muted-foreground">24/7 email assistance</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>General:</strong> info@garutech.com</p>
                    <p><strong>Sales:</strong> sales@garutech.com</p>
                    <p><strong>Support:</strong> support@garutech.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Visit Us</h3>
                      <p className="text-muted-foreground">Head Office</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>20 Akinremi Street<br />
                       Anifowose, Ikeja, Lagos.<br />
                       Nigeria</p>

                       

                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Business Hours</h3>
                      <p className="text-muted-foreground">When we're available</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Emergency support available 24/7 for commercial customers
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <Card className="">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-2xl">Send Us a Message</h2>
                    <p className="text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Your full name"
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
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="order-status">Order Status</option>
                      <option value="return-exchange">Return/Exchange</option>
                      <option value="wholesale-inquiry">Wholesale Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-racing w-full md:w-auto px-8 py-3 h-auto"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map */}
            {/* <Card className="">
              <CardContent className="p-0">
                <div className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive map would be embedded here</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      123 Auto Street, Mechanic City, MC 12345
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Quick answers to common questions about our products and services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="">
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary/30 transition-colors"
                  >
                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;