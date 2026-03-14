export function LoadingSpinner({ size = 18 }: { size?: number }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-white/20 border-t-teal-400"
      style={{ width: size, height: size }}
      aria-label="Loading"
    />
  );
}
