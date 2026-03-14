'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSettingsTelegram } from '../featureService/useSettingsTelegram';

export default function SettingsTelegramPage() {
  const {
    linkTelegram,
    loading,
    me,
    platformIdInput,
    setPlatformIdInput,
    telegram,
    unlinkTelegram,
  } = useSettingsTelegram();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-white/50">Manage identity linking and platform connections.</p>
      </div>

      <Card className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Telegram link</h2>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-white/60">Your Platform ID</p>
          <p className="mt-1 font-mono text-lg text-teal-400">{me?.platformId || 'OYS-XXXX'}</p>
          <p className="mt-2 text-xs text-white/40">
            Open Telegram bot, run /start, then submit this Platform ID to link accounts.
          </p>
        </div>

        {telegram?.linked ? (
          <div className="space-y-3">
            <p className="text-sm text-green-400">
              Linked to @{telegram.username || 'telegram-user'}
            </p>
            <Button variant="danger" onClick={unlinkTelegram} disabled={loading}>
              {loading ? 'Updating…' : 'Unlink Telegram'}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              value={platformIdInput}
              onChange={(event) => setPlatformIdInput(event.target.value)}
              placeholder="Enter Platform ID from Telegram"
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-teal-400/60"
            />
            <Button onClick={linkTelegram} disabled={loading}>
              {loading ? 'Linking…' : 'Link Telegram'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
