'use client';

import { useEffect, useState } from 'react';

interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  scoresStr: string;
  goalConDiff: number;
  pts: number;
}

// Define API Response Type
interface ApiResponse {
  response?: {
    list?: Team[];
  };
}

// Define Props for TeamDetails
interface TeamDetailsProps {
  teamId: string;
}

export default function TeamDetails({ teamId }: TeamDetailsProps) {
  const [homeTeams, setHomeTeams] = useState<Team[]>([]);
  const [awayTeams, setAwayTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeamData() {
      try {
        const apiHeaders = {
          method: 'GET',
          headers: {
            'x-rapidapi-key':
              'a4fef4d77emshc945f174f59df2ap1e008ejsncf9aa79bd3cb',
            'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
          },
        };

        // Fetch Home Teams
        const homeRes = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-list-home-team?leagueid=42',
          apiHeaders,
        );
        const homeData: ApiResponse = await homeRes.json();
        if (homeData.response?.list) {
          setHomeTeams(homeData.response.list);
        }

        // Fetch Away Teams
        const awayRes = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-list-away-team?leagueid=42',
          apiHeaders,
        );
        const awayData: ApiResponse = await awayRes.json();
        if (awayData.response?.list) {
          setAwayTeams(awayData.response.list);
        }
      } catch (err) {
        setError('Error fetching team data.');
        console.error('Error fetching team data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeamData().catch((err) =>
      console.error('Unhandled async error in fetchTeamData:', err),
    );
  }, [teamId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading teams...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md text-center">
      <h1 className="text-2xl font-bold mb-4">Team Information</h1>

      {/* Home Teams */}
      <h2 className="text-lg font-semibold mt-6">Home Teams</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {homeTeams.map((team) => (
          <li
            key={`team-${team.id}`}
            className="border p-4 rounded-md shadow-md"
          >
            <img
              src={team.logo}
              alt={team.name}
              className="w-16 h-16 mx-auto mb-2"
            />
            <p className="font-semibold">{team.name}</p>
            <p className="text-gray-500">
              Played: {team.played} | Wins: {team.wins} | Draws: {team.draws} |
              Losses: {team.losses}
            </p>
          </li>
        ))}
      </ul>

      {/* Away Teams */}
      <h2 className="text-lg font-semibold mt-6">Away Teams</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {awayTeams.map((team) => (
          <li
            key={`team-${team.id}`}
            className="border p-4 rounded-md shadow-md"
          >
            <img
              src={team.logo}
              alt={team.name}
              className="w-16 h-16 mx-auto mb-2"
            />
            <p className="font-semibold">{team.name}</p>
            <p className="text-gray-500">
              Played: {team.played} | Wins: {team.wins} | Draws: {team.draws} |
              Losses: {team.losses}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
