import { FaSignOutAlt } from 'react-icons/fa';

import useAuthenticated from '@/authenticate/useAthenticate';
import { NavLink } from '@mantine/core';

export default function SignOut() {
  const { clearAuthentication } = useAuthenticated();

  return (
    <NavLink
      key="sign-out"
      href="/"
      label="Sign Out"
      leftSection={<FaSignOutAlt size={16} stroke={"1.5"} />}
      onClick={clearAuthentication}
    />
  );
}
