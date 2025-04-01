'use client';

import { Globe2, Trophy } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Separator } from '../../components/ui/separator';

const routes = {
  home: '/' as Route,
  standings: '/standings' as Route,
  teams: '/teams' as Route,
  players: '/players' as Route,
  premierLeague: '/PremierLeague' as Route,
  laLiga: '/LaLiga' as Route,
  bundesliga: '/Bundesliga' as Route,
  serieA: '/SerieA' as Route,
  england: '/England' as Route,
  spain: '/Spain' as Route,
  germany: '/Germany' as Route,
  italy: '/Italy' as Route,
};

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-screen hidden md:block">
      <ScrollArea className="h-full p-6 flex flex-col justify-between">
        <div>
          {/* Leagues */}
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-700 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-blue-600" /> Leagues
            </h2>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href={routes.premierLeague}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Premier League
                </Link>
              </li>
              <li>
                <Link
                  href={routes.laLiga}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  La Liga
                </Link>
              </li>
              <li>
                <Link
                  href={routes.bundesliga}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Bundesliga
                </Link>
              </li>
              <li>
                <Link
                  href={routes.serieA}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Serie A
                </Link>
              </li>
            </ul>
          </div>

          <Separator className="my-4" />

          <div>
            <h2 className="text-md font-semibold text-gray-700 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-blue-600" /> Countries
            </h2>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href={routes.england}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  England
                </Link>
              </li>
              <li>
                <Link
                  href={routes.spain}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Spain
                </Link>
              </li>
              <li>
                <Link
                  href={routes.germany}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Germany
                </Link>
              </li>
              <li>
                <Link
                  href={routes.italy}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Italy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar image */}
        <div className="mt-10">
          <img
            src="/sidebar-photo.jpg"
            alt="Football Player"
            className="w-full h-70 object-cover rounded-xl shadow-md"
          />
        </div>
      </ScrollArea>
    </aside>
  );
}
