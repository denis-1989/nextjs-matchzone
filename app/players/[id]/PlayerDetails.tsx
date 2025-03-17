'use client';

import { useEffect, useState } from 'react';

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

// Define API Response Types
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
        // Fetch Player List (General Info)
        const listRes = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-list-player?teamid=8650',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key':
                'a4fef4d77emshc945f174f59df2ap1e008ejsncf9aa79bd3cb',
              'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
            },
          },
        );

        if (!listRes.ok) {
          throw new Error(`Failed to fetch player list: ${listRes.status}`);
        }

        const listData: PlayerListApiResponse = await listRes.json();
        console.log('Player List API Response:', listData);

        // Extract Player Data from the List
        const playerFromList = listData.response?.list
          .flatMap((category) => category.members)
          .find((p) => p.id.toString() === playerId);

        if (!playerFromList) throw new Error('Player not found in the list.');

        // Fetch Player Details
        const detailRes = await fetch(
          `https://free-api-live-football-data.p.rapidapi.com/football-get-player-detail?playerid=${playerId}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key':
                'a4fef4d77emshc945f174f59df2ap1e008ejsncf9aa79bd3cb',
              'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
            },
          },
        );

        if (!detailRes.ok) {
          throw new Error(
            `Failed to fetch player details: ${detailRes.status}`,
          );
        }
        const detailData: PlayerApiResponse = await detailRes.json();
        console.log('Player Details API Response:', detailData);

        // Extract Player Details
        const playerInfo = detailData.response?.detail || [];

        const imageRes = await fetch(
          `https://free-api-live-football-data.p.rapidapi.com/football-get-player-logo?playerid=${playerId}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key':
                'a4fef4d77emshc945f174f59df2ap1e008ejsncf9aa79bd3cb',
              'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
            },
          },
        );

        if (!imageRes.ok) {
          throw new Error(`Failed to fetch player image: ${imageRes.status}`);
        }
        const imageData: PlayerImageResponse = await imageRes.json();
        console.log('Player Image API Response:', imageData);

        // Organize All Data into One Object
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
            playerInfo
              .find((item) => item.translationKey === 'shirt')
              ?.value?.fallback?.toString() || 'N/A',
          age:
            playerInfo
              .find((item) => item.translationKey === 'age_sentencecase')
              ?.value?.fallback?.toString() || 'Unknown',
          preferredFoot:
            playerInfo.find((item) => item.translationKey === 'preferred_foot')
              ?.value?.fallback || 'Unknown',
          marketValue:
            playerInfo.find((item) => item.translationKey === 'transfer_value')
              ?.value?.fallback || 'Unknown',
          imageUrl: imageData.response?.url || '/default-player.png',
        };

        console.log('Extracted Player Details:', extractedDetails);
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
      <p className="text-center text-red-500">
        {error || 'Player details not available.'}
      </p>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md text-center">
      <img
        src={player.imageUrl}
        alt={player.name}
        className="w-32 h-32 mx-auto rounded-full border border-gray-300"
      />
      <h2 className="text-2xl font-bold mt-4">{player.name}</h2>
      <p className="text-gray-700">Role: {player.role}</p>
      <p className="text-gray-700">Nationality: {player.nationality}</p>

      {/* Show detailed info only for players, not coaches */}
      {!player.role.toLowerCase().includes('coach') && (
        <>
          <p className="text-gray-700">Height: {player.height}</p>
          <p className="text-gray-700">Shirt Number: {player.shirtNumber}</p>
          <p className="text-gray-700">Age: {player.age}</p>
          <p className="text-gray-700">
            Preferred Foot: {player.preferredFoot}
          </p>
          <p className="text-gray-700">Market Value: {player.marketValue}</p>
        </>
      )}
    </div>
  );
}
