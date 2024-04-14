import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import apiRequest from '../lib/apiRequest';

type NotificationState = {
  number: number;
};
type NotificationAction = {
  // decreaseOn:(number:NotificationState['number'])=>void;
  fetch: () => void;
  decrease: () => void;
  reset: () => void;
};

export const useNotificationStore = create<NotificationState & NotificationAction>()(
  devtools((set) => ({
    number: 0,
    fetch: async () => {
      const res = await apiRequest('/user/notification');
      set({ number: res.data });
    },
    decrease: () => {
      set((prev) => ({ number: prev.number - 1 }));
    },
    reset: () => set({ number: 0 }),
  })),
);
