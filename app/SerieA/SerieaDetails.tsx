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

export default function SeriaA() {
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

        const overallRes = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-standing-all?leagueid=55',
          apiHeaders,
        );
        const overallData: ApiResponse = await overallRes.json();
        if (overallData.response?.standing) {
          setStandings(overallData.response.standing);
        }

        const homeRes = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-standing-home?leagueid=55',
          apiHeaders,
        );
        const homeData: ApiResponse = await homeRes.json();
        if (homeData.response?.standing) {
          setHomeStandings(homeData.response.standing);
        }

        const awayRes = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-standing-away?leagueid=55',
          apiHeaders,
        );
        const awayData: ApiResponse = await awayRes.json();
        if (awayData.response?.standing) {
          setAwayStandings(awayData.response.standing);
        }
      } catch (err) {
        setError('Error fetching Serie A standings.');
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
      <p className="text-center text-gray-500">Loading Serie A standings...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div
      className="p-12 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/team-header1.jpg')" }}
    >
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl md:text-3xl font-bold text-gray-800">
              Serie A Standings
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
                    <th className="p-3">Home Played</th>
                    <th className="p-3">Home Points</th>
                    <th className="p-3">Away Played</th>
                    <th className="p-3">Away Points</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team, index) => {
                    const homeTeam = homeStandings.find(
                      (t) => t.id === team.id,
                    );
                    const awayTeam = awayStandings.find(
                      (t) => t.id === team.id,
                    );

                    let rowClass = '';
                    if (index < 4) {
                      rowClass = 'bg-green-100';
                    } else if (index === 4) {
                      rowClass = 'bg-yellow-100';
                    } else if (index >= standings.length - 3) {
                      rowClass = 'bg-red-100';
                    }

                    return (
                      <tr
                        key={`team-${team.id}`}
                        className={`${rowClass} text-center hover:bg-gray-100 transition`}
                      >
                        <td className="p-3 font-semibold text-gray-700">
                          {index + 1}
                        </td>
                        <td className="p-3 text-left font-medium text-blue-700">
                          <a
                            href={`https://example.com${team.pageUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {team.name}
                          </a>
                        </td>
                        <td className="p-3 text-gray-700">{team.played}</td>
                        <td className="p-3 font-semibold text-gray-800">
                          {team.pts}
                        </td>
                        <td className="p-3 text-gray-600">
                          {homeTeam?.played || '-'}
                        </td>
                        <td className="p-3 font-semibold text-gray-700">
                          {homeTeam?.pts || '-'}
                        </td>
                        <td className="p-3 text-gray-600">
                          {awayTeam?.played || '-'}
                        </td>
                        <td className="p-3 font-semibold text-gray-700">
                          {awayTeam?.pts || '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
