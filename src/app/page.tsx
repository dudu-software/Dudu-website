"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserType } from "@/lib/apiUtils";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const type = getUserType();

    if (!type) {
      router.push("/login");
      return;
    }

    if (type === "admin") {
      router.push("/admin");
    } else if (type === "merchant") {
      router.push("/merchant");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
}
