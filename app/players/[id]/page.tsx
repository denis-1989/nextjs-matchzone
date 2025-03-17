import PlayerDetails from './PlayerDetails';

// Server Component for Player Page
export default async function PlayerPage({
  params,
}: {
  params: { id?: string };
}) {
  const playerId = (await params).id;
  if (!playerId) {
    return <p className="text-center text-red-500">Invalid player ID.</p>;
  }

  return <PlayerDetails playerId={playerId} />;
}
