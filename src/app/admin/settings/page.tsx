import { PHONE_NUMBER, INSTAGRAM_HANDLE, WHATSAPP_NUMBER } from "@/lib/constants";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="font-[Cormorant_Garamond] text-3xl text-obsidian font-light mb-6">Settings</h1>
      <div className="max-w-lg space-y-6">
        <div className="border border-olive/10 p-6 bg-white">
          <h2 className="font-[Manrope] text-sm font-semibold text-obsidian mb-4">Contact Information</h2>
          <div className="space-y-3 font-[Manrope] text-sm text-olive/70">
            <p>WhatsApp: +91 8208337147</p>
            <p>Phone: {PHONE_NUMBER}</p>
            <p>Instagram: {INSTAGRAM_HANDLE}</p>
          </div>
        </div>
        <div className="border border-olive/10 p-6 bg-white">
          <h2 className="font-[Manrope] text-sm font-semibold text-obsidian mb-4">Admin Access</h2>
          <p className="font-[Manrope] text-xs text-olive/50">Admin panel is accessible at /admin. Configure authentication as needed.</p>
        </div>
        <div className="bg-sand border border-olive/10 p-4">
          <p className="font-[Manrope] text-xs text-olive/70">Settings can be extended to store configurable values in the website_settings database table.</p>
        </div>
      </div>
    </div>
  );
}
