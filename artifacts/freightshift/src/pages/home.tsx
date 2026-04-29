import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Globe, Anchor, Plane, Truck, ShieldCheck, Clock, 
  MapPin, CheckCircle2, ChevronRight, Package, Box, BarChart3,
  Activity, FileCheck, Headphones, Zap, Phone
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const quoteSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  mobile: z.string().min(10, { message: "Mobile number is required" }),
  goodsType: z.string().min(2, { message: "Type of goods is required" }),
  volumeWeight: z.string().min(2, { message: "Volume / weight is required" }),
  mode: z.enum(["sea", "air"], { required_error: "Please select a shipping mode" }),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      goodsType: "",
      volumeWeight: "",
    },
  });

  const onSubmit = (data: QuoteFormValues) => {
    // Simulate API call and save to local storage
    const quotes = JSON.parse(localStorage.getItem('freightshift_quotes') || '[]');
    quotes.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem('freightshift_quotes', JSON.stringify(quotes));
    
    setIsSubmitted(true);
    toast.success("Quote request received!", {
      description: "Thanks — we'll be in touch within one business day.",
    });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-brand-navy">
          {/* Background Image overlay with gradient */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero.png" 
              alt="Container ship at port" 
              className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-blue-200 text-sm font-medium mb-6">
                  <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                  China to South Africa Specialists
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
                  We deliver <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-brand-blue">freight solutions.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
                  Reliable freight forwarding, customs clearance, warehousing, and delivery between China and South Africa.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white text-base h-14 px-8 border-none"
                    onClick={(e) => {
                      const element = document.querySelector("#quote");
                      if (element) {
                        const top = element.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }}
                  >
                    Get a Quote
                  </Button>
                  <a href="https://wa.me/message/EVTMLWYQY2OCG1" target="_blank" rel="noopener noreferrer">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white h-14 px-8 gap-2 w-full sm:w-auto"
                    >
                      <FaWhatsapp className="w-5 h-5 text-green-400" />
                      WhatsApp Us
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <div className="bg-brand-blue py-6 relative z-20 shadow-md">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-20 text-white text-sm md:text-base font-medium">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-white/80" />
                China–SA Corridor Specialists
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-white/80" />
                Air · Sea · Road
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-white/80" />
                Door-to-Door Delivery
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white/80" />
                Real-Time Tracking
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 md:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="order-2 lg:order-1"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square md:aspect-[4/3]">
                  <img 
                    src="/warehouse.png" 
                    alt="Modern logistics warehouse interior" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="order-1 lg:order-2"
              >
                <div className="mb-6">
                  <span className="text-brand-blue font-semibold tracking-wider uppercase text-sm">About Us</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">About FreightShift</h2>
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                  FreightShift International Logistics (Pty) Ltd is a South African-based logistics and freight forwarding company delivering efficient, reliable, and cost-effective supply chain solutions across local and international markets.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed mb-10">
                  The company specializes in seamless cargo movement between China and South Africa, while also supporting domestic logistics across South Africa. With a commitment to precision and trust, we manage the complexities of international trade so you don't have to.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { text: "China to SA freight expertise", icon: Globe },
                    { text: "Competitive & flexible pricing", icon: BarChart3 },
                    { text: "Real-time shipment tracking", icon: Activity },
                    { text: "Customs compliance knowledge", icon: FileCheck },
                    { text: "Dedicated logistics support", icon: Headphones },
                    { text: "Reliable, fast, transparent service", icon: Zap }
                  ].map((prop, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-border/50">
                      <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                        <prop.icon className="w-5 h-5 text-brand-blue" />
                      </div>
                      <span className="text-foreground/90 font-medium text-sm mt-2">{prop.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <span className="text-brand-blue font-semibold tracking-wider uppercase text-sm">Capabilities</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Our Services</h2>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "International Freight Forwarding",
                  desc: "Air, sea, and road freight, including FCL, LCL, and express cargo.",
                  icon: Globe
                },
                {
                  title: "Customs Clearance",
                  desc: "Compliant customs processing to reduce delays and avoid penalties.",
                  icon: ShieldCheck
                },
                {
                  title: "Warehousing & Distribution",
                  desc: "Secure storage, inventory handling, packing, and distribution.",
                  icon: Box
                },
                {
                  title: "Supply Chain Management",
                  desc: "End-to-end logistics planning to reduce costs and improve delivery timelines.",
                  icon: BarChart3
                },
                {
                  title: "Domestic Logistics Services",
                  desc: "Nationwide transport, last-mile delivery, and business logistics.",
                  icon: Truck
                },
                {
                  title: "Relocation & Moving",
                  desc: "Household and office relocation with secure packing and delivery.",
                  icon: Package
                }
              ].map((service, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="h-full bg-white border-muted hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-colors duration-300">
                        <service.icon className="w-7 h-7 text-brand-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {service.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CHINA TO SA FOCUS SECTION */}
        <section id="china-sa" className="py-20 md:py-32 bg-brand-navy relative overflow-hidden">
          <div className="absolute inset-0 right-0 lg:w-1/2 ml-auto z-0 hidden lg:block opacity-60">
            <img 
              src="/cargo-plane.png" 
              alt="Cargo plane" 
              className="w-full h-full object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/60 to-transparent" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-2xl">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
                  Featured Route
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  China to South Africa Freight
                </h2>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  FreightShift helps South African businesses source, ship, clear, and deliver goods from China safely, affordably, and directly to their doorstep.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex gap-4 items-start">
                    <Anchor className="w-8 h-8 text-brand-blue shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Sea Freight (FCL & LCL)</h4>
                      <p className="text-white/70">Cost-effective shipping for bulk orders, full containers, or shared space.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex gap-4 items-start">
                    <Plane className="w-8 h-8 text-brand-blue shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Air Freight & Express</h4>
                      <p className="text-white/70">Rapid transit for time-sensitive cargo and high-value goods.</p>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex gap-4 items-start">
                    <MapPin className="w-8 h-8 text-brand-blue shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Door-to-Door & Customs</h4>
                      <p className="text-white/70">Seamless handling from supplier origin to final delivery in South Africa, including all customs clearance.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="py-20 md:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-brand-blue rounded-full"></span>
                    Our Vision
                  </h3>
                  <p className="text-lg text-foreground/80 leading-relaxed pl-11 border-l-2 border-brand-blue/20">
                    To become a leading logistics and freight forwarding provider connecting China and South Africa, recognized for innovation, reliability, and excellent service delivery.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-brand-orange rounded-full"></span>
                    Our Mission
                  </h3>
                  <p className="text-lg text-foreground/80 leading-relaxed pl-11 border-l-2 border-brand-orange/20">
                    To deliver seamless, efficient, and cost-effective logistics solutions that support client growth while maintaining high standards of service quality, integrity, and operational performance.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-border"
              >
                <h3 className="text-2xl font-bold text-foreground mb-6">Strategic Goals</h3>
                <ul className="space-y-5">
                  {[
                    "Clear communication and transparent service",
                    "Reduced delivery lead times",
                    "Expanded local and international logistics network",
                    "Real-time visibility through technology",
                    "Compliance, professionalism, and ethical business"
                  ].map((goal, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                      </div>
                      <span className="text-foreground/90 font-medium">{goal}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* GET A QUOTE & CONTACT */}
        <section id="quote" className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
              
              {/* Form Side */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="lg:col-span-3"
              >
                <div className="mb-10">
                  <span className="text-brand-blue font-semibold tracking-wider uppercase text-sm">Request a Quote</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">Let's move your cargo</h2>
                  <p className="text-foreground/70 text-lg">Provide details about your shipment and our team will get back to you within 24 hours.</p>
                </div>

                {isSubmitted ? (
                  <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-2xl p-10 text-center">
                    <div className="w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-navy mb-3">Quote Request Received</h3>
                    <p className="text-foreground/70 mb-8 max-w-sm mx-auto">
                      Thanks for reaching out! We've received your details and will be in touch within one business day.
                    </p>
                    <Button 
                      onClick={() => {
                        form.reset();
                        setIsSubmitted(false);
                      }}
                      variant="outline"
                      className="border-brand-blue text-brand-blue hover:bg-brand-blue/5"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Name & Surname</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" className="bg-muted/50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@company.com" className="bg-muted/50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="mobile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Mobile Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+27 82 000 0000" className="bg-muted/50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="goodsType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Type of Goods</FormLabel>
                              <FormControl>
                                <Input placeholder="Electronics, Machinery, etc." className="bg-muted/50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="volumeWeight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Volume / Weight</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 5 CBM or 200kg" className="bg-muted/50" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mode"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-foreground">Preferred Mode</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex gap-4"
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0 bg-muted/30 border p-4 rounded-xl flex-1 cursor-pointer hover:border-brand-blue/50 transition-colors has-[:checked]:border-brand-blue has-[:checked]:bg-brand-blue/5">
                                  <FormControl>
                                    <RadioGroupItem value="sea" />
                                  </FormControl>
                                  <FormLabel className="font-medium cursor-pointer w-full flex items-center gap-2">
                                    <Anchor className="w-4 h-4 text-brand-blue" />
                                    Sea Freight
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0 bg-muted/30 border p-4 rounded-xl flex-1 cursor-pointer hover:border-brand-blue/50 transition-colors has-[:checked]:border-brand-blue has-[:checked]:bg-brand-blue/5">
                                  <FormControl>
                                    <RadioGroupItem value="air" />
                                  </FormControl>
                                  <FormLabel className="font-medium cursor-pointer w-full flex items-center gap-2">
                                    <Plane className="w-4 h-4 text-brand-blue" />
                                    Air Freight
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white h-14 text-lg border-none mt-4"
                      >
                        Submit Request
                      </Button>
                    </form>
                  </Form>
                )}
              </motion.div>

              {/* Contact Side */}
              <motion.div 
                id="contact"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="lg:col-span-2"
              >
                <div className="bg-brand-navy text-white rounded-2xl p-8 md:p-10 shadow-xl h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-blue rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                  
                  <h3 className="text-2xl font-bold mb-8 relative z-10">Contact Information</h3>
                  
                  <div className="space-y-8 flex-1 relative z-10">
                    <div>
                      <p className="text-white/60 text-sm mb-2">Call Us</p>
                      <a href="tel:+27681095543" className="flex items-center gap-3 text-xl font-medium hover:text-brand-blue transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-brand-blue" />
                        </div>
                        068 109 5543
                      </a>
                    </div>
                    
                    <div>
                      <p className="text-white/60 text-sm mb-2">WhatsApp</p>
                      <a href="https://wa.me/message/EVTMLWYQY2OCG1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xl font-medium hover:text-green-400 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <FaWhatsapp className="w-5 h-5 text-green-400" />
                        </div>
                        Chat with us
                      </a>
                    </div>

                    <div>
                      <p className="text-white/60 text-sm mb-2">Headquarters</p>
                      <div className="flex items-start gap-3 font-medium">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-brand-blue" />
                        </div>
                        <span className="mt-2 text-white/90">South Africa</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                    <div className="relative rounded-xl overflow-hidden aspect-video">
                      <img src="/logistics-pro.png" alt="Logistics Professional" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-brand-navy/20 mix-blend-overlay"></div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
