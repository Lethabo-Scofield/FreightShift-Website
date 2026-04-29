import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">Contact Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Get in touch</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="h-full border-t-4 border-t-green-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <FaWhatsapp className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="font-bold text-lg mb-2">WhatsApp Us</h3>
                <p className="text-sm text-foreground/60 mb-6">Fastest response for quick queries and document exchange.</p>
                <a href="https://wa.me/message/EVTMLWYQY2OCG1" target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline mt-auto">
                  Message Now →
                </a>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card className="h-full border-t-4 border-t-brand-blue hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <Phone className="w-7 h-7 text-brand-blue" />
                </div>
                <h3 className="font-bold text-lg mb-2">Call Office</h3>
                <p className="text-sm text-foreground/60 mb-6">Speak directly with our logistics coordinators.</p>
                <a href="tel:+27681095543" className="text-brand-blue font-semibold hover:underline mt-auto">
                  068 109 5543
                </a>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Card className="h-full border-t-4 border-t-brand-navy hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 text-brand-navy" />
                </div>
                <h3 className="font-bold text-lg mb-2">Service Area</h3>
                <p className="text-sm text-foreground/60 mb-6">Nationwide South African coverage from major ports.</p>
                <span className="text-brand-navy font-semibold mt-auto">
                  Gauteng, KZN, W. Cape
                </span>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
