import React from "react";

const AdminsModal = ({ open, onClose, admins = [] }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Admins</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {Array.isArray(admins) && admins.length > 0 ? (
          <ul className="space-y-3 max-h-72 overflow-auto">
            {admins.map((a, idx) => (
              <li key={idx} className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium">{a.name || a.fullName || "-"}</div>
                <div className="text-xs text-gray-500">{a.email || "-"}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-500">No admin data available.</div>
        )}

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminsModal;
