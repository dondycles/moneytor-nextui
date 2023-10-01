import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Link as L } from "@nextui-org/link";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

export default function Home() {
  return (
    <main className="h-full flex flex-col flex-wrap gap-4 p-4">
      <article className="mt-auto mb-0 flex justify-center items-start gap-4 flex-wrap-reverse w-full">
        <section className="max-w-[500px] max-h-[200px] h-screen w-screen aspect-square rounded-xl gap-2 flex flex-row">
          <div className="flex flex-col flex-1 gap-2 ">
            <header className=" w-full flex-1 bg-transparent rounded-xl flex flex-col justify-center items-center">
              <p className="font-black text-primary text-base">
                <span className="text-foreground">Welcome To</span> Moneytor
              </p>
              <p className="text-sm text-foreground text-center">
                Manage your finances with ease!
              </p>
            </header>
            <Button
              as={Link}
              href="/dashboard"
              variant="shadow"
              color="primary"
              className="hidden aspect-square w-full flex-1 bg-primary rounded-xl font-black sm:flex"
            >
              <p className="m-auto">LET'S START!</p>
            </Button>
            <div className="flex flex-row gap-2  w-full sm:hidden">
              <Button
                as={Link}
                href="/dashboard"
                variant="shadow"
                color="primary"
                className="flex-1 h-full  rounded-xl font-black flex "
              >
                <p className="m-auto">LET'S START!</p>
              </Button>
              <div className="flex flex-col w-[12%] h-full gap-2 ">
                <Button
                  as={"div"}
                  variant="shadow"
                  color="warning"
                  isIconOnly
                  className="aspect-square h-1/2 text-white w-auto  rounded-xl flex  items-center justify-center"
                >
                  <BiSolidUpArrow />
                </Button>
                <Button
                  as={"div"}
                  variant="shadow"
                  color="danger"
                  isIconOnly
                  className="aspect-square h-1/2 w-auto  rounded-xl flex  items-center justify-center"
                >
                  <BiSolidDownArrow />
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col h-full gap-2">
            <Button
              as={"div"}
              variant="shadow"
              color="warning"
              isIconOnly
              className="aspect-square h-1/2 w-auto text-white rounded-xl flex text-3xl items-center justify-center"
            >
              <BiSolidUpArrow />
            </Button>
            <Button
              as={"div"}
              variant="shadow"
              color="danger"
              isIconOnly
              className="aspect-square h-1/2 w-auto  rounded-xl flex text-3xl items-center justify-center"
            >
              <BiSolidDownArrow />
            </Button>
          </div>
        </section>
      </article>
      <L
        href="#"
        color="primary"
        className="mb-auto mt-0 w-fit mx-auto text-sm"
      >
        How Moneytor Works?
      </L>
      <footer className="text-[10px] text-center text-foreground/30">
        Developed by @dondycles | 2023C | Ver. 1.0
      </footer>
    </main>
  );
}
