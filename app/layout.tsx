import './globals.css';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import { getUser } from '../database/users';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default async function Layout({ children }: { children: ReactNode }) {
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar user={user} />

        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
