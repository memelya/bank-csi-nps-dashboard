import { useEffect, useRef, useState, type ReactNode } from "react";

type ChartFrameProps = {
  height: number;
  mobileHeight?: number;
  children: (size: { width: number; height: number }) => ReactNode;
};

export function ChartFrame({ height, mobileHeight, children }: ChartFrameProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(360);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const rect = element.getBoundingClientRect();
      setWidth(Math.max(280, Math.floor(rect.width)));
      setIsMobile(window.innerWidth < 640);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const effectiveHeight = isMobile && mobileHeight ? mobileHeight : height;

  return (
    <div ref={ref} className="chart-frame" style={{ minHeight: effectiveHeight }}>
      {children({ width, height: effectiveHeight })}
    </div>
  );
}
