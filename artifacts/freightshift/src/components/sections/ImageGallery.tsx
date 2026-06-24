import { motion } from "framer-motion";
import img1 from "@/assets/port-cranes.png";
import img2 from "@/assets/logo-on-glass.jpeg";
import img3 from "@/assets/warehouse-team-highfive.png";
import img4 from "@/assets/warehouse-team-tablet.png";

const images = [
  { src: img4, alt: "Warehouse team using tablet", span: "md:col-span-2 md:row-span-2" },
  { src: img2, alt: "FreightShift logo on glass office door", span: "md:col-span-1 md:row-span-1" },
  { src: img1, alt: "Port cranes moving containers", span: "md:col-span-1 md:row-span-1" },
  { src: img3, alt: "Warehouse team high five", span: "md:col-span-2 md:row-span-1" },
];

export function ImageGallery() {
  return (
    <section className="py-16 md:py-24 bg-zinc-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center md:text-left">
          <span className="text-brand-orange font-semibold tracking-widest uppercase text-xs">Inside FreightShift</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Real Operations. Real People.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
