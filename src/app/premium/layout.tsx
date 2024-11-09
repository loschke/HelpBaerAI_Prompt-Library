import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  // Redirect premium users to profile
  if (session.user.subscriptionTier === "PREMIUM") {
    redirect("/auth/profile");
  }

  return <>{children}</>;
}
