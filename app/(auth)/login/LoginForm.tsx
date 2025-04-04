'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import type { LoginResponseBody } from '../api/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>();

  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: LoginResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(getSafeReturnToPath(props.returnTo) || `/profile`);
    router.refresh();
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-end justify-center pb-[38rem]"
      style={{ backgroundImage: "url('/loggin-photo.jpg')" }}
    >
      <Card className="w-full max-w-md shadow-xl bg-white rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <label className="block">
              <span className="text-gray-700 font-medium">Username</span>
              <input
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium">Password</span>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>

            <button className="w-full py-2 px-4 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition">
              Login
            </button>

            {errors?.map((error) => (
              <div key={`error-${error.message}-${Math.random()}`}>
                <ErrorMessage>{error.message}</ErrorMessage>
              </div>
            ))}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
