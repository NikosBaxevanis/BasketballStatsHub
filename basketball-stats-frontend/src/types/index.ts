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
  username?: string;
  email: string;
  role: string;
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

export interface LeagueStatsType {
  leagueAPG: number;
  leaguePPG: number;
  leagueRPG: number;
  leagueTOPG: number;
  leagueSPG: number;
  leagueBPG: number;
}

export type Team = {
  _id?: string;
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

export type Player = {
  _id?: string;
  name: string;
  team:
    | {
        _id: string;
        name: string;
      }
    | string; // if populated it's an object, else just the ObjectId
  position?: string;
  height?: number;
  weight?: number;
  points: number;
  assists: number;
  rebounds: number;
  offensiveRebounds: number;
  defensiveRebounds: number;
  blocks: number;
  steals: number;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  threePointsMade: number;
  threePointsAttempted: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  turnovers: number;
  personalFouls: number;
  minutesPlayed: number;
};

export type PlayersPayloadType = {
  search: string;
  page: number;
  limit: number;
  sort: string;
  order: string;
};

export type PlayersResponseType = {
  data: Player[];
  total: number;
  page: number;
  pages: number;
};

export type LeagueLeaderType = { leader: string; value: number; team: string };

export type LeagueLeadersResponseType = {
  PPG: LeagueLeaderType;
  RPG: LeagueLeaderType;
  APG: LeagueLeaderType;
  FGPercent: LeagueLeaderType;
  ThreePtPercent: LeagueLeaderType;
  FTPercent: LeagueLeaderType;
};
