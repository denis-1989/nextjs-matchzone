'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { logout } from './actions';

export default function LogoutButton() {
  const router = useRouter();

  return (
    <form
      action={async () => {
        await logout();
        router.refresh();
      }}
    >
      <Button variant="outline" type="submit">
        Logout
      </Button>
    </form>
  );
}
