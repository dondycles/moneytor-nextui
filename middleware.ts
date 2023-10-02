import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/",
    "/how-moneytor-works",
    "/app/sign-in/[[...sign-in]]/page.jsx",
    "/app/sign-out/[[...sign-up]]/page.jsx",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
