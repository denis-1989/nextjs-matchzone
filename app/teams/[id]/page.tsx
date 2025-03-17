import TeamDetails from './TeamDetails';

export default async function TeamPage({
  params,
}: {
  params: { id?: string };
}) {
  const teamId = (await params).id;

  if (!teamId) {
    return <p className="text-center text-red-500">Invalid Team ID.</p>;
  }

  return <TeamDetails teamId={teamId} />;
}
