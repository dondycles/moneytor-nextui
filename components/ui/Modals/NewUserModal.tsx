"use client";
import { useTheme, useUserState } from "@/store";
import { useUser } from "@clerk/nextjs";
import {
  Avatar,
  Button,
  ButtonGroup,
  Chip,
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
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  BiArrowBack,
  BiSolidArrowToLeft,
  BiSolidLeftArrow,
  BiSolidRightArrow,
  BiSolidSortAlt,
} from "react-icons/bi";
import { IoMdEyeOff, IoMdHappy } from "react-icons/io";
import {
  MdAnalytics,
  MdArrowBack,
  MdArrowDropDown,
  MdArrowDropUp,
  MdDarkMode,
  MdDelete,
  MdEdit,
  MdSpaceDashboard,
} from "react-icons/md";
import { usePhpPeso } from "@/lib/hooks/phpformatter";
import { montserrat } from "@/components/provider/nextUi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { BsDot } from "react-icons/bs";
export default function NewUserModal() {
  const theme = useTheme();
  const { user } = useUser();
  const tutorialcontainer = useRef<HTMLDivElement>(null);
  const [showReasons, setShowReasons] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    tutorialIndex: 0,
  });
  const userState = useUserState();
  const [hydrate, setHydrate] = useState(false);

  const history = [
    {
      source: "GCash",
      insertedAmount: 200,
      total: 200,
    },
    {
      source: "MAYA",
      insertedAmount: 100,
      total: 300,
    },
    {
      source: "BDO",
      insertedAmount: -150,
      total: 150,
    },
    {
      source: "UNO",
      insertedAmount: 500,
      total: 650,
    },
  ];

  const categorizedMoney = [
    { category: "Savings", total: 450, color: "green" },
    { category: "Allowance", total: 50, color: "blue" },
    { category: "Time Deposit", total: 1050, color: "red" },
  ];

  const gradientOffset = () => {
    const dataMax = Math.max(...history.map((i) => i.insertedAmount));
    const dataMin = Math.min(...history.map((i) => i.insertedAmount));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const tutorial = [
    <>
      <p className=" text-center">
        Let's take a fast tutorial on how to use Moneytor!
      </p>
      <p className=" text-center">
        You will learn about its pages, tools, and other features.
      </p>
      <div className="text-4xl flex justify-center text-primary">
        <IoMdHappy />
      </div>
    </>,
    <>
      <p>
        The <span className="font-bold text-primary">Side Bar</span> is located
        in the left part of the screen. It contains the buttons for navigation
        and other functions.
      </p>
      <Table isStriped color="primary" classNames={{ wrapper: " p-2" }}>
        <TableHeader>
          <TableColumn>BUTTON</TableColumn>
          <TableColumn>FUNCTION</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Button
                isIconOnly
                variant="shadow"
                color="primary"
                className={`text-xl  text-white `}
              >
                <MdSpaceDashboard />
              </Button>
            </TableCell>
            <TableCell>
              <p>
                Navigates you to the{" "}
                <span className="text-primary font-bold"> Dashboard Page</span>{" "}
                where all your moneys are listed.{" "}
              </p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button
                isIconOnly
                variant="shadow"
                color="primary"
                className={`text-xl  text-white `}
              >
                <MdAnalytics />
              </Button>
            </TableCell>
            <TableCell>
              <p>
                Navigates you to the{" "}
                <span className="text-primary font-bold"> Analytics Page</span>{" "}
                where you can see the movement of your money visualy through
                graphs.
              </p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button
                isIconOnly
                variant="shadow"
                color="primary"
                className={`text-xl  text-white `}
              >
                <MdDarkMode />
              </Button>
            </TableCell>
            <TableCell>
              <p>Toggles the theme between Dark and Light Mode.</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button
                isIconOnly
                variant="shadow"
                color="primary"
                className={`text-xl  text-white `}
              >
                <IoMdEyeOff />
              </Button>
            </TableCell>
            <TableCell>
              <p>Hides or shows the amount. </p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button
                isIconOnly
                variant="shadow"
                color="primary"
                className={`text-xl  text-white `}
              >
                <BiSolidSortAlt />
              </Button>
            </TableCell>
            <TableCell>
              <p>Re-orders the moneys listed in the Dashboard Page.</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>,
    <>
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
    </>,
    <>
      <p>Each money is represented like this.</p>
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
      <Table isStriped color="primary" classNames={{ wrapper: " p-2" }}>
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
    </>,
    <>
      <p>Each money is editable!</p>
      <div className="bg-foreground/5 rounded-xl w-full flex flex-row gap-1">
        <div className="flex-1 w-full self-stretch flex justify-center flex-col gap-1 bg-primary/5 px-4 p-1 rounded-xl">
          <p className="h-1/2 text-lg font-bold text-primary flex items-center gap-2">
            Maya{" "}
            <span className="text-foreground font-normal text-sm">
              - Allowance
            </span>
          </p>
          <Divider />
          <Button
            onClick={() => setShowReasons((prev) => !prev)}
            as={"p"}
            className="h-1/2 text-lg font-bold text-primary flex items-center justify-center bg-transparent"
          >
            <span className="ml-auto">{usePhpPeso(20)}</span>
            <span className="ml-auto mr-0 text-xl text-white">
              {!showReasons ? <MdArrowDropDown /> : <MdArrowDropUp />}
            </span>
          </Button>
          {showReasons && (
            <p className="pb-2 flex gap-2 flex-wrap">
              <Chip color="success" variant="shadow">
                Salary
              </Chip>
              <Chip color="danger" variant="shadow">
                Bought Snacks
              </Chip>
            </p>
          )}
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
      <Table isStriped color="primary" classNames={{ wrapper: " p-2" }}>
        <TableHeader>
          <TableColumn>BUTTON</TableColumn>
          <TableColumn>FUNCTION</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow className=" justify-start">
            <TableCell className="">
              <Button
                isIconOnly
                color="warning"
                variant="shadow"
                className="text-white text-xl"
              >
                <MdEdit />
              </Button>
            </TableCell>
            <TableCell className="flex flex-col gap-2">
              <p>
                Allows you to edit the money's source, category, and to add or
                deduct to the current amount, or just input a new amount.
              </p>

              <p>Clicking this will pop up a modal.</p>
              <div className="w-full rounded-xl bg-gradient-to-b from-transparent to-primary/10 p-4 flex flex-col gap-2">
                <p className="text-warning  font-bold flex flex-row gap-2 items-center">
                  <MdEdit />
                  Editing...
                </p>
                <Input
                  placeholder="Source"
                  color="warning"
                  variant="bordered"
                />
                <Input
                  placeholder="Category"
                  color="warning"
                  variant="bordered"
                />
                <p className="text-warning text-xs">
                  Select action for amount.
                </p>
                <ButtonGroup className="w-full">
                  <Button className="flex-1 text-xs font-bold">ADD</Button>
                  <Button className="flex-1 text-xs font-bold">DEDUCT</Button>
                  <Button className="flex-1 text-xs font-bold">NEW</Button>
                </ButtonGroup>
              </div>
              <p className=" text-warning">
                Note: Upon editing the amount, you are required to state your
                reason.
              </p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button
                isIconOnly
                color="danger"
                variant="shadow"
                className="text-white text-xl"
              >
                <MdDelete />
              </Button>
            </TableCell>
            <TableCell>
              <p>Deletes the money. This can't be undone, just to be aware.</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button
                isIconOnly
                color="danger"
                className="text-white text-xl bg-transparent"
              >
                <MdArrowDropDown />
              </Button>
            </TableCell>
            <TableCell className="flex flex-col gap-2">
              <p>Shows the recent 3 reasons of changes in amount.</p>
              <div className="bg-foreground/5 rounded-xl w-full flex flex-row gap-1">
                <div className="flex-1 w-full self-stretch flex justify-center flex-col gap-1 bg-primary/5 px-4 p-1 rounded-xl">
                  <p className="h-1/2 text-lg font-bold text-primary flex items-center gap-2">
                    Maya{" "}
                    <span className="text-foreground font-normal text-sm">
                      - Allowance
                    </span>
                  </p>
                  <Divider />
                  <p className="h-1/2 text-lg font-bold text-primary flex items-center justify-center bg-transparent">
                    <span className="ml-auto">{usePhpPeso(20)}</span>
                    <span className="ml-auto mr-0 text-xl text-white">
                      {!showReasons ? <MdArrowDropDown /> : <MdArrowDropUp />}
                    </span>
                  </p>
                  <p className="flex gap-2 flex-wrap">
                    <Chip color="success" variant="shadow">
                      Salary
                    </Chip>
                    <Chip color="danger" variant="shadow">
                      Bought Snacks
                    </Chip>
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
              <p className=" text-warning">
                Note: This button is only visible when there is at least 1
                reason already.
              </p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>,
    <>
      <p>
        In the <span className="text-primary font-bold">Analytics</span> Page,
        this is where you can see the movement of your money visualy through
        graphs.
      </p>

      <div className="p-2 rounded-xl bg-foreground/5 flex flex-col gap-8">
        <p>
          Currently, we have an Area Chart that reports the movement of recent 8
          transactions including the added and deducted value and also the total
          money you have.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={history}
            className={" box-border"}
            barGap={0}
            stackOffset="sign"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="source"
              fontSize={12}
              tickLine={true}
              axisLine={true}
            />
            <YAxis fontSize={12} tickLine={true} axisLine={true} />
            <Tooltip contentStyle={{ color: "blueviolet" }} />

            <ReferenceLine y={0} stroke="#06b6d4" />
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset={gradientOffset()}
                  stopColor="green"
                  stopOpacity={1}
                />
                <stop
                  offset={gradientOffset()}
                  stopColor="pink"
                  stopOpacity={1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="insertedAmount"
              stroke={theme.theme === "light" ? "#444" : "#ddd"}
              fill="url(#splitColor)"
              type="monotone"
            />
            <Area
              dataKey="total"
              stroke={theme.theme === "light" ? "#444" : "#ddd"}
              fill="#06b6d4"
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="w-full rounded-xl flex justify-evenly bg-black/50">
          <p className=" text-green-200 flex items-center">
            <span className="text-4xl">
              <BsDot />
            </span>
            Added
          </p>
          <p className=" text-pink-200 flex items-center">
            <span className="text-4xl">
              <BsDot />
            </span>
            Deducted
          </p>
          <p className=" text-[#06b6d4] flex items-center">
            <span className="text-4xl">
              <BsDot />
            </span>
            Total
          </p>
        </div>
      </div>
      <div className="p-2 rounded-xl bg-foreground/5  flex flex-col gap-8">
        <p>
          We also have a Bar Chart that reports total amount of each category.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart barGap={0} data={categorizedMoney} stackOffset="sign">
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="category"
              stroke="#06b6d4"
              fontSize={12}
              tickLine={true}
              axisLine={true}
            />
            <YAxis fontSize={12} tickLine={true} axisLine={true} />
            <Tooltip contentStyle={{ color: "blueviolet" }} />

            <ReferenceLine y={0} stroke="#06b6d4" />

            <Bar
              dataKey="total"
              stroke={theme.theme === "light" ? "#444" : "#ddd"}
              fill="#06b6d4"
              stackId="b"
              radius={[4, 4, 4, 4]}
            >
              {categorizedMoney &&
                categorizedMoney.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={categorizedMoney[index].color}
                  />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-warning">
        Note: There will be more charts upcoming soon!
      </p>
    </>,
    <></>,
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
              {modalState.tutorialIndex === 0 && (
                <>
                  Welcome,{" "}
                  <span className="text-primary">{user?.username}</span>!
                </>
              )}
              {modalState.tutorialIndex === 1 && (
                <span className="text-primary">Side Bar</span>
              )}
              {modalState.tutorialIndex === 2 && (
                <span className="text-primary">Dashboard Page</span>
              )}
              {modalState.tutorialIndex === 3 && (
                <span className="text-primary">
                  Dashboard Page - Adding Money
                </span>
              )}
              {modalState.tutorialIndex === 4 && (
                <span className="text-primary">
                  Dashboard Page - Editing Money
                </span>
              )}
              {modalState.tutorialIndex === 5 && (
                <span className="text-primary">Analytics Page</span>
              )}
            </p>
            {/* <Avatar src="/favicon.ico" radius="sm" /> */}
          </ModalHeader>
          <Divider />
          <ModalBody
            id="tutorialcontainer"
            className="sm:text-sm text-xs relative min-h-0 max-h-[70dvh] h-screen overflow-x-hidden overflow-y-auto"
          >
            <motion.div
              initial={{ translateX: -20 }}
              animate={{ translateX: 0 }}
              exit={{ translateX: 20, opacity: 0 }}
              key={modalState.tutorialIndex}
              className="h-full flex flex-col gap-2"
              onLoad={() => scrollTo({ top: 0 })}
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
                setTimeout(() => {
                  document.getElementById("tutorialcontainer")!.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }, 500);
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
                setTimeout(() => {
                  document.getElementById("tutorialcontainer")!.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }, 500);
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
