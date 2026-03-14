'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { telegramApi, userApi } from '@/lib/api/client';
import type {
  TelegramLinkStatus,
  UserProfile,
} from '../types/settings-telegram.types';

export function useSettingsTelegram() {
  const [platformIdInput, setPlatformIdInput] = useState('');
  const [loading, setLoading] = useState(false);

  const userQuery = useQuery<UserProfile>({
    queryKey: ['me'],
    queryFn: userApi.me,
  });

  const telegramQuery = useQuery<TelegramLinkStatus>({
    queryKey: ['telegram-link'],
    queryFn: telegramApi.status,
  });

  const linkTelegram = async () => {
    if (!platformIdInput) {
      toast.error('Enter your Platform ID');
      return;
    }

    setLoading(true);
    try {
      await telegramApi.link(platformIdInput);
      toast.success('Telegram linked');
      await telegramQuery.refetch();
      setPlatformIdInput('');
    } catch {
      toast.error('Link endpoint unavailable. Verify backend milestone.');
    } finally {
      setLoading(false);
    }
  };

  const unlinkTelegram = async () => {
    setLoading(true);
    try {
      await telegramApi.unlink();
      toast.success('Telegram unlinked');
      await telegramQuery.refetch();
    } catch {
      toast.error('Unlink endpoint unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    me: userQuery.data,
    telegram: telegramQuery.data,
    platformIdInput,
    setPlatformIdInput,
    linkTelegram,
    unlinkTelegram,
  };
}
