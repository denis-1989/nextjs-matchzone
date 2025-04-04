import type { Metadata } from 'next';
import Standings from './Standings';

export const metadata: Metadata = {
  title: 'League Standings - MatchZone',
  description: 'Check the latest league standings and points for all teams.',
};

export default function StandingsPage() {
  return <Standings />;
}
