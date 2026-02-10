import React, { useEffect, useState } from "react";
import { getAnalytics } from "../../Services/analyticsService";
import AdminsModal from "./AdminsModal";

const StatCard = ({ label, value, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded shadow p-4 flex-1 ${onClick ? "cursor-pointer hover:shadow-md" : ""}`}
  >
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-semibold mt-2">{value}</div>
  </div>
);

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdminsModal, setShowAdminsModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getAnalytics();
        setData(res);
      } catch (err) {
        setError(err.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-6">Loading analytics...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  const { totalUsers, totalBooks, totalOrders, totalAdmins, topBooks, blogs } = data || {};

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="flex gap-4">
        <StatCard label="Users" value={totalUsers ?? 0} />
        <StatCard label="Books" value={totalBooks ?? 0} />
        <StatCard label="Orders" value={totalOrders ?? 0} />
        <StatCard label="Blogs" value={blogs ?? 0} />
        <StatCard label="Admins" value={totalAdmins ?? 0} onClick={() => setShowAdminsModal(true)} />
      </div>

      <AdminsModal
        open={showAdminsModal}
        onClose={() => setShowAdminsModal(false)}
        admins={data?.admins ?? []}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-3">Top Selling Books</h2>
          {Array.isArray(topBooks) && topBooks.length > 0 ? (
            <div className="space-y-3">
              {(() => {
                const max = Math.max(...topBooks.map(b => b.totalSold));
                return topBooks.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{b.title}</div>
                      <div className="text-xs text-gray-500">Sold: {b.totalSold}</div>
                      <div className="h-2 bg-gray-100 rounded mt-2 overflow-hidden">
                        <div
                          className="h-2 bg-orange-500"
                          style={{ width: `${(b.totalSold / max) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          ) : (
            <div className="text-sm text-gray-500">No sales data</div>
          )}
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-3">Summary</h2>
          <div className="text-sm text-gray-700">
            Total users: <strong>{totalUsers ?? 0}</strong>
          </div>
          <div className="text-sm text-gray-700 mt-2">
            Total books: <strong>{totalBooks ?? 0}</strong>
          </div>
          <div className="text-sm text-gray-700 mt-2">
            Total orders: <strong>{totalOrders ?? 0}</strong>
          </div>
          <div className="text-sm text-gray-700 mt-2">
            Total blogs: <strong>{blogs ?? 0}</strong>
          </div>
          <div className="text-sm text-gray-700 mt-2">
            Total admins: <strong>{totalAdmins ?? 0}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
