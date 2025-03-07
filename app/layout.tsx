import type { ReactNode } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar /> {/* Top Navigation */}
        <div className="flex h-screen">
          <Sidebar /> {/* Left Sidebar */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>{' '}
          {/* Main Content */}
        </div>
        <Footer /> {/* Footer */}
      </body>
    </html>
  );
}
