import PlayerList from './PlayerList';

export const metadata = {
  title: 'Players | MatchZone',
  description: 'Check out detailed information about football players.',
};

// Define API Response Structure
interface Player {
  id: string;
  name: string;
  position: string;
  nationality: string;
}

interface PlayerCategory {
  title: string;
  members: Player[];
}

interface ApiResponse {
  response?: {
    list: {
      title: string;
      members: {
        id: number; // API returns number
        name: string;
        role?: {
          fallback: string;
        };
        cname?: string;
      }[];
    }[];
  };
}

export default async function PlayersPage() {
  const apiUrl =
    'https://free-api-live-football-data.p.rapidapi.com/football-get-list-player?teamid=8650';

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'a4fef4d77emshc945f174f59df2ap1e008ejsncf9aa79bd3cb',
      'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
    },
  };

  try {
    //  Fetch data from API
    const res = await fetch(apiUrl, options);

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    //  Explicitly define `data` type
    const data: ApiResponse = await res.json();

    if (!data.response?.list || !Array.isArray(data.response.list)) {
      throw new Error('No players found.');
    }

    //  Organize players by category
    const playersData: PlayerCategory[] = data.response.list.map(
      (category) => ({
        title: category.title,
        members: category.members.map((player) => ({
          id: String(player.id), //  Convert id to string
          name: player.name,
          position: player.role?.fallback || 'Unknown',
          nationality: player.cname || 'Unknown',
        })),
      }),
    );

    return (
      <div className="p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-center mb-4">Team Players</h1>
        <PlayerList playersData={playersData} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching players:', error);
    return (
      <p className="text-center text-red-500">Error loading player data.</p>
    );
  }
}
