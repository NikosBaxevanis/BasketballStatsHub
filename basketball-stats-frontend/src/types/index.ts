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
