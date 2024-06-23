import { Metadata } from "next";
import React from "react";

import SubMenu from "@/components/submenu";
import Insider from "@/provider/insider";

import { menu } from "./utils";

export const metadata: Metadata = {
  title: "권한 관리 :: 디풀",
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <SubMenu menu={menu} subadd={1} />
      <Insider>
        {children}
      </Insider>
    </>
  );
};

export default Layout;