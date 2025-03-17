'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Define the expected structure of the match data
interface Match {
  id: number;
  home: {
    longName: string;
  };
  away: {
    longName: string;
  };
  status: {
    scoreStr: string;
    liveTime?: {
      long: string;
    };
    started: boolean;
    finished: boolean;
    utcTime?: string;
  };
  tournamentStage: string;
  leagueId: number;
}

// Define the expected API response structure
interface ApiResponse {
  response: {
    live: Match[];
  };
}

export default function MatchList() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

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

      // Explicitly define data type as ApiResponse
      const data: ApiResponse = await res.json();

      if (!Array.isArray(data.response.live)) {
        throw new Error('No live matches found.');
      }

      setMatches(data.response.live);
    } catch (error) {
      console.error('Error fetching match data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Corrected: Await fetchMatches() and handle errors properly
    fetchMatches().catch((error) =>
      console.error('Unhandled async error in fetchMatches:', error),
    );
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Live & Upcoming Matches</h2>

      {loading ? (
        <p className="text-gray-500">Loading matches...</p>
      ) : matches.length === 0 ? (
        <p className="text-gray-500">No live matches available.</p>
      ) : (
        <ul className="space-y-4">
          {matches.map((match) => (
            <li key={`match-${match.id}`}>
              <Link
                href={`/match/${match.id}`}
                className="block border p-4 rounded-md shadow-md bg-white hover:bg-gray-100 transition"
              >
                <div className="flex justify-between">
                  <span className="font-bold">{match.home.longName}</span>
                  <span>{match.status.scoreStr}</span>
                  <span className="font-bold">
                    {match.away.longName} {match.status.liveTime?.long || ''}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Stage: {match.tournamentStage} | League ID: {match.leagueId}
                </p>
                <p className="text-sm text-gray-500">
                  {match.status.started
                    ? `Live: ${match.status.liveTime?.long || 'In Progress'}`
                    : match.status.finished
                      ? 'Match Finished'
                      : `Scheduled: ${match.status.utcTime || 'Unknown Time'}`}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
