export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Sélectionner...",
  required = false,
  error = "",
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-xs text-neutral-500 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full text-base text-black bg-white py-2 px-2 rounded focus:outline-none focus:border-indigo-600 ${
          error ? "border-b border-red-500" : "border-b border-stone-300"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-black bg-white">
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
