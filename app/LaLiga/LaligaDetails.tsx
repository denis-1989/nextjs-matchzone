'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

interface Team {
  id: number;
  name: string;
  shortName: string;
  pageUrl: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  scoresStr: string;
  goalConDiff: number;
  pts: number;
}

interface ApiResponse {
  response?: {
    standing?: Team[];
  };
}

export default function LaLiga() {
  const [standings, setStandings] = useState<Team[]>([]);
  const [homeStandings, setHomeStandings] = useState<Team[]>([]);
  const [awayStandings, setAwayStandings] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStandings() {
      try {
        const apiHeaders = {
          method: 'GET',
          headers: {
            'x-rapidapi-key':
              'a4fef4d77emshc945f174f59df2ap1e008ejsncf9aa79bd3cb',
            'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
          },
        };

        const [overallRes, homeRes, awayRes] = await Promise.all([
          fetch(
            'https://free-api-live-football-data.p.rapidapi.com/football-get-standing-all?leagueid=87',
            apiHeaders,
          ),
          fetch(
            'https://free-api-live-football-data.p.rapidapi.com/football-get-standing-home?leagueid=87',
            apiHeaders,
          ),
          fetch(
            'https://free-api-live-football-data.p.rapidapi.com/football-get-standing-away?leagueid=87',
            apiHeaders,
          ),
        ]);

        const overallData: ApiResponse = await overallRes.json();
        const homeData: ApiResponse = await homeRes.json();
        const awayData: ApiResponse = await awayRes.json();

        if (overallData.response?.standing) {
          setStandings(overallData.response.standing);
        }
        if (homeData.response?.standing) {
          setHomeStandings(homeData.response.standing);
        }
        if (awayData.response?.standing) {
          setAwayStandings(awayData.response.standing);
        }
      } catch (err) {
        setError('Error fetching La Liga standings.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStandings().catch((err) =>
      console.error('Unhandled async error:', err),
    );
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading La Liga standings...</p>
    );
  }

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="p-12 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/team-header1.jpg')" }}
    >
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl md:text-3xl font-bold text-gray-800">
              La Liga Standings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-md">
              <table className="min-w-full text-sm border border-gray-200 shadow-sm">
                <thead className="bg-gray-800 text-white text-center">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3 text-left">Team</th>
                    <th className="p-3">Played</th>
                    <th className="p-3">Points</th>
                    <th className="p-3">Home</th>
                    <th className="p-3">Home Pts</th>
                    <th className="p-3">Away</th>
                    <th className="p-3">Away Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team, index) => {
                    const home = homeStandings.find((t) => t.id === team.id);
                    const away = awayStandings.find((t) => t.id === team.id);

                    let rowClass = '';
                    if (index < 4) {
                      rowClass = 'bg-blue-800 text-white';
                    } else if (index === 4) {
                      rowClass = 'bg-orange-500 text-white';
                    } else if (index === 5) {
                      rowClass = 'bg-yellow-400';
                    } else if (index >= standings.length - 3) {
                      rowClass = 'bg-red-600 text-white';
                    }

                    return (
                      <tr
                        key={`team-${team.id}`}
                        className={`${rowClass} text-center hover:bg-gray-100 transition`}
                      >
                        <td className="p-3 font-semibold">{index + 1}</td>
                        <td className="p-3 text-left font-medium">
                          <a
                            href={`https://example.com${team.pageUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {team.name}
                          </a>
                        </td>
                        <td className="p-3">{team.played}</td>
                        <td className="p-3 font-bold">{team.pts}</td>
                        <td className="p-3">{home?.played || '-'}</td>
                        <td className="p-3 font-bold">{home?.pts || '-'}</td>
                        <td className="p-3">{away?.played || '-'}</td>
                        <td className="p-3 font-bold">{away?.pts || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-sm text-gray-800 space-y-2">
              <p className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 bg-blue-800 rounded-sm" />
                <strong>Champions League Qualification</strong>
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 bg-orange-500 rounded-sm" />
                <strong>Europa League Qualification</strong>
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 bg-yellow-400 rounded-sm" />
                <strong>Conference League Qualification</strong>
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 bg-red-600 rounded-sm" />
                <strong>Relegation Zone</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
