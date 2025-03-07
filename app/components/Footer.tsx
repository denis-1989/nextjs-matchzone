import type { Route } from 'next';
import Link from 'next/link';

export default function Footer() {
  const routes = {
    privacyPolicy: '/privacy-policy' as Route,
  };

  return (
    <footer className="bg-gray-800 text-white p-4 mt-10 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} MatchZone. All rights reserved.
      </p>
      <div className="mt-2">
        <a
          href="https://github.com/denis-1989/nextjs-matchzone.git"
          className="text-blue-400 hover:underline"
        >
          GitHub
        </a>
        {' | '}
        <Link
          href={routes.privacyPolicy}
          className="text-blue-400 hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
