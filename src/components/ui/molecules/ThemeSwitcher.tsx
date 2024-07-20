import useThemeStore, { ThemeStoreType } from "@/stores/useThemeStore";
import Image from "next/image";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore((store: ThemeStoreType) => ({
    theme: store.theme,
    setTheme: store.setTheme,
  }));

  const imageDimensions = 35;

  return (
    <div className="border rounded-full bg-white shadow-md">
      <div
        className={
          "p-2 rounded-full cursor-pointer transition-all " +
          (theme === "secondary" ? "bg-card" : "hover:brightness-110")
        }
        onClick={() => {
          setTheme("secondary");
        }}
      >
        <Image
          src={"/static/green_theme.svg"}
          alt="green"
          width={imageDimensions}
          height={imageDimensions}
        />
      </div>
      <div
        className={
          "p-2 rounded-full cursor-pointer transition-all " +
          (theme === "primary" ? "bg-card" : "hover:brightness-110")
        }
        onClick={() => setTheme("primary")}
      >
        <Image
          src={"/static/purple_theme.svg"}
          alt="purple"
          width={imageDimensions}
          height={imageDimensions}
        />
      </div>
    </div>
  );
}
