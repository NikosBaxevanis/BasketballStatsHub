import React from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardStats } from "../types";
import { fetchDashboardStats } from "../api/endpoints/dashboard";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu";
import MainContent from "../components/MainContent";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
    staleTime: 1000 * 60, // 1 minute cache
  });

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError)
    return <p>{(error as any)?.message || "Failed to load dashboard"}</p>;

  const { activePlayers, seasonAvgPPG, gamesPlayed, totalTeams } = data ?? {};

  return (
    <div>
      <HeaderMenu />
      <MainContent className="gap-[80px]">
        <div className="text-center">
          <h2 className="text-slate-900 text-2xl font-bold mb-2">
            Welcome to Basketball Stats Hub
          </h2>
          <p className="text-slate-500 text-lg">
            Track teams, players, and comprehensive basketball statistics all in
            one place
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 w-full">
          <div className="stat-card">
            <h3>Total Teams</h3>
            <div className="number">{totalTeams}</div>
          </div>
          <div className="stat-card">
            <h3>Active Players</h3>
            <div className="number">{activePlayers}</div>
          </div>
          <div className="stat-card">
            <h3>Games Played</h3>
            <div className="number">{gamesPlayed}</div>
          </div>
          <div className="stat-card">
            <h3>Season Average PPG</h3>
            <div className="number">{seasonAvgPPG}</div>
          </div>
        </div>
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 text-center">
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Team Management</h3>
            <p>
              Comprehensive team statistics, records, and performance metrics
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Player Profiles</h3>
            <p>
              Detailed player statistics, career highlights, and performance
              data
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Advanced Analytics</h3>
            <p>In-depth statistical analysis and performance comparisons</p>
          </div>
        </div>
      </MainContent>
    </div>
  );
};

export default Dashboard;
