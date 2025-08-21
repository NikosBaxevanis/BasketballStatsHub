import { DashboardStats } from "../../types";
import { axiosInstance } from "../axiosInstance";

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const res = await axiosInstance.get("/api/dashboard");
  return res.data;
};
