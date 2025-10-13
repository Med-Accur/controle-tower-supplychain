import React from "react";

export default function Card({
  title,
  value = "N/A",
  unit,
  icon = null,
  className = "",
}) {
  return (
    <div className={`rounded-2xl border border-[#D6D6D6] bg-[#F9FAFB] p-5 shadow-sm md:p-6 ${className}`}>
      <div className="flex items-center justify-center w-12 h-12 bg-[#f0eee9] rounded-xl">
        <div className="text-[#A79882] text-xl">{icon}</div>
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-md text-gray-500">{title}</span>
            <h4 className="mt-2 font-bold text-[#402363] text-2xl">{value} {unit}</h4>
        </div>
      </div>
    </div>
  );
}
