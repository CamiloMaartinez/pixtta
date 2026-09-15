interface HudFrameProps {
  className?: string;
}

const CORNER_BASE =
  "absolute h-5 w-5 border-titanium transition-colors duration-150 group-hover:border-ignition";

// Requires the parent element to have `relative group` in its className.
export function HudFrame({ className }: HudFrameProps): React.JSX.Element {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className ?? ""}`}>
      <span className={`${CORNER_BASE} left-2 top-2 border-l-[1.5px] border-t-[1.5px]`} />
      <span className={`${CORNER_BASE} right-2 top-2 border-r-[1.5px] border-t-[1.5px]`} />
      <span className={`${CORNER_BASE} bottom-2 left-2 border-b-[1.5px] border-l-[1.5px]`} />
      <span className={`${CORNER_BASE} bottom-2 right-2 border-b-[1.5px] border-r-[1.5px]`} />
    </div>
  );
}
