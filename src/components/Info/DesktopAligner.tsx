import type { ReactNode } from "react";

export default function InfoDesktopAligner({
  left,
  children,
}: {
  left: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:max-w-[1280px] lg:mx-auto lg:mb-40">
      <div className="lg:max-w-[400px] min-w-0">
        <div className="person-scrollbar sticky top-0 lg:h-screen overflow-y-auto overflow-x-hidden">
          <div className="lg:h-full flex flex-col">{left}</div>
        </div>
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
