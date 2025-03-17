// This type is used in MatchList.tsx
export interface Match {
  id: number;
  home: { id: number; name: string; longName: string; score: number };
  away: { id: number; name: string; longName: string; score: number };
  leagueId: number;
  tournamentStage: string;
  time: string;
  status: {
    utcTime: string;
    halfs: { firstHalf: number; secondHalf: number };
    finished: boolean;
    started: boolean;
    cancelled: boolean;
    scoreStr: string;
    liveTime?: { long: string };
  };
}

// This type is used for API responses
export interface MatchApiResponse {
  matches: Match[];
}
