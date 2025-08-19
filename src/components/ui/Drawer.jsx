export default function Drawer({ isOpen, onClose, title, children }) {
  return (
    <>
      {/* ✅ Overlay avec click mais SANS background opaque */}
      <div
        className={`fixed inset-0 z-40 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      {/* ✅ Drawer Panel à droite */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-full p-4">{children}</div>
      </div>
    </>
  );
}
