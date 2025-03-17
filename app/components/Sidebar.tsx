'use client';

import type { Route } from 'next';
import Link from 'next/link';

// Define type-safe routes
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
    <aside className="w-64 bg-white shadow-md h-screen p-4">
      <h2 className="text-lg font-semibold mb-4">Leagues</h2>
      <ul className="space-y-2">
        <li className="cursor-pointer hover:text-blue-700">
          <Link href={routes.premierLeague} className="hover:underline">
            Premier League
          </Link>
        </li>
        <li className="cursor-pointer hover:text-blue-700">
          <Link href={routes.laLiga} className="hover:underline">
            La Liga
          </Link>
        </li>
        <li className="cursor-pointer hover:text-blue-700">
          <Link href={routes.bundesliga} className="hover:underline">
            Bundesliga
          </Link>
        </li>
        <li className="cursor-pointer hover:text-blue-700">
          <Link href={routes.serieA} className="hover:underline">
            Serie A
          </Link>
        </li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-4">Countries</h2>
      <ul className="space-y-2">
        <li className="cursor-pointer hover:text-blue-700">
          <Link href={routes.england} className="hover:underline">
            England
          </Link>
        </li>
        <li className="cursor-pointer hover:text-blue-700">
          <Link href={routes.spain} className="hover:underline">
            Spain
          </Link>
        </li>
        <li className="cursor-pointer hover:text-blue-700">
          <Link href={routes.germany} className="hover:underline">
            Germany
          </Link>
        </li>
        <li className="cursor-pointer hover:text-blue-700">
          <Link href={routes.italy} className="hover:underline">
            Italy
          </Link>
        </li>
      </ul>
    </aside>
  );
}
