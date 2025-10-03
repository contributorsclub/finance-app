import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Leadership", href: "/leadership" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Wealth Management", href: "/services/wealth-management" },
        { label: "Retirement Planning", href: "/services/retirement" },
        { label: "Investment Strategies", href: "/services/investing" },
        { label: "Tax Planning", href: "/services/tax-planning" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Market Insights", href: "/resources/market-insights" },
        { label: "Financial Guides", href: "/resources/guides" },
        { label: "Educational Tools", href: "/resources/tools" },
        { label: "FAQ", href: "/resources/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Terms of Service", href: "/legal/terms" },
        { label: "Compliance", href: "/legal/compliance" },
        { label: "Disclosures", href: "/legal/disclosures" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
    { icon: Instagram, href: "https://instagram.com" },
  ];

  return (
    <footer className="bg-[#0F2644] text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">WealthVision</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Tagline */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-gray-300 text-sm mb-4">
              Empowering financial growth through personalized wealth management
              strategies.
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Information */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail size={20} className="text-blue-300" />
                <span className="text-sm">support@WealthVision.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={20} className="text-blue-300" />
                <span className="text-sm">(888) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={20} className="text-blue-300" />
                <span className="text-sm">
                  123 Financial Street, Suite 500, New York, NY 10001
                </span>
              </div>
            </div>
            <div className="flex space-x-4 p-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} WealthVision. All Rights Reserved.
            <span className="ml-2 text-blue-300">Member FINRA/SIPC</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
