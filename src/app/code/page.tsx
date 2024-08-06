"use client";
import { ROUTES } from "@/app/globals";
import { Button } from "@/components/ui/atoms/button";
import Layout from "@/layouts/Layout";
import { useRouter } from "next/navigation";

export default function Code() {
  const router = useRouter();
  return (
    <Layout>
      <div className="p-xl w-full max-w-screen-lg bg-card rounded-3xl">
        <div className="flex flex-col flex-nowrap">
          {/* Free Cell */}
          <div className="flex items-center flex-nowrap justify-between">
            <h4>Free Cell Card Game</h4>
            <div>
              <Button onClick={() => router.push(ROUTES.FREE_CELL)}>
                Play Game
              </Button>
            </div>
          </div>
          <p className="mt-lg font-bold">Feeling like a challenge?</p>
          <p className="mt-md body2">
            Exercise your logic and problem solving skills with a game of Free
            Cell! This is known as the harder, more skill-based version of the
            game of Solitaire. Game play is with a single person and a single
            deck of cards.
          </p>
        </div>
      </div>
    </Layout>
  );
}
