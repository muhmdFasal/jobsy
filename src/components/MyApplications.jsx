// import { useEffect, useState } from "react";

// export default function MyApplications() {
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/applications")
//       .then((res) => res.json())
//       .then((data) => setApplications(data))
//       .catch((err) => console.error("Failed to load applications:", err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-yellow-100 py-10 px-4">
//       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
//         <h2 className="text-3xl font-bold mb-6  text-center text-gray-800">
//           📄 My Applications
//         </h2>

//         <div className="space-y-6">
//           {applications.length === 0 ? (
//             <p className="text-center text-gray-500">You haven't applied to any jobs yet.</p>
//           ) : (
//             applications.map((app, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow p-5 border border-gray-200"
//               >
//                 <div className="flex justify-between items-center mb-3">
//                   <h4 className="font-semibold text-lg text-gray-800">
//                     {app.jobTitle}
//                   </h4>
//                   <span className="text-sm text-gray-500">
//                     {new Date(app.appliedAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-2">
//                   Company: <span className="font-medium">{app.companyName}</span>
//                 </p>
//                 <p className="text-sm text-gray-600 mb-2">
//                   Status: <span className="font-semibold text-yellow-600">{app.status}</span>
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   Application ID: {app._id}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function MyApplications() {
//   const [applications, setApplications] = useState([]);

//   const fetchApplications = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return toast.error("Please log in");

//     try {
//       const res = await fetch("http://localhost:5000/api/applications", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setApplications(data);
//       } else {
//         toast.error(data.message || "Failed to load applications");
//       }
//     } catch (err) {
//       toast.error("Network error");
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6 border border-gray-200">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//           📄 My Applications
//         </h2>

//         {applications.length === 0 ? (
//           <p className="text-center text-gray-500">You haven't applied to any jobs yet.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border rounded">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Job Title</th>
//                   <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Company</th>
//                   <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Applied On</th>
//                   <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Status</th>
//                   <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Application ID</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {applications.map((app) => (
//                   <tr key={app._id} className="border-t hover:bg-gray-50">
//                     <td className="px-4 py-2">{app.jobTitle}</td>
//                     <td className="px-4 py-2">{app.companyName}</td>
//                     <td className="px-4 py-2">{new Date(app.appliedAt).toLocaleDateString()}</td>
//                     <td className="px-4 py-2 text-yellow-700 font-medium">{app.status || "Pending"}</td>
//                     <td className="px-4 py-2 text-xs text-gray-500">{app._id}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please log in");

    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setApplications(data);
      } else {
        toast.error(data.message || "Failed to load applications");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          📄 My Applications
        </h2>

        {applications.length === 0 ? (
          <p className="text-center text-gray-500">You haven't applied to any jobs yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Job Title</th>
                  <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Company</th>
                  <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Applied On</th>
                  <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Application ID</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{app.job?.title || "N/A"}</td>
                    <td className="px-4 py-2">{app.job?.company?.name || "N/A"}</td>
                    <td className="px-4 py-2">{new Date(app.appliedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-xs text-gray-500">{app._id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
