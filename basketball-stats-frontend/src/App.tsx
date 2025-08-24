import React, { JSX, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { User } from "lucide-react";

import { UserContext, UserProvider } from "./UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import LeagueStats from "./pages/LeagueStats";
import UserMenu from "./components/UserMenu";
import { Toaster } from "react-hot-toast";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? (
    <div className="bg-slate-50 py-8">
      <UserMenu user={user} />
      {children}
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/teams"
              element={
                <PrivateRoute>
                  <Teams />
                </PrivateRoute>
              }
            />
            <Route
              path="/players"
              element={
                <PrivateRoute>
                  <Players />
                </PrivateRoute>
              }
            />
            <Route
              path="/league-stats"
              element={
                <PrivateRoute>
                  <LeagueStats />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
