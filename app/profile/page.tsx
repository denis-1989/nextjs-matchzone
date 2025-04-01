import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { getUser } from '../../database/users';

export const metadata = {
  title: 'Your Profile - MatchZone',
  description:
    'Manage your preferences and follow your favorite teams and players.',
};

export default async function ProfilePage() {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  if (!user) {
    redirect('/');
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('/team-header1.jpg')] bg-cover bg-center">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-blue-800">
            {user.username}'s Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <p className="text-gray-700 text-base">
            Welcome to your MatchZone profile! Here you can manage your teams,
            favorite leagues, and personal preferences.
          </p>

          <div className="space-y-3">
            <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white">
              Edit Profile
            </Button>
            {/* <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              Logout
            </Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
