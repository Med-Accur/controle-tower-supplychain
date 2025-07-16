import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children, className = "" }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative ${className}`}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        <div className="text-gray-700">{children}</div>
      </div>
    </div>,
    document.body
  );
}
