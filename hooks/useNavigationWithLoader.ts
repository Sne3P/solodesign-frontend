'use client';

import { useRouter } from 'next/navigation';
import { useLoading } from '../lib/LoadingContext';

export const useNavigationWithLoader = () => {
  const router = useRouter();
  const { startLoading } = useLoading();

  const navigateTo = (path: string) => {
    startLoading();
    router.push(path);
  };

  const navigateBack = () => {
    startLoading();
    router.back();
  };

  const navigateForward = () => {
    startLoading();
    router.forward();
  };

  return {
    navigateTo,
    navigateBack,
    navigateForward,
    router
  };
};
