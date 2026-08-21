import Link from "next/link";
import { FileText } from "lucide-react";

export default function AdminBlogPage() {
  return (
    <div>
      <h1 className="font-[Cormorant_Garamond] text-3xl text-obsidian font-light mb-6">Blog Management</h1>
      <p className="font-[Manrope] text-sm text-olive/60 mb-6">Manage insights and guide articles. Blog posts can be created and edited through the database.</p>
      <Link href="/insights" className="inline-flex items-center gap-2 px-4 py-2 bg-forest text-sand font-[Manrope] text-xs tracking-[0.1em] uppercase">
        <FileText size={14} /> View Published Posts
      </Link>
    </div>
  );
}
