"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { COMPANY_INFO } from "@/constants/navigation";
import { submitContact } from "@/services/api";
import type { ContactFormData } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";

type FormStatus = "loading" | "success" | "error" | null;

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await submitContact(formData);
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
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
            {t("contact.title")}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t("contact.heroSubtitle")}
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
                  {t("contact.information")}
                </h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">📍</span>
                    <div>
                      <p className="font-medium text-dark">{t("contact.address")}</p>
                      <p className="text-gray">{COMPANY_INFO.address}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">📞</span>
                    <div>
                      <p className="font-medium text-dark">{t("contact.phone")}</p>
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
                      <p className="font-medium text-dark">{t("contact.email")}</p>
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
                  {t("contact.businessHours")}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray">{t("contact.mondayFriday")}</span>
                    <span className="font-medium text-dark">8:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray">{t("contact.saturday")}</span>
                    <span className="font-medium text-dark">8:00 AM - 12:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray">{t("contact.sunday")}</span>
                    <span className="font-medium text-danger">{t("contact.closed")}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-light/50 p-8">
                <h3 className="font-heading font-bold text-xl text-dark mb-6">
                  {t("contact.sendUsMessage")}
                </h3>

                {status === "success" && (
                  <div className="mb-6 p-4 bg-success/10 rounded-xl text-success text-sm font-medium">
                    {t("contact.success")}
                  </div>
                )}

                {status === "error" && (
                  <div className="mb-6 p-4 bg-danger/10 rounded-xl text-danger text-sm font-medium">
                    {t("contact.error")}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label={`${t("contact.name")} *`}
                      name="name"
                      placeholder={t("contact.namePlaceholder")}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label={`${t("contact.email")} *`}
                      name="email"
                      type="email"
                      placeholder={t("contact.emailPlaceholder")}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label={t("contact.phone")}
                      name="phone"
                      placeholder="+84 912 345 678"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <Input
                      label={t("contact.subject")}
                      name="subject"
                      placeholder={t("contact.subjectPlaceholder")}
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <Input
                    label={`${t("contact.message")} *`}
                    name="message"
                    type="textarea"
                    placeholder={t("contact.messagePlaceholder")}
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
                    {status === "loading" ? t("contact.sending") : t("contact.send")}
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
