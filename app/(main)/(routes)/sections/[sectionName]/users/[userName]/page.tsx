import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";

import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";

import { db } from "@/lib/db";

interface ChannelIdPageProps {
  params: {
    userName: string;
    sectionName: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const { sectionName, userName } = params;

  if (!sectionName || !userName) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <>
        <ChatMessages section={sectionName} user={userName} />
        <ChatInput section={sectionName} user={userName} />
      </>
    </div>
  );
};

export default ChannelIdPage;
