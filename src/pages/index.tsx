import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth } from "@/utils/localStorageHandler.utils";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    if (auth) {
      router.replace("/dashboard/users");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
}
