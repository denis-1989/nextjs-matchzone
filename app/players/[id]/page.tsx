import PlayerDetails from './PlayerDetails';

type PageProps = {
  params: Promise<{
    id?: string;
  }>;
};

export default async function PlayerPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return <p className="text-center text-red-500">Invalid player ID.</p>;
  }

  return <PlayerDetails playerId={id} />;
}
