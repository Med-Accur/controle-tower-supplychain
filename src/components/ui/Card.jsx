// src/components/ui/Card.jsx
export default function Card({
  title,
  value,
  icon = null,
  className = "",
}) {
  return (
    <div
      className={`rounded-2xl border border-[#D6D6D6] bg-[#F9FAFB] p-5 shadow-sm md:p-6 ${className}`}
    >
      {icon && (
        <div className="flex items-center justify-center w-12 h-12 bg-[#f0eee9] rounded-xl">
          {/* Si icon est un composant React ou JSX */}
          <div className="text-[#A79882] text-xl">{icon}</div>
        </div>
      )}

      {(title || value) && (
        <div className="flex items-end justify-between mt-5">
          <div>
            {title && <span className="text-sm text-gray-500">{title}</span>}
            {value && (
              <h4 className="mt-2 font-bold text-gray-800 text-xl">{value}</h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
