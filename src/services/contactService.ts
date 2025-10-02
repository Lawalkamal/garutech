// src/services/contactService.ts
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactMessage extends ContactFormData {
  id?: string;
  createdAt: Date;
  status: 'new' | 'read' | 'replied';
}

export const contactService = {
  // Submit contact form
  async submitContactForm(formData: ContactFormData): Promise<string> {
    try {
      const contactMessage: Omit<ContactMessage, 'id'> = {
        ...formData,
        createdAt: new Date(),
        status: 'new'
      };

      const docRef = await addDoc(collection(db, 'contacts'), {
        ...contactMessage,
        createdAt: Timestamp.fromDate(contactMessage.createdAt)
      });

      // Here you can add email notification logic
      // For now, we'll just console.log
      console.log('New contact message received:', formData);
      
      // You can integrate with EmailJS or similar service here
      await this.sendEmailNotification(formData);

      return docRef.id;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  // Send email notification (you can integrate with EmailJS, Nodemailer, etc.)
  async sendEmailNotification(formData: ContactFormData): Promise<void> {
    try {
      // Example with EmailJS (you'll need to set this up)
      // Replace with your EmailJS service, template, and user IDs
      
      const emailData = {
        to_email: 'admin@vroom-commerce.com', // Your admin email
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        phone: formData.phone || 'Not provided'
      };

      // Uncomment and configure when you set up EmailJS
      /*
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID', 
        emailData,
        'YOUR_PUBLIC_KEY'
      );
      */

      console.log('Email notification sent:', emailData);
    } catch (error) {
      console.error('Failed to send email notification:', error);
      // Don't throw here - we don't want contact form to fail if email fails
    }
  }
};

