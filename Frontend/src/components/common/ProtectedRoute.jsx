// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ user, role, children }) {
//   // ⏳ still loading user
//   if (user === null) {
//     return null; // or loader
//   }

//   // ❌ not logged in
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // ❌ role mismatch
//   if (role && user.role !== role) {
//     return <Navigate to="/" replace />;
//   }

//   // ✅ allowed
//   return children;
// }

export default function ProtectedRoute({ children }) {
  return children;
}
