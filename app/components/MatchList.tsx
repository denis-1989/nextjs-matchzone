'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge } from '../../components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

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

      if (!res.ok) {
        throw new Error('API not working');
      }

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
    fetchMatches().catch((error) =>
      console.error('Unhandled async error:', error),
    );
  }, []);

  return (
    <div
      className="p-12 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/team-header1.jpg')" }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Live & Upcoming Matches</CardTitle>
        </CardHeader>
        <CardContent>
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
                    className="block border p-4 rounded-md shadow hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        {match.home.longName}
                      </span>
                      <span className="text-sm text-gray-600">
                        {match.status.scoreStr}
                      </span>
                      <span className="font-semibold text-gray-800">
                        {match.away.longName}{' '}
                        {match.status.liveTime?.long || ''}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1 flex gap-2 flex-wrap">
                      <Badge variant="outline">
                        Stage: {match.tournamentStage}
                      </Badge>
                      <Badge variant="secondary">
                        League ID: {match.leagueId}
                      </Badge>
                      <Badge variant="default">
                        {match.status.started
                          ? `Live: ${match.status.liveTime?.long || 'In Progress'}`
                          : match.status.finished
                            ? 'Match Finished'
                            : `Scheduled: ${match.status.utcTime || 'Unknown Time'}`}
                      </Badge>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
