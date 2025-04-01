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

        const overallRes = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-standing-all?leagueid=87',
          apiHeaders,
        );
        const overallData: ApiResponse = await overallRes.json();
        if (overallData.response?.standing) {
          setStandings(overallData.response.standing);
        }

        const homeRes = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-standing-home?leagueid=87',
          apiHeaders,
        );
        const homeData: ApiResponse = await homeRes.json();
        if (homeData.response?.standing) {
          setHomeStandings(homeData.response.standing);
        }

        const awayRes = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-standing-away?leagueid=87',
          apiHeaders,
        );
        const awayData: ApiResponse = await awayRes.json();
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
        <Card className="bg-white/90 backdrop-blur-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl md:text-3xl font-bold text-gray-800">
              La Liga Standings
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gray-900 text-white text-center">
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

                  let bg = 'bg-white';
                  if (index < 4) bg = 'bg-green-100';
                  else if (index === 4) bg = 'bg-yellow-100';
                  else if (index >= standings.length - 3) bg = 'bg-red-100';

                  return (
                    <tr
                      key={`team-${team.id}`}
                      className={`${bg} text-center hover:bg-gray-100 transition`}
                    >
                      <td className="p-3 font-semibold">{index + 1}</td>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
