import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ type: 'error', message: 'Please fill out all required fields.' });
      return;
    }

    setLoading(true);
    setFormStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setFormStatus({ type: 'success', message: data.message || 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus({ type: 'error', message: data.message || 'Something went wrong.' });
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Network error, please try again.' });
    }

    setLoading(false);

    // Clear message after 5 seconds
    setTimeout(() => {
      setFormStatus({ type: null, message: '' });
    }, 5000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#3c2a21] to-[#1a120b] text-amber-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-dancing bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-500 mb-4">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl text-amber-100/80 max-w-3xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Reach out through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-amber-900/20 rounded-xl p-8 border border-amber-800/30 shadow-lg">
              <h2 className="text-2xl font-bold text-amber-300 mb-6">Send Us a Message</h2>

              {formStatus.type && (
                <div className={`p-4 mb-6 rounded-md ${formStatus.type === 'success' ? 'bg-green-600/20 text-green-300' : 'bg-red-600/20 text-red-300'}`}>
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Your Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Cloud Kitchen"
                    required
                    disabled={loading}
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="info@example.com"
                    required
                    disabled={loading}
                  />
                </div>
                <Input
                  label="Subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  disabled={loading}
                />
                <div className="w-full">
                  <label className="block text-sm font-medium text-amber-200 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 bg-amber-900/30 text-amber-100 placeholder-amber-400/70 border border-amber-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    placeholder="Please describe your inquiry in detail..."
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" variant="primary" icon={Send} fullWidth disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-800/30 hover:border-amber-600/50 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full inline-flex mt-1">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-amber-300 mb-2">Phone</h3>
                      <p className="text-amber-100/80 text-sm mb-1">+91 9478255685</p>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-800/30 hover:border-amber-600/50 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full inline-flex mt-1">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-amber-300 mb-2">Email</h3>
                      <p className="text-amber-100/80 text-sm mb-1">info@cloudkitchen.com</p>
                      <p className="text-amber-100/80 text-sm">support@cloudkitchen.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-800/30 hover:border-amber-600/50 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full inline-flex mt-1">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-300 mb-2">Our Location</h3>
                    <p className="text-amber-100/80 text-sm mb-1">
                      TamilNadu, India
                    </p>
                    <p className="text-amber-100/80 text-sm mb-4">
                      Operating Hours: Monday to Sunday, 8:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Location Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center bg-amber-900/80 p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-white font-medium mb-2">Our Kitchen Location</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-300 text-amber-300 hover:bg-amber-800"
                      onClick={() => window.open('https://maps.google.com', '_blank')}
                    >
                      Open in Google Maps
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      <Footer />
    </>
  );
};

export default Contact;
