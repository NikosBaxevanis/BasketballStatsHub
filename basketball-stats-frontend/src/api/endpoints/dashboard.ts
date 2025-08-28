import { DashboardStats, LeagueLeadersResponseType, LeagueStatsType } from "../../types";
import { axiosInstance } from "../axiosInstance";

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const res = await axiosInstance.get("/dashboard");
  return res.data;
};

export const fetchLeagueStats = async (): Promise<LeagueStatsType> => {
  const res = await axiosInstance.get("/dashboard/league-stats");
  return res.data;
};

export const fetchLeagueLeaders =
  async (): Promise<LeagueLeadersResponseType> => {
    const res = await axiosInstance.get("/dashboard/leaders");
    return res.data;
  };
