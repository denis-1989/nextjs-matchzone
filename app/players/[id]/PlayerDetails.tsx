'use client';

import { useEffect, useState } from 'react';
import { Badge } from '../../../components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

interface PlayerDetailsProps {
  playerId: string;
}

interface PlayerDetail {
  id: string;
  name: string;
  role: string;
  nationality: string;
  height?: string;
  shirtNumber?: string;
  age?: string;
  preferredFoot?: string;
  marketValue?: string;
  imageUrl?: string;
}

interface PlayerApiResponse {
  response?: {
    detail?: {
      translationKey: string;
      value?: {
        fallback?: string;
      };
    }[];
  };
}

interface PlayerImageResponse {
  response?: {
    url?: string;
  };
}

interface PlayerListApiResponse {
  response?: {
    list: {
      title: string;
      members: {
        id: number;
        name: string;
        role?: {
          fallback: string;
        };
        cname?: string;
      }[];
    }[];
  };
}

export default function PlayerDetails({ playerId }: PlayerDetailsProps) {
  const [player, setPlayer] = useState<PlayerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayerDetails() {
      try {
        const apiHeaders = {
          method: 'GET',
          headers: {
            'x-rapidapi-key':
              'a4fef4d77emshc945f174f59df2ap1e008ejsncf9aa79bd3cb',
            'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
          },
        };

        const listRes = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-list-player?teamid=8650',
          apiHeaders,
        );

        if (!listRes.ok) throw new Error('Failed to fetch player list');

        const listData: PlayerListApiResponse = await listRes.json();
        const playerFromList = listData.response?.list
          .flatMap((category) => category.members)
          .find((p) => p.id.toString() === playerId);

        if (!playerFromList) throw new Error('Player not found in the list.');

        const detailRes = await fetch(
          `https://free-api-live-football-data.p.rapidapi.com/football-get-player-detail?playerid=${playerId}`,
          apiHeaders,
        );

        if (!detailRes.ok) throw new Error('Failed to fetch player details');
        const detailData: PlayerApiResponse = await detailRes.json();
        const playerInfo = detailData.response?.detail || [];

        const imageRes = await fetch(
          `https://free-api-live-football-data.p.rapidapi.com/football-get-player-logo?playerid=${playerId}`,
          apiHeaders,
        );

        if (!imageRes.ok) throw new Error('Failed to fetch player image');
        const imageData: PlayerImageResponse = await imageRes.json();

        const extractedDetails: PlayerDetail = {
          id: playerId,
          name: playerFromList.name || 'Unknown',
          role: playerFromList.role?.fallback || 'Unknown',
          nationality: playerFromList.cname || 'Unknown',
          height:
            playerInfo.find(
              (item) => item.translationKey === 'height_sentencecase',
            )?.value?.fallback || 'Unknown',
          shirtNumber:
            playerInfo.find((item) => item.translationKey === 'shirt')?.value
              ?.fallback || 'N/A',
          age:
            playerInfo.find(
              (item) => item.translationKey === 'age_sentencecase',
            )?.value?.fallback || 'Unknown',
          preferredFoot:
            playerInfo.find((item) => item.translationKey === 'preferred_foot')
              ?.value?.fallback || 'Unknown',
          marketValue:
            playerInfo.find((item) => item.translationKey === 'transfer_value')
              ?.value?.fallback || 'Unknown',
          imageUrl: imageData.response?.url || '/default-player.png',
        };

        setPlayer(extractedDetails);
      } catch (err) {
        setError('Error fetching player details.');
        console.error('Error fetching player details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayerDetails().catch((err) =>
      console.error('Unhandled async error in fetchPlayerDetails:', err),
    );
  }, [playerId]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading player details...</p>
    );
  }

  if (error || !player) {
    return (
      <p className="text-center text-red-500">{error || 'Player not found.'}</p>
    );
  }

  return (
    <div
      className="p-12 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/team-header1.jpg')" }}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{player.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src={player.imageUrl}
            alt={player.name}
            className="w-32 h-32 mx-auto rounded-full border mb-4"
          />
          <div className="text-center space-y-2">
            <Badge variant="secondary">Role: {player.role}</Badge>
            <Badge variant="secondary">Nationality: {player.nationality}</Badge>

            {!player.role.toLowerCase().includes('coach') && (
              <>
                <Badge variant="outline">Height: {player.height}</Badge>
                <Badge variant="outline">Shirt: {player.shirtNumber}</Badge>
                <Badge variant="outline">Age: {player.age}</Badge>
                <Badge variant="outline">Foot: {player.preferredFoot}</Badge>
                <Badge variant="default">Value: {player.marketValue}</Badge>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
