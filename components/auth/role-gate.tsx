'use client';

import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import ErrorForm from '@/components/error-form';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return <ErrorForm message="You do not have permmision to view this content!" />;
  }

  return <div>{children}</div>;
};

export default RoleGate;
