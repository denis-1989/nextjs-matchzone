// This type is used in MatchList.tsx (Frontend)
export interface Match {
  id: number;
  home: { longName: string };
  status: { scoreStr: string; liveTime: { long: string } };
  away: { longName: string };
  time: string;
}

// This type is used for API responses
export interface MatchApiResponse {
  matches: Match[];
}
