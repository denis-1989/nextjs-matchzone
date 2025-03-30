'use client';

import React from 'react';

interface MatchProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  matchTime: string;
  status: string;
}

export default function MatchCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  matchTime,
  status,
}: MatchProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition">
      {/* Status */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-500">{status}</span>
        <span className="text-xs text-gray-400">{matchTime}</span>
      </div>

      {/* Teams and Score */}
      <div className="flex items-center justify-between font-semibold text-sm md:text-base">
        <span className="truncate w-1/3 text-left">{homeTeam}</span>

        <span className="text-center text-blue-700 font-bold text-lg md:text-xl w-1/3">
          {homeScore !== null && awayScore !== null
            ? `${homeScore} - ${awayScore}`
            : 'VS'}
        </span>

        <span className="truncate w-1/3 text-right">{awayTeam}</span>
      </div>
    </div>
  );
}
