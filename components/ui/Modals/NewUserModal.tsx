"use client";
import { useTheme, useUserState } from "@/store";
import { useUser } from "@clerk/nextjs";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BiArrowBack,
  BiSolidArrowToLeft,
  BiSolidLeftArrow,
  BiSolidRightArrow,
} from "react-icons/bi";
import { BsArrow90DegDown } from "react-icons/bs";
import { IoMdHappy } from "react-icons/io";
import {
  MdAnalytics,
  MdArrowBack,
  MdDelete,
  MdEdit,
  MdSpaceDashboard,
} from "react-icons/md";
import Money from "../Money";
import { usePhpPeso } from "@/lib/hooks/phpformatter";
import { montserrat } from "@/components/provider/nextUi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
export default function NewUserModal() {
  const theme = useTheme();
  const { user } = useUser();
  const [modalState, setModalState] = useState({
    isOpen: false,
    tutorialIndex: 0,
  });
  const userState = useUserState();
  const [hydrate, setHydrate] = useState(false);

  const tutorial = [
    <div className="flex flex-col gap-2 text-center">
      <p>Let's take a fast tutorial on how to use Moneytor!</p>
      <p>You will learn about its pages, tools, and other features.</p>
      <div className="text-4xl flex justify-center text-primary">
        <IoMdHappy />
      </div>
    </div>,
    <div className="flex flex-col gap-2">
      <p>
        This are the primary pages. Navigate to them by clicking its button in
        the left side bar.
      </p>
      <div className="flex flex-row gap-2 bg-foreground/10 rounded-xl p-2">
        <Button
          isIconOnly
          variant="shadow"
          color="primary"
          className={`text-xl  text-white `}
        >
          <MdSpaceDashboard />
        </Button>
        <div className="flex flex-col ">
          <p className=" text-primary font-bold">Dashboard</p>
          <p className=" text-foreground">
            This is where all your moneys are listed.
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-2 bg-foreground/10 rounded-xl p-2">
        <Button
          isIconOnly
          variant="shadow"
          color="primary"
          className={`text-xl  text-white `}
        >
          <MdAnalytics />
        </Button>
        <div className="flex flex-col ">
          <p className=" text-primary font-bold">Analytics</p>
          <p className=" text-foreground">
            This is where you can see the movement of your money visualy through
            graphs.
          </p>
        </div>
      </div>
    </div>,
    <div className="flex flex-col gap-2">
      <p>
        In the <span className="text-primary font-bold">Dashboard</span> Page,
        this is where all your moneys are listed.
      </p>
      <div className="flex flex-col gap-2 bg-foreground/10 rounded-xl p-2">
        <p className=" text-primary font-bold">
          {" "}
          <Button
            isIconOnly
            variant="shadow"
            color="primary"
            className={` text-white `}
          >
            <MdSpaceDashboard />
          </Button>{" "}
          Dashboard
        </p>
        <div className="bg-foreground/5 rounded-xl w-full flex flex-row gap-1">
          <div className="flex-1 w-full self-stretch flex justify-center flex-col gap-1 bg-primary/5 px-4 rounded-xl">
            <p className="h-1/2 text-lg font-bold text-primary flex items-center gap-2">
              Maya{" "}
              <span className="text-foreground font-normal text-sm">
                - Allowance
              </span>
            </p>
            <Divider />
            <p className="h-1/2 text-lg font-bold text-primary flex items-center justify-center">
              {usePhpPeso(20)}
            </p>
          </div>
          <div className="h-full flex flex-col gap-1">
            <Button
              isIconOnly
              color="warning"
              variant="shadow"
              className="text-white text-xl"
            >
              <MdEdit />
            </Button>
            <Button
              isIconOnly
              color="danger"
              variant="shadow"
              className="text-xl"
            >
              <MdDelete />
            </Button>
          </div>
        </div>
        <div className="bg-foreground/5 rounded-xl w-full flex flex-row gap-1">
          <div className="flex-1 w-full self-stretch flex justify-center flex-col gap-1 bg-primary/5 px-4 rounded-xl">
            <p className="h-1/2 text-lg font-bold text-primary flex items-center gap-2">
              GCash{" "}
              <span className="text-foreground font-normal text-sm">
                - Savings
              </span>
            </p>
            <Divider />
            <p className="h-1/2 text-lg font-bold text-primary flex items-center justify-center">
              {usePhpPeso(1)}
            </p>
          </div>
          <div className="h-full flex flex-col gap-1">
            <Button
              isIconOnly
              color="warning"
              variant="shadow"
              className="text-white text-xl"
            >
              <MdEdit />
            </Button>
            <Button
              isIconOnly
              color="danger"
              variant="shadow"
              className="text-xl"
            >
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
    </div>,
    <div className="flex flex-col gap-2">
      <p>Each money is represented like this.</p>
      <div className="flex flex-col gap-2 bg-foreground/10 rounded-xl p-2">
        <div className="bg-foreground/5 rounded-xl w-full flex flex-row gap-1">
          <div className="flex-1 w-full self-stretch flex justify-center flex-col gap-1 bg-primary/5 px-4 rounded-xl">
            <p className="h-1/2 text-lg font-bold text-primary flex items-center gap-2">
              Maya{" "}
              <span className="text-foreground font-normal text-sm">
                - Allowance
              </span>
            </p>
            <Divider />
            <p className="h-1/2 text-lg font-bold text-primary flex items-center justify-center">
              {usePhpPeso(20)}
            </p>
          </div>
          <div className="h-full flex flex-col gap-1">
            <Button
              isIconOnly
              color="warning"
              variant="shadow"
              className="text-white text-xl"
            >
              <MdEdit />
            </Button>
            <Button
              isIconOnly
              color="danger"
              variant="shadow"
              className="text-xl"
            >
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      <p>
        To add a money, click the add button{" "}
        <Button
          variant="shadow"
          color="primary"
          isIconOnly
          className="text-2xl font-black text-white"
        >
          <HiOutlinePlusSmall />
        </Button>{" "}
        in the lower-left part of your screen.
      </p>
      <Divider />
      <p>Then, a modal will pop up!</p>
      <div className="w-full p-2 bg-foreground/5 rounded-xl">
        <div className="max-w-[300px] w-full mx-auto rounded-xl bg-gradient-to-b from-transparent to-primary/10 flex p-4 flex-col gap-2">
          <p className="text-base font-bold text-primary">Add Money</p>
          <Input
            placeholder="Source e.g., 'GCash'"
            variant="bordered"
            color="primary"
          />
          <Input
            placeholder="Category e.g., 'Savings'"
            variant="bordered"
            color="primary"
          />
          <Input placeholder="Amount" variant="bordered" color="primary" />
          <div className="flex flex-tow gap-2 justify-end">
            <Button className="text-xs font-bold" variant="shadow">
              CLOSE
            </Button>
            <Button
              className="text-xs font-bold"
              color="primary"
              variant="shadow"
            >
              ADD
            </Button>
          </div>
        </div>
      </div>
      <Divider />

      <p>There are 3 paramaters when listing a money.</p>
      <Table color="primary" classNames={{ wrapper: " p-2" }}>
        <TableHeader>
          <TableColumn>PARAMETER</TableColumn>
          <TableColumn>DEFINITION</TableColumn>
          <TableColumn>EXAMPLE</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <p className="text-primary font-bold">SOURCE</p>
            </TableCell>
            <TableCell>
              <p>It is where the money came from.</p>
            </TableCell>
            <TableCell>
              <p>MAYA</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <p className="text-primary font-bold">CATEGORY</p>
            </TableCell>
            <TableCell>
              <p>
                A category can be a purpose, type, or anything that can
                categorize a money.
              </p>
            </TableCell>
            <TableCell>
              <p>ALLOWANCE</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <p className="text-primary font-bold">AMOUNT</p>
            </TableCell>
            <TableCell>
              <p>The amount of the money in PHP.</p>
            </TableCell>
            <TableCell>
              <p>{usePhpPeso(69)}</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>,
    <div className="flex flex-col gap-2">
      <p>Each money is editable!</p>
      <div className="flex flex-col gap-2 bg-foreground/10 rounded-xl p-2">
        <div className="bg-foreground/5 rounded-xl w-full flex flex-row gap-1">
          <div className="flex-1 w-full self-stretch flex justify-center flex-col gap-1 bg-primary/5 px-4 rounded-xl">
            <p className="h-1/2 text-lg font-bold text-primary flex items-center gap-2">
              Maya{" "}
              <span className="text-foreground font-normal text-sm">
                - Allowance
              </span>
            </p>
            <Divider />
            <p className="h-1/2 text-lg font-bold text-primary flex items-center justify-center">
              {usePhpPeso(20)}
            </p>
          </div>
          <div className="h-full flex flex-col gap-1">
            <Button
              isIconOnly
              color="warning"
              variant="shadow"
              className="text-white text-xl"
            >
              <MdEdit />
            </Button>
            <Button
              isIconOnly
              color="danger"
              variant="shadow"
              className="text-xl"
            >
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
    </div>,
  ];

  useEffect(() => {
    if (!hydrate) return;
    if (userState.isNewUser)
      setModalState({ isOpen: true, tutorialIndex: modalState.tutorialIndex });
    if (userState.skippedTutorial)
      setModalState({ isOpen: false, tutorialIndex: modalState.tutorialIndex });
  }, [hydrate, userState]);
  useEffect(() => {
    setHydrate(true);
  }, []);
  if (hydrate)
    return (
      <Modal
        backdrop="opaque"
        // isOpen={modalState.isOpen}
        isOpen
        onOpenChange={() => {}}
        radius="lg"
        className={`${theme.theme} ${montserrat.className} bg-gradient-to-b from-transparent to-primary/10 text-foreground max-w-[600px]`}
        placement="center"
        closeButton={<></>}
      >
        <ModalContent>
          <ModalHeader className="items-center">
            <p className="text-center flex-1 font-bold text-base">
              Welcome, <span className="text-primary">{user?.username}</span>!
            </p>
            {/* <Avatar src="/favicon.ico" radius="sm" /> */}
          </ModalHeader>
          <Divider />
          <ModalBody className="sm:text-sm text-xs relative min-h-0 max-h-[400px] h-screen overflow-x-hidden overflow-y-auto">
            <motion.div
              initial={{ translateX: -20 }}
              animate={{ translateX: 0 }}
              exit={{ translateX: 20, opacity: 0 }}
              key={modalState.tutorialIndex}
              className="h-full"
            >
              {tutorial[modalState.tutorialIndex]}
            </motion.div>
          </ModalBody>
          <Divider />

          <ModalFooter>
            <Button
              onClick={() => userState.setSkippedTutorial(true)}
              variant="shadow"
              color="danger"
              className="text-xs font-black text-white ml-0 mr-auto"
            >
              SKIP
            </Button>
            <Button
              onClick={() => {
                setModalState({
                  tutorialIndex: modalState.tutorialIndex - 1,
                  isOpen: true,
                });
              }}
              variant="shadow"
              color="default"
              className="text-xs font-black text-white"
              isIconOnly
            >
              <BiSolidLeftArrow />
            </Button>

            <Button
              onClick={() => {
                setModalState({
                  tutorialIndex: modalState.tutorialIndex + 1,
                  isOpen: true,
                });
              }}
              variant="shadow"
              color="success"
              className="text-xs font-black text-white"
              isIconOnly
            >
              <BiSolidRightArrow />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}
