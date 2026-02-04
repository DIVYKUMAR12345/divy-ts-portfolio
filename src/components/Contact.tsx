import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { motion } from "motion/react";
import emailjs from "emailjs-com";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
} from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus("⚠️ Please fill all fields.");
      return;
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(form.email)) {
      setStatus("⚠️ Enter a valid email address.");
      return;
    }

    setSending(true);
    setStatus("Sending...");

    // ✅ Send correct variables matching EmailJS template
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,       // Must match your EmailJS template variable
          email: form.email,     // Must match your EmailJS template variable
          subject: form.subject,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
        setSending(false);
      })
      .catch(() => {
        setStatus("❌ Failed to send message. Please try again.");
        setSending(false);
      });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "pateldivy548@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 7984945934" },
    { icon: MapPin, label: "Location", value: "Ahmedabad, Gujarat, India" },
  ];

  const quickLinks = [
    { icon: Github, url: "https://github.com/DIVYKUMAR12345" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/divykumar-patel/" },
    { icon: Mail, url: "mailto:pateldivy548@gmail.com" },
    { icon: MessageCircle, url: "https://wa.me/917984945934" },
    { icon: Instagram, url: "https://www.instagram.com/pateldivy_12345" },
  ];

  return (
    <section id="contact" className="relative min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl text-gray-900 dark:text-white text-center mb-12"
        >
          Get In{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Touch
          </span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl dark:text-white mb-6">
              Let’s Connect & Collaborate 🤝
            </h3>

            <p className="text-gray-600 dark:text-white/70 mb-8">
              Whether it’s a new project or collaboration — I’d love to hear from
              you!
            </p>

            <div className="space-y-6 mb-12">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-300 dark:border-white/10 rounded-xl p-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-white/60 text-sm">
                      {item.label}
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-6 mt-10">
              {quickLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/50 dark:bg-white/5 border"
                >
                  <item.icon className="w-6 h-6 text-blue-500" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-6 py-4 rounded-xl border bg-white/50 dark:bg-white/5"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-6 py-4 rounded-xl border bg-white/50 dark:bg-white/5"
              />

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-6 py-4 rounded-xl border bg-white/50 dark:bg-white/5"
              />

              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full px-6 py-4 rounded-xl border bg-white/50 dark:bg-white/5"
              />

              

              <motion.button
                type="submit"
                disabled={sending}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white flex justify-center gap-2"
              >
                {sending ? "Sending..." : "Send Message"} <Send size={18} />
              </motion.button>

              {status && (
                <p className="text-center text-sm mt-3">{status}</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
