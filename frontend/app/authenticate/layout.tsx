"use client";
import Header from '@/_common/header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Header links={[]} hasSignOut={false}>
      {children}
    </Header>
  );
}
