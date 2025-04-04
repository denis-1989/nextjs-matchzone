'use client';

import { useEffect, useState } from 'react';
import { Badge } from '../../../components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';

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

interface ApiResponse {
  response?: {
    list?: Team[];
  };
}

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

        const homeRes = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-list-home-team?leagueid=42',
          apiHeaders,
        );
        const homeData: ApiResponse = await homeRes.json();
        if (homeData.response?.list) {
          setHomeTeams(homeData.response.list);
        }

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
    <div
      className="p-12 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/team-header1.jpg')" }}
    >
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl md:text-3xl font-bold text-gray-800">
              Team Match Details
            </CardTitle>
          </CardHeader>

          <CardContent>
            <section className="mb-8">
              <h2 className="text-xl font-bold text-blue-700 mb-4 border-b pb-2">
                Home Matches
              </h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {homeTeams.map((team) => (
                  <li key={`home-${team.id}`}>
                    <Card className="text-center p-4 hover:shadow-md transition">
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-16 h-16 mx-auto mb-2"
                      />
                      <p className="font-semibold mb-1 text-gray-800">
                        {team.name}
                      </p>
                      <div className="flex flex-wrap gap-1 justify-center text-sm text-gray-600 mt-2">
                        <Badge variant="outline">Played: {team.played}</Badge>
                        <Badge variant="outline">Wins: {team.wins}</Badge>
                        <Badge variant="outline">Draws: {team.draws}</Badge>
                        <Badge variant="outline">Losses: {team.losses}</Badge>
                        <Badge variant="default">Points: {team.pts}</Badge>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            </section>

            <Separator className="my-6" />

            <section>
              <h2 className="text-xl font-bold text-blue-700 mb-4 border-b pb-2">
                Away Matches
              </h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {awayTeams.map((team) => (
                  <li key={`away-${team.id}`}>
                    <Card className="text-center p-4 hover:shadow-md transition">
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-16 h-16 mx-auto mb-2"
                      />
                      <p className="font-semibold mb-1 text-gray-800">
                        {team.name}
                      </p>
                      <div className="flex flex-wrap gap-1 justify-center text-sm text-gray-600 mt-2">
                        <Badge variant="outline">Played: {team.played}</Badge>
                        <Badge variant="outline">Wins: {team.wins}</Badge>
                        <Badge variant="outline">Draws: {team.draws}</Badge>
                        <Badge variant="outline">Losses: {team.losses}</Badge>
                        <Badge variant="default">Points: {team.pts}</Badge>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
