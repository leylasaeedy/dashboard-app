import { Log } from "@/types/Log.type";
import { create } from "zustand";

interface LogState {
  logs: Log[];
  addLog: (log: Omit<Log, "timestamp">) => void;
  removeLogs: () => void;
}

export const useLogsStore = create<LogState>((set) => ({
  logs: [],
  addLog: (log) =>
    set((state) => ({
      logs: [...state.logs, { ...log, timestamp: new Date().toISOString() }],
    })),
  removeLogs: () =>
    set(() => ({
      logs: [],
    })),
}));
