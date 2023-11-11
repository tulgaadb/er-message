import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  return (
    <div className="h-full">
      <main className="h-full">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
