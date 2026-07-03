export default function DashboardCard({
  title,
  value,
  icon,
  highlight,
  onClick,
}) {
  return (
    <div
      onClick={onClick} // ✅ clickable
      className={`border rounded-md bg-white px-4 py-2 cursor-pointer
        ${highlight ? "border-amber-400 bg-amber-50" : "border-gray-300"}
        hover:shadow-md transition
      `}
    >
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="leading-tight">
          <p className="text font-medium text-gray-600 py-2">{title}</p>
          <p className="text-xl font-semibold text-gray-900">{value}</p>
        </div>

        {/* Right Icon */}
        {icon && (
          <div
            className={`p-1.5 rounded py-2
              ${highlight ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}
          >
            {icon}
          </div>
        )}
      </div>

      {highlight && (
        <span className="text-[10px] text-amber-700">Action required</span>
      )}
    </div>
  );
}
