import { Suspense } from "react";
import PropertiesClient from "./PropertiesClient";

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-pearl flex items-center justify-center"><p className="font-[Manrope] text-sm text-olive/40">Loading...</p></div>}>
      <PropertiesClient />
    </Suspense>
  );
}
