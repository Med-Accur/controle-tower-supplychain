export default function Input({
  label,
  type = "text",
  name,
  checked,
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-xs text-neutral-500 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

       {type === "checkbox" && (
            <input
              id={name}
              name={name}
              type="checkbox"
              onChange={onChange}
              required={required}
              className={className}
              checked={checked}
            />
          )}
      {type !== "checkbox" && (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full  text-base text-neutral-700 py-2 focus:outline-none focus:border-indigo-600 ${
          error ? "border-b border-red" : "border-b border-stone-300"
        }`}
        />
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
