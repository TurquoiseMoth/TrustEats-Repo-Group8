import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

interface DashboardPageHeaderProps {
  title: string;
}

function DashboardPageHeader({ title }: DashboardPageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 px-5 py-4 md:bg-secondary md:px-8 md:py-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="md:hidden w-8 h-8 flex items-center justify-center rounded-md text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-xl font-bold text-gray-900 md:text-white md:text-2xl">{title}</h1>
    </div>
  );
}

export default DashboardPageHeader;