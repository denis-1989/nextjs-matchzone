'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          MatchZone
        </Link>

        {/* Search Bar & Login */}
        <div className="flex items-center gap-4">
          <input
            placeholder="Search..."
            className="p-2 rounded-md text-black"
          />
          <button className="bg-white text-blue-700 px-4 py-2 rounded-md">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
