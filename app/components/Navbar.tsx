'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { appRoutes } from '../../util/routes';

export default function Navbar({
  user,
}: {
  user: { id: number; username: string } | null | undefined;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white shadow-sm relative">
      <div
        className="w-full h-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/navbar-photo.jpg')" }}
      />

      <div className="container mx-auto px-6 py-4 flex items-center justify-between -mt-20 relative z-10">
        <div className="text-2xl font-bold text-white drop-shadow-lg">
          MatchZone
        </div>

        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="/"
            className="text-sm text-white hover:text-blue-300 transition"
          >
            Live Matches
          </Link>
          <Link
            href={appRoutes.standings as Route}
            className="text-sm text-white hover:text-blue-300 transition"
          >
            Standings
          </Link>
          <Link
            href={appRoutes.teams as Route}
            className="text-sm text-white hover:text-blue-300 transition"
          >
            Teams
          </Link>
          <Link
            href={appRoutes.players as Route}
            className="text-sm text-white hover:text-blue-300 transition"
          >
            Players
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Input type="text" placeholder="Search..." className="w-48" />
          {!user ? (
            <>
              <Link href={appRoutes.login as Route}>
                <Button variant="outline">Login</Button>
              </Link>
              <Link href={appRoutes.register as Route}>
                <Button>Register</Button>
              </Link>
            </>
          ) : (
            <LogoutButton />
          )}
        </div>

        <button
          className="md:hidden text-white focus:outline-none text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-gray-100 border-t">
          <nav className="flex flex-col gap-4 mb-4">
            <Link href="/" className="text-gray-700 font-semibold">
              Live Matches
            </Link>
            <Link href={appRoutes.standings as Route}>Standings</Link>
            <Link href={appRoutes.teams as Route}>Teams</Link>
            <Link href={appRoutes.players as Route}>Players</Link>
          </nav>

          <div className="flex flex-col gap-2">
            {!user ? (
              <>
                <Link href={appRoutes.login as Route}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href={appRoutes.register as Route}>
                  <Button className="w-full">Register</Button>
                </Link>
              </>
            ) : (
              <LogoutButton />
            )}
          </div>
        </div>
      )}
    </header>
  );
}
