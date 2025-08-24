import { Team, TeamsPayloadType, TeamsResponseType } from "../../types";
import { axiosInstance } from "../axiosInstance";

export const fetchTeams = async ({
  search,
  page,
  limit,
  sort,
  order,
}: TeamsPayloadType): Promise<TeamsResponseType> => {
  const res = await axiosInstance.get("/api/teams", {
    params: {
      search,
      page,
      limit,
      sort,
      order,
    },
  });
  return res.data;
};

export const createTeam = async (team: Team) => {
  const { data } = await axiosInstance.post("/api/teams", team);
  return data;
};
