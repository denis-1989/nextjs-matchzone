import MatchList from './components/MatchList';

export const metadata = {
  title: 'Live Matches | MatchZone',
  description: 'Watch live football matches and stay updated with MatchZone.',
};

export default function HomePage() {
  return (
    <div className="p-6">
      <MatchList />
    </div>
  );
}
