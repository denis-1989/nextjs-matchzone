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
        <Card className="bg-white/90 shadow-2xl rounded-xl backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-extrabold text-blue-900 tracking-wide">
              Team Players
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-10">
            {playersData.map((category) => (
              <div
                key={`category-${category.title}`}
                className="px-4 py-2 border border-gray-100 rounded-lg bg-white/70"
              >
                <h2 className="text-lg uppercase tracking-wide font-bold text-blue-700 mb-4 border-b pb-1">
                  {category.title}
                </h2>

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.members.map((player) => (
                    <li key={`player-${player.id}`}>
                      <Link
                        href={`/players/${player.id}`}
                        className="block rounded-lg p-5 border border-gray-200 bg-white hover:bg-blue-50 hover:shadow-md transition-all"
                      >
                        <p className="text-lg font-semibold text-gray-800 mb-2">
                          {player.name}
                        </p>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                          <Badge variant="outline">{player.position}</Badge>
                          <Badge variant="secondary">
                            {player.nationality}
                          </Badge>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
