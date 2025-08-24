import { Player, PlayersPayloadType, PlayersResponseType } from "../../types";
import { axiosInstance } from "../axiosInstance";

export const fetchPlayers = async ({
  search,
  page,
  limit,
  sort,
  order,
}: PlayersPayloadType): Promise<PlayersResponseType> => {
  const res = await axiosInstance.get("/api/players", {
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

export const createPlayer = async (player: Player) => {
  const { data } = await axiosInstance.post("/api/players", player);
  return data;
};
