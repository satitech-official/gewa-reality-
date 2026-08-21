"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Loader from "@/components/Loader";

export default function PremiumShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const hasVisited = window.sessionStorage.getItem("gewa-intro-seen") === "true";
      setShowLoader(!reducedMotion && !hasVisited);
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            delay: Number(element.dataset.revealDelay || 0),
            overwrite: "auto",
          });
          observer.unobserve(element);
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach((element) => {
      gsap.set(element, { opacity: 0, y: 28 });
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname, ready]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const cursor = document.querySelector<HTMLElement>("[data-luxury-cursor]");
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.24, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.24, ease: "power3.out" });
    const move = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
      cursor.classList.add("is-visible");
    };
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      cursor.classList.toggle("is-active", Boolean(target.closest("a, button, input, select, textarea")));
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  const dismissLoader = () => {
    window.sessionStorage.setItem("gewa-intro-seen", "true");
    setShowLoader(false);
  };

  return (
    <>
      <div data-luxury-cursor className="luxury-cursor" aria-hidden="true" />
      {children}
      {ready && showLoader ? <Loader onFinish={dismissLoader} /> : null}
    </>
  );
}
