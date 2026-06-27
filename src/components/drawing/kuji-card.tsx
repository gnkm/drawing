import type { Kuji } from "@/lib/drawing/kuji";

export function KujiCard({ kuji }: { kuji: Kuji }) {
  return (
    <li>
      <div className="p-4 rounded-lg" style={{ backgroundColor: kuji.color }}>
        <p className="text-sm font-medium">{kuji.label}</p>
      </div>
      <button type="button" className="text-sm text-red-500">
        Remove
      </button>
    </li>
  );
}
