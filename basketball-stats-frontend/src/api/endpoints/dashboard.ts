import { DashboardStats, LeagueStatsType } from "../../types";
import { axiosInstance } from "../axiosInstance";

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const res = await axiosInstance.get("/api/dashboard");
  return res.data;
};

export const fetchLeagueStats = async (): Promise<LeagueStatsType> => {
  const res = await axiosInstance.get("/api/dashboard/league-stats");
  return res.data;
};

export const fetchLeagueLeaders =
  async (): Promise<LeagueLeadersResponseType> => {
    const res = await axiosInstance.get("/api/dashboard/leaders");
    return res.data;
  };
