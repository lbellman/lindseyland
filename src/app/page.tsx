"use client";
import useThemeStore, { ThemeStoreType } from "@/stores/useThemeStore";
import { Button } from "@/components/ui/button";
import { ArrowLongLeftIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

type BlockType = {
  key: string;
  label: string;
};

export default function Home() {
  const [activeBlock, setActiveBlock] = useState<BlockType | null>(null);
  const { theme, setTheme } = useThemeStore((store: ThemeStoreType) => ({
    theme: store.theme,
    setTheme: store.setTheme,
  }));

  const blocks: BlockType[] = [
    {
      key: "code",
      label: "Code",
    },
    {
      key: "art",
      label: "Art",
    },
    {
      key: "music",
      label: "Music",
    },
    {
      key: "writing",
      label: "Writing",
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

  return (
    <div
      className={"relative flex flex-col flex-nowrap bg-background  " + theme}
    >
      {/* Image */}
      <div
        className={
          "md:w-sidebar w-screen fixed top-0 opacity-90 h-screen min-h-screen bg-cover bg-right bg-no-repeat z-[5] " +
          mainImage
        }
      />

      <div
        className={
          "fixed right-0 top-0 h-screen min-h-screen w-screen bg-cover bg-no-repeat " +
          backgroundImage
        }
      />

      {/* Topbar */}
      <div className="w-full pt-3 sticky top-0 px-3 h-topbar z-20">
        <div className="flex justify-between h-[60px] rounded-full sticky top-0 opacity-90 flex-nowrap items-center p-5 bg-card">
          <p className="font-bold text-primary-foreground">LINDSEYLAND</p>
          <Switch
            checked={theme == "primary"}
            onCheckedChange={(checked) =>
              setTheme(checked ? "primary" : "secondary")
            }
          />
        </div>
      </div>
      <div className=" z-10 h-screen w-screen">
        <div className="flex mt-10 justify-center w-full">
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
                    className="bg-primary p-10 aspect-square opacity-90 rounded-3xl"
                    onClick={() => setActiveBlock(block)}
                  >
                    <p>{block.label}</p>
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
