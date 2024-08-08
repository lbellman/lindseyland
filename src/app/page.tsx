"use client";
import { ROUTES } from "@/app/globals";
import { Button } from "@/components/ui/atoms/button";
import Layout, { PAGE_ICONS } from "@/layouts/Layout";
import useThemeStore, { ThemeStoreType } from "@/stores/useThemeStore";

import {
  PaintBrushIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import { ArrowRight, MoveRight, Paintbrush2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type BlockType = {
  key: string;
  label: string;
  route: string;
  icon: React.ReactNode;
  hiddenText: string;
};

function Block({ block }: { block: BlockType }) {
  const router = useRouter();
  return (
    <div
      key={block.key}
      className="relative cursor-pointer overflow-hidden h-full bg-primary hover:p-2 duration-300 aspect-square transition-all rounded-3xl"
      onClick={() => router.push(block.route)}
    >
      <div className="flex group flex-col w-full transition-all bg-card rounded-3xl items-center h-full justify-center flex-nowrap">
        {/* Icon */}
        <div className="text-primary absolute bottom-28 left-12 group-hover:bottom-60 group-hover:text-primary-foreground transition-all ease-out delay-300 duration-200 group-hover:delay-200 group-hover:duration-300">
          {block.icon}
        </div>
        {/* Main Label */}
        <p
          className={
            "subtitle1 bottom-16 group-hover:font-bold group-hover:delay-200 group-hover:duration-300 transition-all ease-out delay-300 duration-200 left-12 font-light absolute group-hover:bottom-48 "
          }
        >
          {block.label}
        </p>
        {/* Hidden Text */}
        <div
          className={
            "absolute transition-all duration-500 group-hover:delay-500 group-hover:duration-300 bottom-40 opacity-0 left-12 group-hover:opacity-100 "
          }
        >
          <div className="flex flex-col flex-nowrap w-full ">
            <p className="body2"> {block.hiddenText}</p>
          </div>
        </div>
        {/* Hidden Arrow */}

        <div className="absolute transition-opacity opacity-0 group-hover:opacity-100 bottom-6 right-8">
          <Button size="icon">
            <MoveRight className="animate-pulse" />
          </Button>
        </div>
      </div>
    </div>
  );
}

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
      route: ROUTES.CODE,
      icon: PAGE_ICONS("md").code,
      hiddenText: "Coding projects.",
    },
    {
      key: "writing",
      label: "Writing",
      route: ROUTES.WRITING,
      icon: PAGE_ICONS("md").writing,
      hiddenText: "Stories and poems.",
    },
    {
      key: "music",
      label: "Music",
      route: ROUTES.MUSIC,
      icon: PAGE_ICONS("md").music,
      hiddenText: "Original music.",
    },
    {
      key: "art",
      label: "Art",
      route: ROUTES.ART,
      icon: PAGE_ICONS("md").art,
      hiddenText: "Digital and physical art.",
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
      <div className="flex flex-col max-w-2xl md:grid md:grid-cols-2 gap-10  w-full">
        {blocks.map((block) => {
          return <Block block={block} key={block.key} />;
        })}
      </div>
    </Layout>
  );
}
