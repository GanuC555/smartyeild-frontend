interface NumberDisplayProps {
  value: number;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function NumberDisplay({
  value,
  prefix = '',
  decimals = 2,
  className = '',
}: NumberDisplayProps) {
  return (
    <span className={className}>
      {prefix}
      {value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
