import React, { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been sent to FarmCartLK Support.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="bg-[#001D0D] text-white rounded-3xl p-8 border-b-4 border-[#31A464]">
        <span className="text-xs font-bold text-[#31A464] uppercase tracking-wider bg-[#31A464]/20 px-3 py-1 rounded-full">
          GET IN TOUCH
        </span>
        <h1 className="text-3xl font-extrabold font-heading mt-2">Contact FarmCartLK</h1>
        <p className="text-stone-300 text-sm">Have questions about farmer onboarding, bulk orders, or platform support?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 space-y-6 shadow-xs">
          <h3 className="font-bold text-stone-900 text-lg font-heading">Marketplace Hubs</h3>

          <div className="space-y-4 text-sm text-stone-600">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#31A464] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-stone-900">Highland Office</p>
                <p>No. 45, Market Road, Nuwara Eliya, Sri Lanka</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#C77F1F] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-stone-900">Lowland Produce Hub</p>
                <p>Economic Center Corridor, Dambulla, Sri Lanka</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#4C9AAD] shrink-0" />
              <div>
                <p className="font-bold text-stone-900">Phone</p>
                <p>+94 11 234 5678 / +94 77 112 2334</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#31A464] shrink-0" />
              <div>
                <p className="font-bold text-stone-900">Email</p>
                <p>support@farmcart.lk</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-bold text-stone-900 text-lg font-heading">Send Us a Message</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#F5F5F4] text-sm rounded-xl px-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#F5F5F4] text-sm rounded-xl px-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-[#F5F5F4] text-sm rounded-xl px-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Message</label>
              <textarea
                rows="4"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#F5F5F4] text-sm rounded-xl px-3.5 py-2.5 border border-stone-200 focus:outline-none focus:border-[#31A464]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#31A464] hover:bg-[#24824e] text-white font-bold text-sm px-6 py-3 rounded-full flex items-center gap-2 shadow-xs transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
