"use client";

import { cn } from "@/lib/utils";

interface ChatItemProps {
  content: string;
  user: string;
  timestamp: string;
  section: string;
}

export const ChatItem = ({
  content,
  user,
  section,
  timestamp,
}: ChatItemProps) => {
  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition"></div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="font-semibold text-sm hover:underline cursor-pointer">
                {user}
              </p>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>

          <p className={cn("text-sm text-zinc-600 dark:text-zinc-300")}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};
