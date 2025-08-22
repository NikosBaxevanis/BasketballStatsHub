import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type MainContentPropsType = {
  children: ReactNode;
  className?: string;
};

const MainContent = ({ children, className = "" }: MainContentPropsType) => {
  return (
    <div
      className={`py-8 p-4 bg-white rounded-xl m-4 flex flex-col items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default MainContent;
