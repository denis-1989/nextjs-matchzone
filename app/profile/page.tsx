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
    <div
      className="min-h-screen p-12 bg-cover bg-center"
      style={{ backgroundImage: "url('/team-header1.jpg')" }}
    >
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl md:text-4xl font-extrabold text-blue-800">
              Welcome, {user.username}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 text-center px-6 pb-10">
            <p className="text-gray-700 text-lg leading-relaxed">
              This is your personal MatchZone dashboard. Here you can manage
              your favorite teams, update your preferences, and explore new
              leagues or players.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                Edit Profile
              </Button>
              <Button
                variant="outline"
                className="border-blue-700 text-blue-700 hover:bg-blue-50"
              >
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
