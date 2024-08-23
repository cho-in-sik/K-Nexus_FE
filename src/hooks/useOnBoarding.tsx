import { create } from 'zustand';

interface OnBoardingState {
  steps: string[];
  setSteps: (newStep: string) => void;
}

export const useOnBoarding = create<OnBoardingState>((set) => ({
  steps: [],
  setSteps: (newStep: string) =>
    set((prev: any) => ({
      steps: [...prev.steps, newStep],
    })),
}));
