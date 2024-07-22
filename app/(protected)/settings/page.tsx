'use client';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { signOut } from 'next-auth/react';

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    signOut();
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <Button onClick={onClick} type="button">
        Log Out
      </Button>
    </div>
  );
};

export default SettingsPage;
