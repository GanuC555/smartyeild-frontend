'use client';

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
    <div className="space-y-16">

      {/* Page identity */}
      <div>
        <p className="art-label mb-3">Settings</p>
        <h1 className="text-4xl font-light text-foreground/90" style={{ letterSpacing: '-0.02em' }}>
          Connections
        </h1>
        <p className="mt-2 text-sm text-foreground/40">Manage identity linking and platform integrations.</p>
      </div>

      {/* Telegram section */}
      <div className="space-y-6">
        <div>
          <p className="art-label mb-1">Telegram</p>
          <div className="art-divider-h mt-2" />
        </div>

        {/* Platform ID — mono, white, no colored accent */}
        <div className="space-y-1">
          <p className="text-xs text-foreground/35">Your Platform ID</p>
          <p className="font-mono text-lg" style={{ color: 'hsl(217, 80%, 56%)' }}>
            {me?.platformId || 'OYS-XXXX'}
          </p>
          <p className="text-xs text-foreground/30 leading-relaxed">
            Open the Telegram bot, run /start, then submit this ID to link your account.
          </p>
        </div>

        {telegram?.linked && (
          <div className="space-y-4">
            <p className="text-sm text-foreground/60">
              Linked to{' '}
              <span className="font-medium text-foreground/80">
                @{telegram.username || 'telegram-user'}
              </span>
            </p>
            <button
              onClick={unlinkTelegram}
              disabled={loading}
              className="rounded-xl border border-foreground/10 px-5 py-2.5 text-sm text-foreground/50 transition-colors hover:border-foreground/20 hover:text-foreground/70 disabled:opacity-40"
            >
              {loading ? 'Updating…' : 'Unlink Telegram'}
            </button>
          </div>
        ) }
      </div>

    </div>
  );
}
