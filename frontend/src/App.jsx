import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
// import Companies from "./components/admin/Companies";
// import CompanyCreate from "./components/admin/CompanyCreate";
// import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AcceptedApplicationsTable from "./components/admin/AcceptedApplicationsTable";
// import PaymentSucces from "./components/admin/PaymentSucces";
// import ScrollToTop from "./components/ScrollToTop";

import Wrapper from "./components/Wrapper";
import EditJobPage from "./components/admin/EditJobPage";
import PaymentSuccess from "./components/PaymentSucess";
import PaymentCancel from "./components/PaymentCancel";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot", element: <ForgotPassword/> },
      { path: "/reset", element: <ResetPassword/> },
      { path: "/jobs", element: <Jobs /> },
      { path: "/description/:id", element: <JobDescription /> },
      { path: "/browse", element: <Browse /> },
      { path: "/profile", element: <Profile /> },
      
      { path: "/payment-success", element: <PaymentSuccess/> },
      { path: "/payment-cancel", element: <PaymentCancel/> },

      // admin routes
      // {
      //   path: "/admin/companies",
      //   element: (
      //     <ProtectedRoute>
      //       <Companies />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/admin/companies/create",
      //   element: (
      //     <ProtectedRoute>
      //       <CompanyCreate />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/admin/companies/:id",
      //   element: (
      //     <ProtectedRoute>
      //       <CompanySetup />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: "/admin/jobs",
        element: (
          <ProtectedRoute>
            <AdminJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/create",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/edit/:id",
        element: (
          <ProtectedRoute>
            <EditJobPage/>
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/admin/jobs/:id/applicants",
      //   element: (
      //     <ProtectedRoute>
      //       <Applicants />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: "/admin/paidGigs",
        element: (
          <ProtectedRoute>
            <AcceptedApplicationsTable />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/payment-success/:applicationId",
      //   element: (
      //     <ProtectedRoute>
      //       <PaymentSucces />
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },
]);


function App() {
  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/free-vector/seamless-gold-rhombus-grid-pattern-black-background_53876-97589.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;