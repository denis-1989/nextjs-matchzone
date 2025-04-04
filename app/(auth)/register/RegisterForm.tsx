'use client';

import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import type { RegisterResponseBody } from '../api/register/route';

type Props = { returnTo?: string | string[] };

export default function RegisterForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>();

  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: RegisterResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(getSafeReturnToPath(props.returnTo) || ('/' as Route));
    router.refresh();
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/register-photo.jpg')",
      }}
    >
      <form
        onSubmit={handleRegister}
        className="absolute top-1/3 transform -translate-y-1/2 bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Register to MatchZone
        </h1>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">
            Username
          </span>
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
            className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>

        <label className="block mb-6">
          <span className="block text-sm font-medium text-gray-700">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>

        <button className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition">
          Register
        </button>

        {errors?.map((error) => (
          <div key={`error-${error.message}-${Math.random()}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        ))}
      </form>
    </div>
  );
}
