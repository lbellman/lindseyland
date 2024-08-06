import Layout from "@/layouts/Layout";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { InboxIcon } from "@heroicons/react/24/outline";

export default function About() {
  const iconRow = (icon: React.ReactNode, text: string) => (
    <div className="flex items-center flex-nowrap">
      {icon}
      <p className="ml-md">{text}</p>
    </div>
  );
  return (
    <Layout>
      <div className="relative w-full bg-card rounded-3xl max-w-screen-lg">
        <div className="flex flex-col flex-nowrap">
          <div className="w-full rounded-t-3xl bg-primary p-xl">
            <div className="flex justify-center">
              <h2>ABOUT</h2>
            </div>
          </div>

          <div className="p-xl">
            <div className="flex flex-col flex-nowrap">
              <p className="subtitle1 mb-md">WHAT THIS IS</p>
              <p>
                Lindseyland is the place you go when you&apos;re day-dreaming.
                It is a place where all ideas and passions can coexist with no
                rules. There are no boundaries between disciplines here,
                everything from math to art is appreciated and explored in the
                same way. <br />
                <br />
                You will find all sorts of projects and creations here, feel
                free to explore them all. If you are a reader and love to read
                stories and poems, go make a cup of tea and then visit the{" "}
                <a className="underline cursor-pointer" href="/writing">
                  writing
                </a>{" "}
                section.
              </p>

              <p className="subtitle1 mb-md mt-xl ">WHO I AM</p>
              <p>
                I am someone who loves to create. Whether that be through code,
                art, music, writing, crochet, or any other medium I can get my
                hands on. My only passion in life is to take this reality and
                mould it into things that have never existed before and will
                never exist again. I am a software engineer by profession, and
                that allows me to design and build intricate systems with
                real-world applications. <br />
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
