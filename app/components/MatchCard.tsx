import React from 'react';

// Define props for the MatchCard component
interface MatchProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  matchTime: string;
  status: string;
}

// Functional component to display match details
export default function MatchCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  matchTime,
  status,
}: MatchProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      {/* Match Status */}
      <p className="text-sm text-gray-500">{status}</p>

      {/* Teams & Score */}
      <div className="flex justify-between items-center text-lg font-semibold">
        <span>{homeTeam}</span>
        <span className="text-blue-600">
          {homeScore !== null && awayScore !== null
            ? `${homeScore} - ${awayScore}`
            : 'VS'}
        </span>
        <span>{awayTeam}</span>
      </div>

      {/* Match Time */}
      <p className="text-sm text-gray-600 mt-2">{matchTime}</p>
    </div>
  );
}
