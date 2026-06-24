import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Clock, Calculator, Phone, Anchor, Plane } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ORIGINS = [
  "Shanghai",
  "Shenzhen / Yantian",
  "Guangzhou",
  "Ningbo",
  "Hong Kong",
  "Qingdao",
  "Other / Not sure",
] as const;

const DESTINATIONS = [
  "Johannesburg (Gauteng)",
  "Durban (KZN)",
  "Cape Town (W. Cape)",
  "Port Elizabeth",
  "Other / Not sure",
] as const;

const SEA_CARGO = [
  { value: "lcl", label: "LCL — Shared container (under 15 CBM)" },
  { value: "20ft", label: "FCL — 20ft container" },
  { value: "40ft", label: "FCL — 40ft container" },
  { value: "40hq", label: "FCL — 40ft High Cube" },
  { value: "not_sure", label: "Not sure — please advise" },
];

const AIR_CARGO = [
  { value: "express", label: "Express — under 100 kg" },
  { value: "standard", label: "Standard air — 100 kg+" },
  { value: "bulk_air", label: "Bulk air — over 500 kg" },
  { value: "not_sure", label: "Not sure — please advise" },
];

const GOODS_CATEGORIES = [
  "Electronics",
  "Apparel & Textiles",
  "Machinery & Equipment",
  "Auto Parts",
  "Furniture & Homeware",
  "Construction Materials",
  "FMCG",
  "Personal / Relocation",
  "Other",
] as const;

const quoteSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  mobile: z.string().min(10, { message: "Mobile number is required" }),
  mode: z.enum(["sea", "air"], { required_error: "Choose a shipping mode" }),
  origin: z.string().min(2, { message: "Pick an origin" }),
  destination: z.string().min(2, { message: "Pick a destination" }),
  cargoType: z.string().min(2, { message: "Pick a cargo type" }),
  goodsType: z.string().min(2, { message: "Pick a goods category" }),
  estWeight: z.string().optional(),
  estVolume: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export function Quote() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      mode: "sea",
      origin: "",
      destination: "",
      cargoType: "",
      goodsType: "",
      estWeight: "",
      estVolume: "",
      notes: "",
    },
  });

  const mode = form.watch("mode");
  const cargoOptions = mode === "air" ? AIR_CARGO : SEA_CARGO;

  const onSubmit = async (data: QuoteFormValues) => {
    setSubmitError(null);
    setIsSubmitting(true);

    const cargoLabel =
      cargoOptions.find((opt) => opt.value === data.cargoType)?.label ?? data.cargoType;

    const payload = {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      mode: data.mode,
      goodsType: data.goodsType,
      volumeWeight: [
        data.estWeight ? `Weight: ${data.estWeight}` : null,
        data.estVolume ? `Volume: ${data.estVolume}` : null,
      ]
        .filter(Boolean)
        .join(" · ") || "Not specified",
      origin: data.origin,
      destination: data.destination,
      cargoType: cargoLabel,
      notes: data.notes ?? "",
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to send quote request");
      }
      const quotes = JSON.parse(localStorage.getItem("freightshift_quotes") || "[]");
      quotes.push({ ...data, date: new Date().toISOString() });
      localStorage.setItem("freightshift_quotes", JSON.stringify(quotes));
      setIsSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again or WhatsApp us.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote" className="py-20 md:py-32 bg-background border-b-2 border-foreground relative">
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid-quote" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-quote)" />
        </svg>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-2 lg:sticky lg:top-32"
          >
            <div className="mb-4 inline-flex items-center gap-2 bg-foreground text-background px-3 py-1 font-mono text-xs uppercase tracking-widest font-bold">
              <span className="w-1.5 h-1.5 bg-accent inline-block rounded-none" />
              Request a Quote // 02
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-4 mb-6 uppercase tracking-tight">
              Clear rates.<br />No surprises.
            </h2>

            <ul className="space-y-6 mb-10 border-t-2 border-foreground/10 pt-6">
              <li className="flex gap-4">
                <div className="mt-1">
                  <Calculator className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-mono font-bold uppercase tracking-wider text-foreground">Transparent pricing</h4>
                  <p className="text-sm font-sans text-foreground/70 mt-1">
                    Origin, freight, and destination charges, itemised.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-mono font-bold uppercase tracking-wider text-foreground">Reply within 24 hours</h4>
                  <p className="text-sm font-sans text-foreground/70 mt-1">Usually faster on WhatsApp.</p>
                </div>
              </li>
            </ul>

            <div className="p-6 bg-background border-2 border-foreground rounded-none space-y-4">
              <h4 className="font-mono font-bold uppercase tracking-wider text-foreground text-sm mb-4">
                Need help now?
              </h4>
              <a
                href="https://wa.me/message/EVTMLWYQY2OCG1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-accent transition-colors font-mono font-bold text-sm uppercase tracking-wider"
              >
                <FaWhatsapp className="w-5 h-5" />
                WhatsApp Us
              </a>
              <a
                href="tel:+27100113971"
                className="flex items-center gap-3 text-foreground hover:text-accent transition-colors font-mono font-bold text-sm uppercase tracking-wider"
              >
                <Phone className="w-5 h-5" />
                010 011 3971
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-3 bg-foreground text-background p-6 md:p-10 rounded-none border-2 border-foreground"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-background/10 rounded-none flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-display font-bold text-background uppercase mb-3 tracking-tight">Request received</h3>
                <p className="text-background/70 mb-8 max-w-sm mx-auto font-sans">
                  We'll send your rate within 24 hours.
                </p>
                <Button
                  onClick={() => {
                    form.reset();
                    setIsSubmitted(false);
                  }}
                  variant="outline"
                  className="bg-transparent border-2 border-background text-background hover:bg-background hover:text-foreground font-mono font-bold uppercase tracking-wider text-sm h-12 px-6 rounded-none"
                >
                  Submit another request
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Mode toggle as a prominent segmented control */}
                  <FormField
                    control={form.control}
                    name="mode"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-background font-mono font-bold uppercase tracking-wider text-xs">
                          Shipping mode
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(val) => {
                              field.onChange(val);
                              form.setValue("cargoType", "");
                            }}
                            value={field.value}
                            className="grid grid-cols-2 gap-3"
                          >
                            <FormItem className="m-0">
                              <FormLabel
                                className="flex items-center gap-3 border-2 border-background/20 p-4 rounded-none cursor-pointer hover:border-background/50 transition-colors m-0 font-mono font-bold text-sm uppercase tracking-wider has-[button[data-state=checked]]:border-accent has-[button[data-state=checked]]:bg-accent/10"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value="sea"
                                    aria-label="Sea Freight"
                                    className="absolute opacity-0 pointer-events-none"
                                  />
                                </FormControl>
                                <Anchor className="w-5 h-5 text-accent" />
                                Sea Freight
                              </FormLabel>
                            </FormItem>
                            <FormItem className="m-0">
                              <FormLabel
                                className="flex items-center gap-3 border-2 border-background/20 p-4 rounded-none cursor-pointer hover:border-background/50 transition-colors m-0 font-mono font-bold text-sm uppercase tracking-wider has-[button[data-state=checked]]:border-accent has-[button[data-state=checked]]:bg-accent/10"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value="air"
                                    aria-label="Air Freight"
                                    className="absolute opacity-0 pointer-events-none"
                                  />
                                </FormControl>
                                <Plane className="w-5 h-5 text-accent" />
                                Air Freight
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-accent" />
                      </FormItem>
                    )}
                  />

                  {/* Lane: origin -> destination */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="origin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-background font-mono font-bold uppercase tracking-wider text-xs">
                            Pickup in China
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background text-foreground border-2 border-background h-12 rounded-none font-sans">
                                <SelectValue placeholder="Choose origin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none border-2 border-foreground bg-background text-foreground">
                              {ORIGINS.map((o) => (
                                <SelectItem key={o} value={o} className="rounded-none font-sans focus:bg-foreground focus:text-background">
                                  {o}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-accent" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-background font-mono font-bold uppercase tracking-wider text-xs">
                            Delivery in SA
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background text-foreground border-2 border-background h-12 rounded-none font-sans">
                                <SelectValue placeholder="Choose destination" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none border-2 border-foreground bg-background text-foreground">
                              {DESTINATIONS.map((d) => (
                                <SelectItem key={d} value={d} className="rounded-none font-sans focus:bg-foreground focus:text-background">
                                  {d}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-accent" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Cargo type + goods category */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cargoType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-background font-mono font-bold uppercase tracking-wider text-xs">
                            Cargo type
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background text-foreground border-2 border-background h-12 rounded-none font-sans">
                                <SelectValue placeholder="Choose container or service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none border-2 border-foreground bg-background text-foreground">
                              {cargoOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value} className="rounded-none font-sans focus:bg-foreground focus:text-background">
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-accent" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="goodsType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-background font-mono font-bold uppercase tracking-wider text-xs">Goods</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background text-foreground border-2 border-background h-12 rounded-none font-sans">
                                <SelectValue placeholder="What are you shipping?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none border-2 border-foreground bg-background text-foreground">
                              {GOODS_CATEGORIES.map((g) => (
                                <SelectItem key={g} value={g} className="rounded-none font-sans focus:bg-foreground focus:text-background">
                                  {g}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-accent" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Optional weight + volume */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="estWeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-background font-mono font-bold uppercase tracking-wider text-xs">
                            Est. weight <span className="text-background/40 font-normal">(OPTIONAL)</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 500 kg" className="bg-background text-foreground border-2 border-background h-12 rounded-none font-sans" {...field} />
                          </FormControl>
                          <FormMessage className="text-accent" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="estVolume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-background font-mono font-bold uppercase tracking-wider text-xs">
                            Est. volume <span className="text-background/40 font-normal">(OPTIONAL)</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 2 CBM" className="bg-background text-foreground border-2 border-background h-12 rounded-none font-sans" {...field} />
                          </FormControl>
                          <FormMessage className="text-accent" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t-2 border-background/20 pt-6 space-y-4">
                    <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-background/50">
                      Your details
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-background font-mono font-bold uppercase tracking-wider text-xs">
                              Full name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="bg-background text-foreground border-2 border-background h-12 rounded-none font-sans" {...field} />
                            </FormControl>
                            <FormMessage className="text-accent" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-background font-mono font-bold uppercase tracking-wider text-xs">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@company.co.za"
                                className="bg-background text-foreground border-2 border-background h-12 rounded-none font-sans"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-accent" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-background font-mono font-bold uppercase tracking-wider text-xs">Mobile</FormLabel>
                          <FormControl>
                            <Input placeholder="082 123 4567" className="bg-background text-foreground border-2 border-background h-12 rounded-none font-sans" {...field} />
                          </FormControl>
                          <FormMessage className="text-accent" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-background font-mono font-bold uppercase tracking-wider text-xs">
                          Notes <span className="text-background/40 font-normal">(OPTIONAL)</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Anything else? Timeline, special handling, supplier address…"
                            className="bg-background text-foreground border-2 border-background min-h-[96px] resize-none rounded-none font-sans"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-accent" />
                      </FormItem>
                    )}
                  />

                  {submitError && (
                    <div className="border-2 border-accent bg-accent/10 px-4 py-3 text-sm font-mono font-bold text-accent rounded-none uppercase">
                      {submitError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-background h-14 text-sm font-mono font-bold uppercase tracking-wider border-none rounded-none disabled:opacity-70 mt-4"
                  >
                    {isSubmitting ? "Sending…" : "Get my quote"}
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
