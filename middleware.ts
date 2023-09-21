import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/",
    "/get-started",
    "/app/sign-in/[[...sign-in]]/page.jsx",
    "/app/sign-out/[[...sign-up]]/page.jsx",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
