'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from '../(auth)/logout/LogoutButton';

export default function Navbar({
  user,
}: {
  user: { id: number; username: string } | null | undefined;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = {
    home: '/' as Route,
    standings: '/standings' as Route,
    teams: '/teams' as Route,
    players: '/players' as Route,
    login: '/login' as Route,
    register: '/register' as Route,
  };

  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href={routes.home}
          className="text-2xl font-bold hover:opacity-80"
        >
          MatchZone
        </Link>

        {/* Navigation Links - Desktop */}
        <ul className="hidden md:flex gap-6">
          <li>
            <Link href={routes.home} className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href={routes.standings} className="hover:underline">
              Standings
            </Link>
          </li>
          <li>
            <Link href={routes.teams} className="hover:underline">
              Teams
            </Link>
          </li>
          <li>
            <Link href={routes.players} className="hover:underline">
              Players
            </Link>
          </li>
        </ul>

        {/* Search Bar & Auth - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <input
            placeholder="Search..."
            className="p-2 rounded-md text-black border border-gray-300"
          />
          {!user ? (
            <div className="flex gap-2">
              <Link
                href={routes.login}
                className="bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-gray-200 flex items-center justify-center"
              >
                Login
              </Link>
              <Link
                href={routes.register}
                className="bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-gray-200 flex items-center justify-center"
              >
                Register
              </Link>
            </div>
          ) : (
            <LogoutButton />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 p-4 mt-2 rounded-md">
          <ul className="flex flex-col gap-4">
            <li>
              <Link href={routes.home} className="block hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href={routes.standings} className="block hover:underline">
                Standings
              </Link>
            </li>
            <li>
              <Link href={routes.teams} className="block hover:underline">
                Teams
              </Link>
            </li>
            <li>
              <Link href={routes.players} className="block hover:underline">
                Players
              </Link>
            </li>
            {!user ? (
              <>
                <li>
                  <Link href={routes.login} className="block hover:underline">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href={routes.register}
                    className="block hover:underline"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
