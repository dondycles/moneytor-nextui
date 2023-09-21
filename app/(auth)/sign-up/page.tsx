// import { CardBody, Card, CardHeader, CardFooter } from "@nextui-org/card";
// import { Input } from "@nextui-org/input";
// import { Button } from "@nextui-org/button";
// import { Divider } from "@nextui-org/divider";
import { SignUp } from "@clerk/nextjs";
export default function Sign_Up() {
  return (
    <SignUp />

    // <>
    //   <Card
    //     shadow="sm"
    //     className="max-w-[300px] w-full m-auto bg-background border-1 border-foreground/10"
    //   >
    //     <CardHeader className="flex flex-col p-4 pb-0">
    //       <h1 className="font-bold text-xl sm:text-2xl text-primary">
    //         Moneytor
    //       </h1>
    //       <p className="text-xs sm:text-base">Monitor you money with ease.</p>
    //     </CardHeader>
    //     <CardBody>
    //       <form className="flex gap-4 flex-col">
    //         <Input
    //           type="text"
    //           variant="bordered"
    //           color="primary"
    //           label="Username"
    //         />
    //         <Input
    //           type="password"
    //           variant="bordered"
    //           color="primary"
    //           label="Password"
    //         />
    //         <Button
    //           type="submit"
    //           className="w-full font-bold text-xs text-white"
    //           variant="shadow"
    //           color="primary"
    //         >
    //           LOG IN
    //         </Button>
    //         <Divider />
    //         <Button
    //           variant="shadow"
    //           color="default"
    //           className="font-bold text-xs text-white"
    //         >
    //           GOOGLE
    //         </Button>
    //       </form>
    //     </CardBody>
    //   </Card>
    // </>
  );
}
