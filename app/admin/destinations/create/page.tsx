"use client";

import React from "react";
import DestinationForm from "@/components/admin/DestinationForm";

export default function CreateDestinationPage() {
  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      <DestinationForm isEdit={false} />
    </div>
  );
}
