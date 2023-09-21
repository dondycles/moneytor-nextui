import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full flex flex-col flex-wrap p-4">
      <article className="m-auto flex flex-row justify-center items-start gap-4 flex-wrap-reverse w-full">
        <section>
          <header className="m-auto mb-4">
            <h1 className="text-xl sm:text-2xl font-bold">
              Welcome to <span className="text-primary">Moneytor</span>
            </h1>
            <p className="text-xs sm:text-base">
              Monitor your wealth with ease.
            </p>
          </header>
          <Button
            as={Link}
            href="/dashboard"
            variant="shadow"
            color="primary"
            className="text-xs font-bold m-auto mt-0 w-full text-white"
          >
            LET'S START!
          </Button>
        </section>
        <section className="max-w-[400px] w-full h-auto aspect-video border-1 border-primary rounded-xl"></section>
      </article>
      <footer className="text-[10px] text-center text-foreground/30">
        Developed by @dondycles | 2023C | Ver. 1.0
      </footer>
    </main>
  );
}
