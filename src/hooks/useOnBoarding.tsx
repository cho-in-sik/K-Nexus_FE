import { create } from 'zustand';

interface OnBoardingState {
  steps: string[];
  setSteps: (newSteps: string[]) => void;
}

export const useOnBoarding = create<OnBoardingState>((set) => ({
  steps: [],
  setSteps: (newSteps: string[]) =>
    set(() => ({
      steps: newSteps,
    })),
}));
