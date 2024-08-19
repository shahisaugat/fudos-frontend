import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/contacts', formData);
      toast.success('Contact saved successfully!');
      setFormData({
        firstName: '',
        email: '',
        phoneNumber: '',
        message: ''
      });
    } catch (error) {
      console.error('Error saving contact:', error);
      toast.error('There was an error saving the contact.');
    }
  };

  return (
    <div className="isolate bg-white px-6 lg:px-8 py-6 mt-2 mb-2 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row">
        {/* Map Section */}
        <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pr-4">
          <div className="relative w-full h-[300px] lg:h-[432px] rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Map of Nepal"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1044703.4480405232!2d80.05829594521941!3d28.394857933307837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39efafc50c872d07%3A0x9aa35b7fcdf5b71a!2sNepal!5e0!3m2!1sen!2sus!4v1627957112652!5m2!1sen!2sus"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="lg:w-1/2 lg:pl-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">Contact Us</h2>
          <p className="mt-2 text-base leading-6 text-gray-600">
            Feel free to reach out to us for any inquiries or feedback.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 max-w-md">
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 gap-x-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-1">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold leading-6 text-gray-900">
                  Phone number
                </label>
                <div className="mt-1">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="block w-full rounded-md bg-[#EB5757] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-[#e74c3c] focus:outline-none focus:ring-2 focus:ring-[#EB5757] focus:ring-offset-2"
              >
                Send an enquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
