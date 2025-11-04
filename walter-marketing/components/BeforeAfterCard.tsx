"use client";

import { X, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BeforeAfterExample {
  id: string;
  title: string;
  scenario: string;
  genericAI: string;
  lifeModelAI: string;
  contextUsed: string[];
}

interface BeforeAfterCardProps {
  example: BeforeAfterExample;
  onShare?: (id: string) => void;
}

export default function BeforeAfterCard({ example, onShare }: BeforeAfterCardProps) {
  return (
    <div className="border rounded-2xl overflow-hidden bg-card">
      {/* Header */}
      <div className="p-6 border-b bg-muted/30">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-grow">
            <h3 className="text-xl font-bold mb-2">{example.title}</h3>
            <p className="text-sm text-muted-foreground">{example.scenario}</p>
          </div>
          {onShare && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare(example.id)}
              className="flex-shrink-0"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Comparison */}
      <div className="grid md:grid-cols-2 divide-x">
        {/* Generic AI */}
        <div className="p-6 bg-muted/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
              <X className="h-5 w-5 text-muted-foreground" />
            </div>
            <h4 className="font-semibold text-muted-foreground">Generic AI</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {example.genericAI}
          </p>
        </div>

        {/* Life Model AI */}
        <div className="p-6 bg-[#E2C379]/5">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E2C379]/20">
              <Check className="h-5 w-5 text-[#E2C379]" />
            </div>
            <h4 className="font-semibold text-[#E2C379]">Life Model AI</h4>
          </div>
          <p className="text-sm leading-relaxed">
            {example.lifeModelAI}
          </p>
        </div>
      </div>

      {/* Context Callout */}
      <div className="p-6 border-t bg-[#E2C379]/10">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-1 h-full bg-[#E2C379] rounded-full"></div>
          <div>
            <h5 className="font-semibold text-sm mb-2">What context made the difference:</h5>
            <div className="flex flex-wrap gap-2">
              {example.contextUsed.map((context, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#E2C379]/20 text-[#E2C379] border border-[#E2C379]/30"
                >
                  {context}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
