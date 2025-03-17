'use client';

import Link from 'next/link';

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

interface PlayerListProps {
  playersData: PlayerCategory[];
}

export default function PlayerList({ playersData }: PlayerListProps) {
  return (
    <div>
      {playersData.map((category) => (
        <div key={`category-${category.title}`} className="mb-4">
          <h2 className="text-lg font-bold">{category.title}</h2>
          <ul>
            {category.members.map((player) => (
              <li key={`player-${player.id}`} className="py-2">
                <Link
                  href={`/players/${player.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {player.name} - {player.position} ({player.nationality})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
