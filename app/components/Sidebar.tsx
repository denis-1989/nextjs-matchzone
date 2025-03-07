'use client';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4">
      <h2 className="text-lg font-semibold mb-4">Leagues</h2>
      <ul className="space-y-2">
        <li className="cursor-pointer hover:text-blue-700">Premier League</li>
        <li className="cursor-pointer hover:text-blue-700">La Liga</li>
        <li className="cursor-pointer hover:text-blue-700">Serie A</li>
        <li className="cursor-pointer hover:text-blue-700">Bundesliga</li>
        <li className="cursor-pointer hover:text-blue-700">Ligue 1</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-4">Countries</h2>
      <ul className="space-y-2">
        <li className="cursor-pointer hover:text-blue-700">England</li>
        <li className="cursor-pointer hover:text-blue-700">Spain</li>
        <li className="cursor-pointer hover:text-blue-700">Italy</li>
        <li className="cursor-pointer hover:text-blue-700">Germany</li>
        <li className="cursor-pointer hover:text-blue-700">France</li>
      </ul>
    </aside>
  );
}
