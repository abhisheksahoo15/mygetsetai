"use client";
import React from "react";
import { PremiumPlaceholder } from "@/components/PremiumPlaceholder";

export default function ServicePage({ params }: { params: any }) {
  // Gracefully handle dynamic params layout
  const unwrappedParams = React.use(params as any) as any;
  const slug = unwrappedParams.slug || "service";
  const formattedTitle = slug.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <PremiumPlaceholder 
      title={`${formattedTitle} Protocol`} 
      description={`Welcome to the dedicated portal for our ${formattedTitle} solutions. Our engineering team is actively scaffolding this premium microservice endpoint.`}
    />
  );
}
