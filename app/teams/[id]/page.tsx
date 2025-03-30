import TeamDetails from './TeamDetails';

type PageProps = {
  params: Promise<{
    id?: string;
  }>;
};

export default async function TeamPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return <p className="text-center text-red-500">Invalid team ID.</p>;
  }

  return <TeamDetails teamId={id} />;
}
