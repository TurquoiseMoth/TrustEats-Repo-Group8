import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MonthlyApplicationData } from "../../types/application.types";

interface ApplicationsChartProps {
  data: MonthlyApplicationData[];
}

function ApplicationsChart({ data }: ApplicationsChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <h3 className="text-base font-bold text-gray-900 mb-0.5">Applications Overview</h3>
      <p className="text-sm text-gray-500 mb-5">Submitted vs. approved over the last 7 months</p>

      <div className="h-72" role="img" aria-label="Line chart comparing submitted and approved applications from January to July">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="submittedFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5B8C6E" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#5B8C6E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="approvedFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2F6844" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#2F6844" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{ borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 13 }}
            />
            <Area
              type="monotone"
              dataKey="submitted"
              stroke="#5B8C6E"
              strokeWidth={2}
              fill="url(#submittedFill)"
              name="Submitted"
            />
            <Area
              type="monotone"
              dataKey="approved"
              stroke="#2F6844"
              strokeWidth={2}
              fill="url(#approvedFill)"
              name="Approved"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ApplicationsChart;