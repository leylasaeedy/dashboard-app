import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      router.replace("/dashboard/users");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
}
