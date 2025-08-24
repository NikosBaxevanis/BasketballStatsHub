import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardStats } from "../types";
import { fetchDashboardStats } from "../api/endpoints/dashboard";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu";
import MainContent from "../components/MainContent";
import StatCard from "../components/StatCard";
import FeatureCard from "../components/FearureCard";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
    staleTime: 1000 * 60, // 1 minute cache
  });

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.message || "Failed to load teams");
    }
  }, [isError, error]);

  const { activePlayers, seasonAvgPPG, gamesPlayed, totalTeams } = data ?? {};

  const stats = [
    { text: "Total Teams", value: totalTeams },
    { text: "Active Players", value: activePlayers },
    { text: "Games Played", value: gamesPlayed },
    { text: "Season Average PPG", value: seasonAvgPPG },
  ];

  const features = [
    {
      icon: "🏆",
      text: "Team Management",
      value: "Comprehensive team statistics, records, and performance metrics",
    },
    {
      icon: "👤",
      text: "Player Profiles",
      value:
        "Detailed player statistics, career highlights, and performance data",
    },
    {
      icon: "📊",
      text: "Advanced Analytics",
      value: "In-depth statistical analysis and performance comparisons",
    },
  ];

  return (
    <div>
      <HeaderMenu />
      <MainContent className="gap-[80px]">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-slate-900 text-2xl font-bold mb-2">
                Welcome to Basketball Stats Hub
              </h2>
              <p className="text-slate-500 text-lg">
                Track teams, players, and comprehensive basketball statistics
                all in one place
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 w-full">
              {stats.map((stat) => {
                const { text, value } = stat;
                return (
                  <StatCard
                    key={text}
                    text={text}
                    value={value?.toString() ?? ""}
                  />
                );
              })}
            </div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 text-center">
              {features.map((feature) => {
                const { text, value, icon } = feature;
                return (
                  <FeatureCard
                    key={text}
                    text={text}
                    value={value}
                    icon={icon}
                  />
                );
              })}
            </div>
          </>
        )}
      </MainContent>
    </div>
  );
};

export default Dashboard;
