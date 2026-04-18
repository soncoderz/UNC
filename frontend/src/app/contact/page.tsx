"use client";

import { useState, type FormEvent } from "react";
import InnerHero from "@/components/uniconvtor/InnerHero";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { COMPANY_INFO } from "@/constants/navigation";
import { innerBanners } from "@/data/uniconvtor";
import { submitContact } from "@/services/api";
import { useLanguage } from "@/context/LanguageContext";

type FormState = {
  product: string;
  company: string;
  phone: string;
  address: string;
  name: string;
  email: string;
  content: string;
};

const initialFormState: FormState = {
  product: "",
  company: "",
  phone: "",
  address: "",
  name: "",
  email: "",
  content: "",
};

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function updateField(field: keyof FormState, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      await submitContact({
        name: formData.name || formData.company || "Website visitor",
        email: formData.email,
        phone: formData.phone,
        subject: formData.product || "Contact inquiry",
        message: [
          formData.content,
          formData.company ? `Company: ${formData.company}` : "",
          formData.address ? `Address: ${formData.address}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      });
      setStatus("success");
      setFormData(initialFormState);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <InnerHero
        title={t("contact.title")}
        subtitle="UNC a new driving force for green energy"
        image={innerBanners.contact}
      />

      <section className="clone-contact-main">
        <div className="clone-contact-info">
          <h2>Qingdao UNC Technology Co., Ltd</h2>
          <div className="clone-contact-list">
            <div>
              <RemoteImage
                src="/template/default/esimg/icon/contatct_icon_add.png"
                alt=""
                width={38}
                height={38}
              />
              <span>
                <strong>{t("contact.address")}</strong>
                <em>{COMPANY_INFO.address}</em>
              </span>
            </div>
            <div>
              <RemoteImage
                src="/template/default/esimg/icon/contatct_icon_phone.png"
                alt=""
                width={38}
                height={38}
              />
              <span>
                <strong>{t("footer.hotline")}</strong>
                <em>{COMPANY_INFO.phone}</em>
              </span>
            </div>
            <div>
              <RemoteImage
                src="/template/default/esimg/icon/contatct_icon_email.png"
                alt=""
                width={38}
                height={38}
              />
              <span>
                <strong>{t("contact.email")}</strong>
                <em>{COMPANY_INFO.email}</em>
              </span>
            </div>
            <div>
              <RemoteImage
                src="/template/default/esimg/icon/contatct_icon_www.png"
                alt=""
                width={38}
                height={38}
              />
              <span>
                <strong>Website</strong>
                <em>www.uniconvtor.com</em>
              </span>
            </div>
          </div>

          <div className="clone-contact-qrs">
            <div>
              <RemoteImage
                src="/static/upload/image/20240718/1721291069896348.png"
                alt="WeChat QR code"
                width={120}
                height={120}
              />
              <span>WeChat</span>
            </div>
            <div>
              <RemoteImage
                src="/static/upload/image/20240827/1724725433746661.jpg"
                alt="WeChat Official Account QR code"
                width={120}
                height={120}
              />
              <span>WeChat Official Account</span>
            </div>
          </div>
        </div>

        <div className="clone-contact-map">
          <RemoteImage
            src="/template/default/esimg/img/ditu.png"
            alt="UNC map"
            width={640}
            height={430}
            sizes="(max-width: 900px) 90vw, 640px"
          />
        </div>
      </section>

      <section className="clone-big-message">
        <div className="clone-title clone-title-left">
          <h2>{t("footer.contactNow")}</h2>
          <p>UNC a new driving force for green energy</p>
        </div>

        <form onSubmit={handleSubmit} className="clone-big-form">
          {status === "success" ? (
            <div className="clone-form-status is-success">
              {t("contact.success")}
            </div>
          ) : null}
          {status === "error" ? (
            <div className="clone-form-status is-error">
              {t("contact.error")}
            </div>
          ) : null}

          <label>
            <span>{t("contact.interesting")}</span>
            <input
              value={formData.product}
              onChange={(event) => updateField("product", event.target.value)}
            />
          </label>
          <label>
            <span>{t("contact.company")}</span>
            <input
              value={formData.company}
              onChange={(event) => updateField("company", event.target.value)}
            />
          </label>
          <label>
            <span>*{t("contact.phone")}</span>
            <input
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              required
            />
          </label>
          <label>
            <span>{t("contact.address")}</span>
            <input
              value={formData.address}
              onChange={(event) => updateField("address", event.target.value)}
            />
          </label>
          <label>
            <span>{t("contact.name")}</span>
            <input
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </label>
          <label>
            <span>*{t("contact.email")}</span>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
            />
          </label>
          <label className="clone-message-field">
            <span>*{t("contact.message")}</span>
            <textarea
              value={formData.content}
              onChange={(event) => updateField("content", event.target.value)}
              required
            />
          </label>
          <div className="clone-verify-row">
            <span className="clone-verify-name">*{t("contact.verify")}</span>
            <div className="clone-verify-box">
              <span>{t("contact.clickVerify")}</span>
              <button type="submit" disabled={status === "sending"}>
                {status === "sending" ? t("contact.sending") : t("contact.send")}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
