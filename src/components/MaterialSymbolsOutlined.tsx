interface MaterialSymbolsOutlinedProps {
  children: string;
  className?: string;
}

export function MaterialSymbolsOutlined({ children, className = '' }: MaterialSymbolsOutlinedProps) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {children}
    </span>
  );
} 