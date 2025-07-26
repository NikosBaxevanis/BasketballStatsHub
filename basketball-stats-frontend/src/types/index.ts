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
