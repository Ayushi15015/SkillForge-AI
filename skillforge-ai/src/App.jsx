import "./App.css";
import {Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound";
import ResumeImprover from "./pages/ResumeImprover.jsx";
import InterviewGenerator from "./pages/InterviewGenerator.jsx";
import MockInterview from "./pages/MockInterview.jsx";
import History from "./pages/History.jsx";
import Profile from "./pages/Profile.jsx";


function App() {
  return(
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume-improver" element={<ResumeImprover />} />
          <Route path="/interview-generator" element={<InterviewGenerator />} />
          <Route path="/mock-interview" element={<MockInterview />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>


      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default App;

