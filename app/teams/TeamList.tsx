'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
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
  pts: number;
}

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

    fetchTeams().catch((err) => console.error('Unhandled error:', err));
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading teams...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div
      className="p-12 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/team-header1.jpg')" }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-center">All Teams</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {teams.map((team) => (
              <li key={`team-${team.id}`}>
                <Link href={`/teams/${team.id}`} className="block">
                  <Card className="text-center hover:shadow-lg transition p-4">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-16 h-16 mx-auto mb-2"
                    />
                    <p className="font-semibold mb-1">{team.name}</p>
                    <div className="flex flex-wrap gap-1 justify-center text-sm text-gray-500">
                      <Badge variant="outline">Played: {team.played}</Badge>
                      <Badge variant="outline">Wins: {team.wins}</Badge>
                      <Badge variant="outline">Draws: {team.draws}</Badge>
                      <Badge variant="outline">Losses: {team.losses}</Badge>
                      <Badge variant="default">Points: {team.pts}</Badge>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
