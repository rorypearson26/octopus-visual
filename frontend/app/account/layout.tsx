"use client";
import React from "react";

import Header from "@/_common/header/Header";

function Layout({ children }: { children: React.ReactNode }) {
  const links = [
    { label: "Overview", link: "/account", icon: () => <></> },
    { label: "Usage", link: "/account/usage", icon: () => <></> },
    { label: "Weather", link: "/account/weather", icon: () => <></> },
  ];

  console.log("Rendering account layout");
  return (
    <Header links={links} hasSignOut={true}>
      {children}
    </Header>
  );
}

export default React.memo(Layout);
