import './globals.css';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import { getUser } from '../database/users';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export const metadata = {
  title: 'MatchZone',
  description: 'Live football scores and stats.',
  icons: {
    icon: [
      { rel: 'icon', url: '/favicon copy.ico', type: 'image/x-icon' },
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
        type: 'image/png',
      },
    ],
  },
};

export default async function Layout({ children }: { children: ReactNode }) {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  return (
    <html lang="en">
      <body className="bg-[url('/team-header1.jpg')] bg-no-repeat bg-top bg-cover bg-fixed text-gray-900">
        <Navbar user={user} />
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 p-6 overflow-auto">
            <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-md shadow-md max-w-7xl mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
