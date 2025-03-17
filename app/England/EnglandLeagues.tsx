'use client';

import { useEffect, useState } from 'react';

interface League {
  id: number;
  name: string;
  localizedName: string;
  logo: string;
}

// API Response Type
interface ApiResponse {
  response?: {
    countries?: {
      ccode: string;
      name: string;
      leagues: League[];
    }[];
  };
}

export default function EnglandLeagues() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeagues() {
      try {
        const res = await fetch(
          'https://free-api-live-football-data.p.rapidapi.com/football-get-all-leagues',
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
          throw new Error(`Failed to fetch leagues: ${res.status}`);
        }

        const data: ApiResponse = await res.json();
        console.log('API Response:', data);

        if (!data.response?.countries) {
          throw new Error('No leagues found.');
        }

        // Get English leagues including Premier League (id: 47)
        const englandLeagues =
          data.response.countries.find((country) => country.ccode === 'ENG')
            ?.leagues || [];

        setLeagues(englandLeagues);
      } catch (err) {
        setError('Error fetching leagues.');
        console.error('Error fetching leagues:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeagues().catch((err) => console.error('Unhandled async error:', err));
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading leagues...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        English Leagues
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {leagues.map((league) => (
          <div
            key={`league-${league.id}`}
            className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <img
              src={league.logo || '/fallback-logo.png'}
              alt={league.name}
              className="w-16 h-16 mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold text-center">
              {league.localizedName}
            </h3>
            <a
              href={`leagues/${league.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center mt-2 text-blue-600 hover:underline"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
