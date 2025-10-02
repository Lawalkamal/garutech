// src/components/ContactForm.tsx - Enhanced version
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { contactService, ContactFormData } from '@/services/contactService';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await contactService.submitContactForm(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Message Sent Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <Button onClick={() => setSuccess(false)} className="btn-racing">
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Contact Us</CardTitle>
          <p className="text-muted-foreground">
            Get in touch with us for any questions about our automotive parts.
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/15 text-destructive p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Phone className="inline h-4 w-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <MessageSquare className="inline h-4 w-4 mr-2" />
                  Subject *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Order Support">Order Support</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Returns & Exchanges">Returns & Exchanges</option>
                  <option value="General Question">General Question</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background"
                placeholder="Please provide as much detail as possible..."
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full btn-racing"
              size="lg"
            >
              <Send className="h-4 w-4 mr-2" />
              {loading ? 'Sending Message...' : 'Send Message'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;