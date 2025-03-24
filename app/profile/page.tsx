import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import { getUser } from '../../database/users';

export default async function ProfilePage() {
  // const router = useRouter();
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));
  console.log(user);
  if (!user) {
    redirect('/');
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">
          {user.username}'s Profile
        </h2>
        <p className="text-gray-600">
          Welcome to your MatchZone profile! Here you will be able to manage
          your teams, favorite leagues, and personal info.
        </p>

        <div className="mt-6 space-y-4">
          <button className="w-full py-2 px-4 rounded bg-blue-700 text-white hover:bg-blue-800">
            Edit Profile
          </button>
          {/* <button className="w-full py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600">
            Logout
          </button> */}
          {/* <LogoutButton /> */}
        </div>
      </div>
    </div>
  );
}
