export type LoginRequestType = {
  username: string;
  password: string;
};

export type LoginResponseType = {
  user: User;
  token: string;
};

export type RegisterRequestType = {
  username: string;
  password: string;
  role: "admin" | "user" | "player";
};

export type RegisterResponseType = {
  user: User;
  token: string;
};

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface Player {
  _id: string;
  name: string;
  team: string;
}

export interface Match {
  _id: string;
  date: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
}

export interface DashboardStats {
  totalTeams: number;
  activePlayers: number;
  gamesPlayed: number;
  seasonAvgPPG: number;
}

export type Team = {
  id: string;
  name: string;
  city: string;
  founded: number;
  championships: number;
  wins: number;
  defeats: number;
  homeWins: number;
  homeDefeats: number;
};

export type TeamsPayloadType = {
  search: string;
  page: number;
  limit: number;
  sort: string;
  order: string;
};

export type TeamsResponseType = {
  data: Team[];
  total: number;
  page: number;
  pages: number;
};
