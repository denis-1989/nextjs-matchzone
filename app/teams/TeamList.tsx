'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Define Team Interface
interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  pts: number;
}

// Define API Response Type
interface ApiResponse {
  response?: {
    list?: Team[];
  };
}

export default function TeamList() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeams() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-list-all-team?leagueid=42',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key':
                'a4fef4d77emshc945f174f59df2ap1e008ejsncf9aa79bd3cb',
              'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch teams: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        console.log('API Response:', data);

        if (!data.response?.list) {
          throw new Error('No teams found.');
        }

        setTeams(data.response.list);
      } catch (err) {
        setError((err as Error).message || 'Error fetching teams.');
        console.error('Error fetching teams:', err);
      } finally {
        setLoading(false);
      }
    }

    // FIX: Call fetchTeams and handle errors properly
    fetchTeams().catch((err) => console.error('Unhandled error:', err));
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading teams...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">All Teams</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {teams.map((team) => (
          <li
            key={`team-${team.id}`}
            className="border p-4 rounded-md shadow-md hover:shadow-lg transition"
          >
            <Link href={`/teams/${team.id}`} className="block text-center">
              <img
                src={team.logo}
                alt={team.name}
                className="w-16 h-16 mx-auto mb-2"
              />
              <p className="font-semibold">{team.name}</p>
              <p className="text-sm text-gray-500">
                Played: {team.played} | Wins: {team.wins} | Draws: {team.draws} {' '}
                | Losses: {team.losses} | Points: {team.pts}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
