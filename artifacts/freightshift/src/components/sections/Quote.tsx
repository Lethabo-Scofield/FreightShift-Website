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
    <section id="quote" className="py-14 md:py-32 bg-muted border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-2 lg:sticky lg:top-32"
          >
            <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">
              Request a Quote
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Clear rates. No surprises.
            </h2>

            <ul className="space-y-6 mb-10">
              <li className="flex gap-4">
                <div className="mt-1">
                  <Calculator className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Transparent pricing</h4>
                  <p className="text-sm text-foreground/70">
                    Origin, freight, and destination charges, itemised.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1">
                  <Clock className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Reply within 24 hours</h4>
                  <p className="text-sm text-foreground/70">Usually faster on WhatsApp.</p>
                </div>
              </li>
            </ul>

            <div className="p-6 bg-white border border-border/60 rounded-2xl space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-foreground/50 mb-2">
                Need help now?
              </h4>
              <a
                href="https://wa.me/message/EVTMLWYQY2OCG1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-brand-orange transition-colors font-medium"
              >
                <FaWhatsapp className="w-5 h-5 text-green-500" />
                WhatsApp Us
              </a>
              <a
                href="tel:+27681095543"
                className="flex items-center gap-3 text-foreground hover:text-brand-orange transition-colors font-medium"
              >
                <Phone className="w-5 h-5 text-brand-blue" />
                068 109 5543
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-3 bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-border/40"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Request received</h3>
                <p className="text-foreground/70 mb-8 max-w-sm mx-auto">
                  We'll send your rate within 24 hours.
                </p>
                <Button
                  onClick={() => {
                    form.reset();
                    setIsSubmitted(false);
                  }}
                  variant="outline"
                  className="font-medium"
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
                        <FormLabel className="text-foreground font-semibold">
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
                                className="flex items-center gap-3 border-2 border-border/60 p-4 rounded-xl cursor-pointer hover:border-brand-blue/50 transition-colors m-0 font-medium has-[button[data-state=checked]]:border-brand-blue has-[button[data-state=checked]]:bg-brand-blue/5 has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-brand-blue/40 has-[button:focus-visible]:ring-offset-2"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value="sea"
                                    aria-label="Sea Freight"
                                    className="absolute opacity-0 pointer-events-none"
                                  />
                                </FormControl>
                                <Anchor className="w-5 h-5 text-brand-blue" />
                                Sea Freight
                              </FormLabel>
                            </FormItem>
                            <FormItem className="m-0">
                              <FormLabel
                                className="flex items-center gap-3 border-2 border-border/60 p-4 rounded-xl cursor-pointer hover:border-brand-blue/50 transition-colors m-0 font-medium has-[button[data-state=checked]]:border-brand-blue has-[button[data-state=checked]]:bg-brand-blue/5 has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-brand-blue/40 has-[button:focus-visible]:ring-offset-2"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value="air"
                                    aria-label="Air Freight"
                                    className="absolute opacity-0 pointer-events-none"
                                  />
                                </FormControl>
                                <Plane className="w-5 h-5 text-brand-blue" />
                                Air Freight
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
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
                          <FormLabel className="text-foreground font-semibold">
                            Pickup in China
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-muted/50 h-12">
                                <SelectValue placeholder="Choose origin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ORIGINS.map((o) => (
                                <SelectItem key={o} value={o}>
                                  {o}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-semibold">
                            Delivery in SA
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-muted/50 h-12">
                                <SelectValue placeholder="Choose destination" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {DESTINATIONS.map((d) => (
                                <SelectItem key={d} value={d}>
                                  {d}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
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
                          <FormLabel className="text-foreground font-semibold">
                            Cargo type
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-muted/50 h-12">
                                <SelectValue placeholder="Choose container or service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cargoOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="goodsType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-semibold">Goods</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-muted/50 h-12">
                                <SelectValue placeholder="What are you shipping?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {GOODS_CATEGORIES.map((g) => (
                                <SelectItem key={g} value={g}>
                                  {g}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
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
                          <FormLabel className="text-foreground font-semibold">
                            Est. weight <span className="text-foreground/40 font-normal">(optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 500 kg" className="bg-muted/50 h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="estVolume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-semibold">
                            Est. volume <span className="text-foreground/40 font-normal">(optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 2 CBM" className="bg-muted/50 h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t border-border/60 pt-6 space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/50">
                      Your details
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold">
                              Full name
                            </FormLabel>
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
                            <FormLabel className="text-foreground font-semibold">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@company.co.za"
                                className="bg-muted/50 h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-semibold">Mobile</FormLabel>
                          <FormControl>
                            <Input placeholder="082 123 4567" className="bg-muted/50 h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-semibold">
                          Notes <span className="text-foreground/40 font-normal">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Anything else? Timeline, special handling, supplier address…"
                            className="bg-muted/50 min-h-[96px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {submitError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white h-14 text-lg mt-2 shadow-lg shadow-brand-orange/20 border-none disabled:opacity-70"
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
