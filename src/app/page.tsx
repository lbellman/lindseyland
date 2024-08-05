"use client";
import Layout from "@/layouts/Layout";
import useThemeStore, { ThemeStoreType } from "@/stores/useThemeStore";

import {
  CodeBracketIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
} from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type BlockType = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

export default function Home() {
  const router = useRouter();
  const [activeBlock, setActiveBlock] = useState<BlockType | null>(null);
  const blockRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const { theme, setTheme } = useThemeStore((store: ThemeStoreType) => ({
    theme: store.theme,
    setTheme: store.setTheme,
  }));

  const blocks: BlockType[] = [
    {
      key: "code",
      label: "Code",
      icon: <CodeBracketIcon className="size-6" />,
    },
    {
      key: "art",
      label: "Art",
      icon: <PaintBrushIcon className="size-6" />,
    },
    {
      key: "music",
      label: "Music",
      icon: <MusicalNoteIcon className="size-6" />,
    },
    {
      key: "writing",
      label: "Writing",
      icon: <DocumentTextIcon className="size-6" />,
    },
  ];

  const mainImage =
    theme === "primary"
      ? `bg-[url('/static/purple_mountain.JPG')]`
      : `bg-[url('/static/green_waterfall.JPG')]`;

  const backgroundImage =
    theme === "primary"
      ? `bg-[url('/static/purple_background.png')]`
      : `bg-[url('/static/green_background.png')]`;

  useEffect(() => {
    if (activeBlock?.key && blockRefs.current[activeBlock?.key]) {
      blockRefs.current[activeBlock.key].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeBlock]);

  return (
    <Layout>
      <div className="flex flex-col max-w-screen-md md:grid md:grid-cols-2 gap-10  w-full">
        {blocks.map((block) => {
          return (
            <div
              key={block.key}
              className="cursor-pointer h-full hover:p-16 bg-primary duration-300 aspect-square hover:font-bold transition-all rounded-3xl"
              onClick={() => router.push(`/${block.key}`)}
            >
              <div className="flex flex-col w-full bg-card rounded-3xl items-center h-full justify-center flex-nowrap">
                <h4>{block.label.toUpperCase()}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
