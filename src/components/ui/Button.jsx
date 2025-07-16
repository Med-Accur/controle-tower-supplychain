// src/components/ui/Button.jsx
export default function Button({
  children,
  onClick,
  type = "button",      
  disabled = false,
  className = "",  
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
