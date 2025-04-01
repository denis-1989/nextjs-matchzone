'use client';

import Link from 'next/link';
import { Badge } from '../../components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

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
    <div
      className="p-12 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/team-header1.jpg')" }}
    >
      <div className="max-w-6xl mx-auto">
        {playersData.map((category) => (
          <Card
            key={`category-${category.title}`}
            className="mb-8 shadow-lg border border-gray-200 bg-white"
          >
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">
                {category.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.members.map((player) => (
                  <li key={`player-${player.id}`}>
                    <Link
                      href={`/players/${player.id}`}
                      className="block p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition duration-200"
                    >
                      <p className="text-lg font-semibold mb-2 text-gray-800">
                        {player.name}
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                        <Badge variant="outline">{player.position}</Badge>
                        <Badge variant="secondary">{player.nationality}</Badge>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
