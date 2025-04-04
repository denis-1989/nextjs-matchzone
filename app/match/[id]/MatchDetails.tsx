'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Badge } from '../../../components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';

interface MatchDetailsData {
  matchId: string;
  matchName: string;
  matchTimeUTC: string;
  homeTeam: { name: string; id: number };
  awayTeam: { name: string; id: number };
  leagueName: string;
  status?: { started?: boolean; finished?: boolean };
}

interface ApiResponse {
  status: string;
  response?: {
    detail?: MatchDetailsData;
  };
}

export default function MatchDetails() {
  const { id } = useParams();
  const matchId = Array.isArray(id) ? id[0] : id;

  const [match, setMatch] = useState<MatchDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatchDetails = useCallback(async () => {
    if (!matchId) {
      setError('Invalid match ID.');
      return;
    }

    try {
      const res = await fetch(
        `https://free-api-live-football-data.p.rapidapi.com/football-get-match-detail?eventid=${matchId}`,
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
        throw new Error(`Failed to fetch match details: ${res.status}`);
      }

      const data: ApiResponse = await res.json();
      if (!data.response?.detail) {
        throw new Error('Match not found.');
      }

      setMatch(data.response.detail);
    } catch (err) {
      setError('Error fetching match details.');
      console.error('Error fetching match details:', err);
    } finally {
      setLoading(false);
    }
  }, [matchId]);

  useEffect(() => {
    fetchMatchDetails().catch((err) =>
      console.error('Unhandled async error:', err),
    );
  }, [fetchMatchDetails]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading match details...</p>
    );
  }

  if (error || !match) {
    return (
      <p className="text-center text-red-500">{error || 'Match not found.'}</p>
    );
  }

  return (
    <div
      className="p-12 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/team-header1.jpg')" }}
    >
      <div className="max-w-3xl mx-auto">
        <Card className="bg-white/90 shadow-xl rounded-xl border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl font-extrabold text-blue-1000">
              {match.homeTeam.name} vs {match.awayTeam.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 text-center">
            <Badge
              variant="outline"
              className="text-sm border border-blue-900 text-blue-1000"
            >
              League: {match.leagueName}
            </Badge>

            <Separator className="my-2" />

            <p className="text-md text-gray-800">
              <span className="font-medium">Match Time:</span>{' '}
              {match.matchTimeUTC}
            </p>

            {match.status?.started && !match.status.finished && (
              <Badge className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 text-sm">
                LIVE
              </Badge>
            )}

            {match.status?.finished && (
              <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 text-sm">
                MATCH FINISHED
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
