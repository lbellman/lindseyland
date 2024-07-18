"use client";
import useThemeStore, { ThemeStoreType } from "@/stores/useThemeStore";
import { Button } from "@/components/ui/button";
import {
  ArrowLongLeftIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";

type BlockType = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

export default function Home() {
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
    <div
      className={"relative flex flex-col flex-nowrap bg-background  " + theme}
    >
      {/* Sidebar Image */}
      <div
        className={
          "md:w-sidebar w-screen fixed top-0 opacity-90 h-screen min-h-screen bg-cover bg-right bg-no-repeat z-[5] " +
          mainImage
        }
      />
      {/* Background Image */}
      <div
        className={
          "fixed right-0 top-0 h-screen min-h-screen w-screen bg-cover bg-no-repeat " +
          backgroundImage
        }
      />
      {/* Topbar */}
      <div className="w-full pt-2 sticky top-0 px-2 h-topbar z-20">
        <div className="flex justify-between h-[60px] rounded-full sticky top-0 opacity-90 flex-nowrap items-center px-8  bg-card">
          <p className="font-bold text-primary-foreground">LINDSEYLAND</p>
          <div>
            <div className="flex items-center flex-nowrap">
              <div className="mr-sm">
                <Button className="bg-card hover:text-white h-[60px] hover:bg-primary rounded-none transition-all">
                  Resume
                </Button>
              </div>
              <div className="mr-md">
                <Button className="bg-cardh hover:text-white h-[60px] hover:bg-primary rounded-none transition-all">
                  Contact{" "}
                </Button>
              </div>
              <Switch
                checked={theme == "primary"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "primary" : "secondary")
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="z-10 h-screen w-screen">
        <div className="flex justify-center w-full">
          {activeBlock ? (
            <div className="bg-primary p-lg rounded-3xl aspect-square max-w-screen-sm w-full">
              <div className="flex items-center flex-nowrap">
                <Button onClick={() => setActiveBlock(null)}>
                  <ArrowLongLeftIcon className="size-6 text-primary-foreground" />
                </Button>
                {activeBlock.label}
              </div>
            </div>
          ) : (
            <div className="flex flex-col p-lg max-w-screen-md md:grid md:grid-cols-2 gap-10  w-full">
              {blocks.map((block, index) => {
                return (
                  <div
                    key={block.key}
                    className="cursor-pointer bg-primary h-full p-10 aspect-square  rounded-3xl"
                    onClick={() => setActiveBlock(block)}
                  >
                    <div className="flex flex-col items-center h-full justify-center flex-nowrap">
                      <p className="text-2xl font-light text-white tracking-widest">
                        {block.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
