import { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "./api.constants";

async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`${API_BASE}/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export const useUserDetailsQuery = (id: number, enabled: boolean) =>
  useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUser(id),
    enabled,
  });
