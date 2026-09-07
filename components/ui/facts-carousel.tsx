"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ShieldCheck, Zap, Blocks, FileText, Lock, Gauge, Cpu, Activity } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface FactMetric {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface FactsCarouselProps {
  heading?: string;
  facts?: FactMetric[];
  className?: string;
}

export const defaultFacts: FactMetric[] = [
  {
    id: "fact-1",
    value: "99.8%",
    label: "Tamper Detection Rate",
    icon: <ShieldCheck className="h-4 w-4 text-blue-600" />,
  },
  {
    id: "fact-2",
    value: "< 450ms",
    label: "Verification Latency",
    icon: <Zap className="h-4 w-4 text-blue-600" />,
  },
  {
    id: "fact-3",
    value: "100%",
    label: "Immutable Hash Trail",
    icon: <Blocks className="h-4 w-4 text-blue-600" />,
  },
  {
    id: "fact-4",
    value: "1.2M+",
    label: "Documents Secured",
    icon: <FileText className="h-4 w-4 text-blue-600" />,
  },
  {
    id: "fact-5",
    value: "0 False Positives",
    label: "Cryptographic Ground Truth",
    icon: <Lock className="h-4 w-4 text-blue-600" />,
  },
  {
    id: "fact-6",
    value: "Sub-Second",
    label: "Statutory Consensus Time",
    icon: <Gauge className="h-4 w-4 text-blue-600" />,
  },
  {
    id: "fact-7",
    value: "SHA-256 / Post-Quantum",
    label: "Tamper-Proof Encryption",
    icon: <Cpu className="h-4 w-4 text-blue-600" />,
  },
  {
    id: "fact-8",
    value: "24/7 Live Sync",
    label: "Cross-Institutional Ledger",
    icon: <Activity className="h-4 w-4 text-blue-600" />,
  },
];

export const FactsCarousel = ({
  heading,
  facts = defaultFacts,
  className,
}: FactsCarouselProps) => {
  return (
    <section className={cn("w-full py-4", className)}>
      {heading && (
        <div className="container mx-auto mb-4 flex flex-col items-center text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {heading}
          </p>
        </div>
      )}
      <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center overflow-hidden">
        <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[AutoScroll({ speed: 1.2, playOnInit: true, stopOnInteraction: false })]}
        >
          <CarouselContent className="ml-0">
            {facts.map((fact) => (
              <CarouselItem
                key={fact.id}
                className="flex shrink-0 basis-auto items-center pl-0"
              >
                <div className="mx-3 flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/90 px-5 py-2.5 shadow-sm backdrop-blur transition hover:border-blue-300 hover:shadow-md">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
                    {fact.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-sans text-sm font-extrabold text-slate-900 leading-tight">
                      {fact.value}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {fact.label}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Gradient edge masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
};
