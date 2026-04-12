"use client";

import { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { COMPANY_INFO } from "@/constants/navigation";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-dark via-dark-light to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Get in touch with our sales and technical team. We&apos;re here to
            help you find the right solution.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-light/50 p-6">
                <h3 className="font-heading font-bold text-lg text-dark mb-4">
                  Contact Information
                </h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">📍</span>
                    <div>
                      <p className="font-medium text-dark">Address</p>
                      <p className="text-gray">{COMPANY_INFO.address}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">📞</span>
                    <div>
                      <p className="font-medium text-dark">Phone</p>
                      <a
                        href={`tel:${COMPANY_INFO.phone}`}
                        className="text-primary hover:text-primary-dark"
                      >
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">✉️</span>
                    <div>
                      <p className="font-medium text-dark">Email</p>
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="text-primary hover:text-primary-dark"
                      >
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl border border-gray-light/50 p-6">
                <h3 className="font-heading font-bold text-lg text-dark mb-4">
                  Business Hours
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray">Monday - Friday</span>
                    <span className="font-medium text-dark">8:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray">Saturday</span>
                    <span className="font-medium text-dark">8:00 AM - 12:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray">Sunday</span>
                    <span className="font-medium text-danger">Closed</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-light/50 p-8">
                <h3 className="font-heading font-bold text-xl text-dark mb-6">
                  Send Us a Message
                </h3>

                {status === "success" && (
                  <div className="mb-6 p-4 bg-success/10 rounded-xl text-success text-sm font-medium">
                    ✅ Your message has been sent successfully! We&apos;ll get
                    back to you within 24 hours.
                  </div>
                )}

                {status === "error" && (
                  <div className="mb-6 p-4 bg-danger/10 rounded-xl text-danger text-sm font-medium">
                    ❌ Failed to send message. Please try again later.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="Full Name *"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Email Address *"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="Phone Number"
                      name="phone"
                      placeholder="+84 912 345 678"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <Input
                      label="Subject"
                      name="subject"
                      placeholder="Product Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <Input
                    label="Message *"
                    name="message"
                    type="textarea"
                    placeholder="Tell us about your project requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
