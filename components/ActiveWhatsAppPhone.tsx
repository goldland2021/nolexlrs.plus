"use client";

import { useEffect, useState } from "react";
import { whatsAppDisplayPhone } from "@/lib/whatsapp";

export default function ActiveWhatsAppPhone() {
  const [phone, setPhone] = useState(whatsAppDisplayPhone);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/support-contact", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        const displayPhone = data?.active?.displayPhone;
        if (!cancelled && typeof displayPhone === "string" && displayPhone) {
          setPhone(displayPhone);
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return <>{phone}</>;
}
