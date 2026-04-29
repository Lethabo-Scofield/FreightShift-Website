import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Clock, Calculator, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const quoteSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  mobile: z.string().min(10, { message: "Mobile number is required" }),
  goodsType: z.string().min(2, { message: "Type of goods is required" }),
  volumeWeight: z.string().min(2, { message: "Volume / weight is required" }),
  mode: z.enum(["sea", "air"], { required_error: "Please select a shipping mode" }),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export function Quote() {
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
    const quotes = JSON.parse(localStorage.getItem('freightshift_quotes') || '[]');
    quotes.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem('freightshift_quotes', JSON.stringify(quotes));
    setIsSubmitted(true);
  };

  return (
    <section id="quote" className="py-20 md:py-32 bg-muted border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-2 lg:sticky lg:top-32"
          >
            <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">Request a Quote</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">Accurate rates, no hidden fees.</h2>
            
            <ul className="space-y-6 mb-10">
              <li className="flex gap-4">
                <div className="mt-1"><Calculator className="w-5 h-5 text-brand-blue" /></div>
                <div>
                  <h4 className="font-bold text-foreground">Transparent Pricing</h4>
                  <p className="text-sm text-foreground/70">Clear breakdown of origin, freight, and destination charges.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1"><Clock className="w-5 h-5 text-brand-blue" /></div>
                <div>
                  <h4 className="font-bold text-foreground">24-Hour Turnaround</h4>
                  <p className="text-sm text-foreground/70">We aim to provide comprehensive quotes within one business day.</p>
                </div>
              </li>
            </ul>

            <div className="p-6 bg-white border border-border/60 rounded-2xl space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-foreground/50 mb-2">Need immediate assistance?</h4>
              <a href="https://wa.me/message/EVTMLWYQY2OCG1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-brand-orange transition-colors font-medium">
                <FaWhatsapp className="w-5 h-5 text-green-500" />
                WhatsApp Us
              </a>
              <a href="tel:+27681095543" className="flex items-center gap-3 text-foreground hover:text-brand-orange transition-colors font-medium">
                <Phone className="w-5 h-5 text-brand-blue" />
                068 109 5543
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-border/40"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Request Received</h3>
                <p className="text-foreground/70 mb-8 max-w-sm mx-auto">
                  Our team is preparing your rate. We'll be in touch via email or phone shortly.
                </p>
                <Button 
                  onClick={() => {
                    form.reset();
                    setIsSubmitted(false);
                  }}
                  variant="outline"
                  className="font-medium"
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
                          <FormLabel className="text-foreground font-semibold">Name & Surname</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-muted/50 h-12" {...field} />
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
                          <FormLabel className="text-foreground font-semibold">Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@company.co.za" className="bg-muted/50 h-12" {...field} />
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
                          <FormLabel className="text-foreground font-semibold">Mobile Number</FormLabel>
                          <FormControl>
                            <Input placeholder="082 123 4567" className="bg-muted/50 h-12" {...field} />
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
                          <FormLabel className="text-foreground font-semibold">Commodity / Goods</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Electronics, Machinery" className="bg-muted/50 h-12" {...field} />
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
                        <FormLabel className="text-foreground font-semibold">Volume & Weight (Est)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 500kg, 2 CBM, or 1x20ft Container" className="bg-muted/50 h-12" {...field} />
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
                        <FormLabel className="text-foreground font-semibold">Preferred Mode</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col sm:flex-row gap-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 border border-border/60 p-4 rounded-xl flex-1 cursor-pointer hover:border-brand-blue/50 transition-colors has-[:checked]:border-brand-blue has-[:checked]:bg-brand-blue/5">
                              <FormControl>
                                <RadioGroupItem value="sea" />
                              </FormControl>
                              <FormLabel className="font-medium cursor-pointer w-full">Sea Freight</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 border border-border/60 p-4 rounded-xl flex-1 cursor-pointer hover:border-brand-blue/50 transition-colors has-[:checked]:border-brand-blue has-[:checked]:bg-brand-blue/5">
                              <FormControl>
                                <RadioGroupItem value="air" />
                              </FormControl>
                              <FormLabel className="font-medium cursor-pointer w-full">Air Freight</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white h-14 text-lg mt-4 shadow-lg shadow-brand-orange/20 border-none">
                    Submit Request
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
