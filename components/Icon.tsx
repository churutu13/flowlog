type IconProps = {
  name: string;
  className?: string;
  fill?: boolean;
};

export function Icon({ name, className = "", fill = false }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24` }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
