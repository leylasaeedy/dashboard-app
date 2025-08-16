import { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "./api.constants";

async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export const useUsersQuery = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
