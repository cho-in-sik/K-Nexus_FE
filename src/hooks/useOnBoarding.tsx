import { create } from 'zustand';

export const useOnBoarding = create((set) => ({
  steps: [],
  setMemos: (newStep: string) =>
    set((prev: any) => ({
      steps: [...prev.steps, newStep],
    })),
}));
