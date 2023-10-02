import { Button, ButtonGroup } from "@nextui-org/button";
import Link from "next/link";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

export default function HowMoneytorWorks() {
  return (
    <main className="w-full h-full p-1 py-8">
      <article className="w-full h-full flex flex-col gap-4 items-center px-1 sm:px-8 ">
        <header className="flex flex-row gap-2 items-center">
          <p className="text-base sm:text-lg font-bold">How Moneytor Works?</p>
        </header>
        <section className="w-full max-w-[700px] max-h-full  overflow-x-hidden overflow-y-auto h-full">
          <ul className="flex flex-col gap-8">
            <li className="flex flex-col gap-2">
              <p className="font-bold text-primary text-base">
                1. What is Moneytor?
              </p>
              <p className="indent-4">
                Moneytor is a Web App (I will create a mobile app for this
                soon!) that helps you to keep track of your finances by listing
                each of them here. Imagine this as your personal notebook where
                you can list anything.
              </p>
              <p className="indent-4">
                By listing each of them, you will be able to monitor the
                movement of your money in and out.
              </p>
              <p className="indent-4 text-warning">
                Note: Moneytor is not a bank! Real moneys are not stored here.
              </p>
            </li>
            <li className="flex flex-col gap-2">
              <p className="font-bold text-primary text-base">
                2. Is account needed?
              </p>
              <p className="indent-4">
                You need to have an account to use Moneytor. But, please do not
                use your sensitive information when creating an account.
                Moneytor uses Clerk for user authentication.
              </p>
              <p className="indent-4">
                A username and a password is all you need to create an account.
                No full names, no age, or anything.
              </p>
              <p className="indent-4 text-warning">
                In short: Only register a dummy account.
              </p>
            </li>
            <li className="flex flex-col gap-2">
              <p className="font-bold text-primary text-base">
                3. Where does Moneytor store these lists?
              </p>
              <p className="indent-4">
                Moneytor uses Firebase's Firestore to store datas, and Clerk for
                authentication. Moneytor also use your localStorage to store
                information about your selected theme, list sorting, and modal
                states.
              </p>
            </li>
          </ul>
        </section>
        <ButtonGroup className="flex gap-[1px]">
          <Button as={Link} href="/" className="text-xs font-bold">
            <BiSolidLeftArrow />
            HOME
          </Button>
          <Button as={Link} href="/dashboard" className="text-xs font-bold">
            DASHBOARD
            <BiSolidRightArrow />
          </Button>
        </ButtonGroup>
      </article>
    </main>
  );
}
