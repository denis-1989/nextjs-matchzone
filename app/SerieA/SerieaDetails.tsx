'use client';

import { useEffect, useState } from 'react';

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

// API Response Type
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

        // Fetch Overall Standings
        const overallRes = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-standing-all?leagueid=55',
          apiHeaders,
        );
        const overallData: ApiResponse = await overallRes.json();
        if (overallData.response?.standing) {
          setStandings(overallData.response.standing);
        }

        // Fetch Home Standings
        const homeRes = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-standing-home?leagueid=55',
          apiHeaders,
        );
        const homeData: ApiResponse = await homeRes.json();
        if (homeData.response?.standing) {
          setHomeStandings(homeData.response.standing);
        }

        // Fetch Away Standings
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
        console.error('Error fetching Serie A standings:', err);
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
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Serie A Standings
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg">
          <thead>
            <tr className="bg-gray-900 text-white text-center">
              <th className="border p-3">#</th>
              <th className="border p-3 text-left">Team</th>
              <th className="border p-3">Overall Played</th>
              <th className="border p-3">Overall Points</th>
              <th className="border p-3">Home Played</th>
              <th className="border p-3">Home Points</th>
              <th className="border p-3">Away Played</th>
              <th className="border p-3">Away Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => {
              const homeTeam = homeStandings.find((t) => t.id === team.id);
              const awayTeam = awayStandings.find((t) => t.id === team.id);

              let rowClass = 'bg-gray-50';
              if (index < 4) {
                rowClass = 'bg-green-300';
              } else if (index === 4) {
                rowClass = 'bg-red-200';
              } else if (index === 5) {
                rowClass = 'bg-yellow-600/20';
              } else if (index >= standings.length - 3) {
                rowClass = 'bg-red-400';
              }

              return (
                <tr
                  key={`team-${team.id}`}
                  className={`${rowClass} text-center hover:bg-gray-200 transition`}
                >
                  <td className="border p-3 font-semibold text-gray-700">
                    {index + 1}
                  </td>
                  <td className="border p-3 text-left">
                    <a
                      href={`https://example.com${team.pageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      {team.name}
                    </a>
                  </td>
                  <td className="border p-3">{team.played}</td>
                  <td className="border p-3 font-bold text-gray-800">
                    {team.pts}
                  </td>
                  <td className="border p-3">{homeTeam?.played || '-'}</td>
                  <td className="border p-3 font-bold text-gray-800">
                    {homeTeam?.pts || '-'}
                  </td>
                  <td className="border p-3">{awayTeam?.played || '-'}</td>
                  <td className="border p-3 font-bold text-gray-800">
                    {awayTeam?.pts || '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
