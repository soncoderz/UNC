import Button from "@/components/common/Button";

export const metadata = {
  title: "Technical Support",
  description:
    "Technical documentation, downloads, manuals, and support resources for SolarTech Energy products.",
};

export default function SupportPage() {
  const resources = [
    {
      icon: "📄",
      title: "Product Datasheets",
      description:
        "Download detailed technical specifications and datasheets for all our inverter and storage products.",
      action: "Browse Datasheets",
    },
    {
      icon: "📘",
      title: "Installation Manuals",
      description:
        "Step-by-step installation guides and wiring diagrams for safe and efficient product setup.",
      action: "View Manuals",
    },
    {
      icon: "💻",
      title: "Software & Firmware",
      description:
        "Download the latest monitoring software, firmware updates, and configuration tools.",
      action: "Download Software",
    },
    {
      icon: "🎥",
      title: "Video Tutorials",
      description:
        "Watch installation walkthroughs, troubleshooting guides, and product demonstration videos.",
      action: "Watch Videos",
    },
    {
      icon: "❓",
      title: "FAQ",
      description:
        "Find answers to the most commonly asked questions about our products and services.",
      action: "View FAQ",
    },
    {
      icon: "🎓",
      title: "Training Programs",
      description:
        "Register for online and in-person technical training sessions for installers and engineers.",
      action: "Register Now",
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-dark via-dark-light to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4">
            Technical Support
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Access product documentation, downloads, training resources, and
            expert technical support.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="group bg-white rounded-2xl border border-gray-light/50 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-5 group-hover:bg-primary/20 transition-colors">
                  {resource.icon}
                </div>
                <h3 className="font-heading font-bold text-xl text-dark mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray text-sm leading-relaxed mb-5">
                  {resource.description}
                </p>
                <button className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1">
                  {resource.action} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-dark mb-4">
            Need Direct Support?
          </h2>
          <p className="text-gray mb-8">
            Our technical support team is available to help you with
            installation, commissioning, and troubleshooting.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Contact Support Team
            </Button>
            <Button href="tel:+842812345678" variant="outline" size="lg">
              📞 Call Hotline
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
