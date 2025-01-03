'use client';

import { createOnboradingInfo } from '@/actions/onBoarding';
import { postOnboarding } from '@/app/api/onBoarding';
import { userInfo } from '@/app/api/user';
import { onBoardingData } from '@/app/constants/onBoarding';

import { useOnBoarding } from '@/hooks/useOnBoarding';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OnBoardingClientComponent() {
  const { setSteps, steps } = useOnBoarding();
  const [step, setStep] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');

  const router = useRouter();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: userInfo,
  });
  console.log(user);

  const updateMutation = useMutation({
    mutationFn: async () => {
      const data = await postOnboarding(steps);
      return data;
    },
    onSuccess: () => router.push('/'),
    onError: () => {
      alert('Failed to update onboarding info');
    },
  });

  useEffect(() => {
    if (step > 3) {
      router.push('/'); // 메인 페이지로 이동
    }
    if (user?.onboarding) {
      router.push('/');
    }
  }, [step, router, user]);

  const handleNext = () => {
    if (step === 0) {
      setStep(1); // Onboarding 시작
    } else if (step === 3) {
      if (selectedValue) {
        const updatedSteps = [...steps];
        updatedSteps[step - 1] = selectedValue; // step 3에 선택된 값 저장
        setSteps(updatedSteps);
      }
      updateMutation.mutate();
    } else {
      if (selectedValue) {
        const updatedSteps = [...steps];
        updatedSteps[step - 1] = selectedValue; // step 1, 2에 선택된 값 저장
        setSteps(updatedSteps);
      }
      setStep(step + 1);
      setDisabled(true);
      setSelectedValue('');
    }
  };

  const handleSelection = (item: string) => {
    setSelectedValue(item);
    setDisabled(false);
  };

  console.log('step', step);
  console.log('steps', steps);

  return (
    <div className="h-screen flex justify-center items-center">
      {step === 0 ? (
        <div className="flex flex-col justify-center items-center text-lg">
          <h1>Hi!</h1>
          <h1>Kolang will help you!</h1>
        </div>
      ) : (
        <div className="flex-auto text-lg">
          <h1 className="mb-8 leading-6">{onBoardingData[step - 1].title}</h1>
          <div className="flex flex-col gap-2 mb-10">
            {onBoardingData[step - 1].content.map((item, i) => (
              <button
                key={i}
                className={`w-full py-3 rounded-lg border-2 text-sm font-medium ${
                  selectedValue === item
                    ? 'bg-[#DFEDFF] text-[#4f5358] border-[#2771D0]'
                    : 'bg-[#F5F5F6] border-[#E7E9EC]'
                }`}
                onClick={() => handleSelection(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="w-full bottom-0 absolute px-5" onClick={handleNext}>
        <button
          disabled={disabled && step !== 0}
          className={`w-full py-4 text-white mb-10 rounded-lg ${
            disabled && step !== 0 ? 'bg-[#CACACA]' : 'bg-[#2771D0]'
          }`}
        >
          {step === 0 ? 'Start' : 'Next'}
        </button>
      </div>
    </div>
  );
}
