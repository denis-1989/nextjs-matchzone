import type { Match } from '../types/match';

export default function MatchCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  matchTime,
  status,
}: Match) {
  // Use Match Type
  return (
    <div className="border p-4 rounded-md shadow-md bg-white">
      <div className="flex justify-between">
        <span className="font-bold">{homeTeam}</span>
        <span>
          {homeScore !== null ? homeScore : '-'} :{' '}
          {awayScore !== null ? awayScore : '-'}
        </span>
        <span className="font-bold">{awayTeam}</span>
      </div>
      <p className="text-sm text-gray-500">
        {matchTime} | {status}
      </p>
    </div>
  );
}
