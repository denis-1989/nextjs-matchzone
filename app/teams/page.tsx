import TeamList from './TeamList';

export const metadata = {
  title: 'Teams | MatchZone',
  description: 'Explore all teams competing in top football leagues.',
};

export default function TeamsPage() {
  return (
    <div>
      <TeamList />
    </div>
  );
}
