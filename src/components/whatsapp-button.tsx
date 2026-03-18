"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="https://wa.me/5511999999999" // Placeholder phone number
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-colors hover:bg-[#20bd5a]"
        >
          <MessageCircle className="h-8 w-8" />
        </motion.div>
      </Link>
    </div>
  );
}
