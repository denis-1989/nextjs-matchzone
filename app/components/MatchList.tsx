'use client';

import { useEffect, useState } from 'react';
import type { Match } from '../types/match';

export default function MatchList() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-current-live',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key':
                'a4fef4d77emshc945f174f59df2ap1e008ejsncf9aa79bd3cb',
              'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
            },
          },
        );
        if (!res.ok) throw new Error('Failed to fetch match data');

        const data = await res.json();
        setMatches(data.response.live);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    }

    (async () => {
      await fetchMatches();
    })().catch((error) => console.error('Unhandled async error:', error));
  }, []);

  console.log(matches);
  return (
    <div className="bg-red p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Live & Upcoming Matches</h2>

      {matches.length === 0 ? (
        <p className="text-gray-500">Loading matches...</p>
      ) : (
        <ul className="space-y-4">
          {matches.map((match) => (
            <li key={`match-${match.id}`}>
              <div className="border p-4 rounded-md shadow-md bg-white">
                <div className="flex justify-between">
                  <span className="font-bold">{match.home.longName}</span>
                  <span> {match.status.scoreStr} </span>
                  <span className="font-bold">
                    {match.away.longName} {match.status.liveTime.long}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{match.time}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
