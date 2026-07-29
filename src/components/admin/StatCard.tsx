import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  description: string;
  icon: LucideIcon;
}

function StatCard({ label, value, description, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-gray-900">{label}</h3>
        <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
          <Icon size={18} className="text-[#2F6844]" aria-hidden="true" />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default StatCard;