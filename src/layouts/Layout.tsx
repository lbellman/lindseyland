"use client";
import { ROUTES } from "@/app/globals";
import { Button } from "@/components/ui/atoms/button";
import ThemeSwitcher from "@/components/ui/molecules/ThemeSwitcher";
import useThemeStore, { ThemeStoreType } from "@/stores/useThemeStore";
import { usePathname, useRouter } from "next/navigation";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  CodeBracketIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/outline";
import { AudioWaveform, Code } from "lucide-react";
import Image from "next/image";

export const PAGE_ICONS: (size: "sm" | "md") => {
  [key: string]: React.ReactNode;
} = (size) => {
  const className = size === "sm" ? "size-5" : "size-7";
  return {
    code: <CodeBracketIcon className={className} />,
    writing: <DocumentTextIcon className={className} />,
    music: <AudioWaveform className={className} />,
    art: <PaintBrushIcon className={className} />,
  };
};

export default function Layout({
  children,
  blankBackground = false,
}: {
  children: React.ReactNode;
  blankBackground?: boolean;
}) {
  const { theme } = useThemeStore((store: ThemeStoreType) => ({
    theme: store.theme,
  }));

  const client = new ApolloClient({
    uri: "http://127.0.0.1:8000/graphql",
    cache: new InMemoryCache(),
  });

  const router = useRouter();
  const pathname = usePathname();

  const mainImage =
    theme === "primary"
      ? `bg-[url('/static/purple_mountain.JPG')]`
      : `bg-[url('/static/green_waterfall.JPG')]`;

  const backgroundImage =
    theme === "primary"
      ? `bg-[url('/static/purple_background.png')]`
      : `bg-[url('/static/green_background.png')]`;

  const imageDimensions = 35;
  return (
    <ApolloProvider client={client}>
      <div
        className={"relative flex flex-col flex-nowrap bg-background  " + theme}
      >
        {!blankBackground && (
          <>
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
          </>
        )}
        {/* Topbar */}
        <div className="w-full pt-2 sticky top-0 px-2 h-topbar z-20">
          <div className="flex justify-between h-[60px] rounded-full sticky top-0 opacity-90 flex-nowrap items-center px-8 bg-card">
            <div className="flex items-center flex-nowrap">
              <Image
                src={
                  theme === "primary"
                    ? "/static/purple_theme.svg"
                    : "/static/green_theme.svg"
                }
                alt="green"
                width={imageDimensions}
                height={imageDimensions}
              />
              <p
                className=" cursor-pointer hover:font-bold transition-all tracking-widest ml-md text-primary-foreground"
                onClick={() => {
                  router.push(ROUTES.HOME);
                }}
              >
                LINDSEYLAND
              </p>
              <div className="flex items-center flex-nowrap text-primary ml-sm">
                {PAGE_ICONS("sm")[pathname.replace("/", "")]}
              </div>
            </div>
            <div>
              <div className="flex items-center flex-nowrap">
                <div className="mr-sm">
                  <Button
                    onClick={() => router.push(ROUTES.ABOUT)}
                    className="bg-card hover:text-white h-[60px] hover:bg-primary rounded-none transition-all"
                  >
                    About
                  </Button>
                </div>

                <div>
                  <Button className="bg-cardh hover:text-white h-[60px] hover:bg-primary rounded-none transition-all">
                    Contact{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Children */}
        <div className="z-10 mt-lg">
          <div className="flex justify-center w-full animate-fade-in">
            {children}
          </div>
        </div>
        <div className="fixed bottom-4 right-4 z-[30]">
          <ThemeSwitcher />
        </div>
      </div>
    </ApolloProvider>
  );
}
