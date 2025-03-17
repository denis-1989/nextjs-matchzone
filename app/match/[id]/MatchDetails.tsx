'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

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
  const matchId = Array.isArray(id) ? id[0] : id; // Ensure ID is a string

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
      console.log('API Response:', data);

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
    const fetchData = async () => {
      await fetchMatchDetails();
    };

    fetchData().catch((err) => console.error('Unhandled async error:', err));
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
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        {match.homeTeam.name} vs {match.awayTeam.name}
      </h2>
      <p className="text-lg font-semibold text-center">{match.matchTimeUTC}</p>
      <p className="text-center text-gray-600">League: {match.leagueName}</p>

      {/* Check if 'status' exists before accessing its properties */}
      {match.status?.started && !match.status.finished && (
        <p className="text-center text-red-500 font-bold">Live Match</p>
      )}
      {match.status?.finished && (
        <p className="text-center text-green-600 font-bold">Match Finished</p>
      )}
    </div>
  );
}
