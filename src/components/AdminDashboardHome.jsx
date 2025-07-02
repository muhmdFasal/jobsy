const AdminDashboardHome = ({ users = [] }) => {
  return (
    <>
      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-orange-600">{users.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total Jobs</h3>
          <p className="text-3xl font-bold text-orange-600">123</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">New Applications</h3>
          <p className="text-3xl font-bold text-orange-600">27</p>
        </div>
      </section>
    </>
  );
};

export default AdminDashboardHome;
