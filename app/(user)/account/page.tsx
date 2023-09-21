"use client";
import { useUser, UserButton } from "@clerk/nextjs";
export default function Account() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <div className="flex-1 w-full p-4 rounded-l-xl max-h-full h-full overflow-y-auto overflow-x-hidden">
      Hello! {user?.fullName}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
