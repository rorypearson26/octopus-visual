import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';

import { NavLink } from '@mantine/core';

export interface Link {
  label: string;
  link: string;
  icon: IconType;
}

export default function Links({ links }: { links: Link[] }) {
  const pathname = usePathname();

  return links.map((link) => {
    const Icon = link.icon;
    const isActive = pathname === link.link;

    return (
      <NavLink
        key={link.label}
        href={link.link}
        label={link.label}
        leftSection={<Icon size={16} stroke={"1.5"} />}
        active={isActive}
      />
    );
  });
}
