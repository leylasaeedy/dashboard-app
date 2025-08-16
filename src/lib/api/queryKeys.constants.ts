export const userKeys = {
  all: ["users"] as const,
  details: (id: number) => ["users", id] as const,
};
