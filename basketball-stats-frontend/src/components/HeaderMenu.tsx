import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavButton from "./NavButton";

const HeaderMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];

  return (
    <div className="py-8 p-4 bg-white rounded-xl mx-4 mb-4 flex flex-col items-center justify-center gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
      <div className="text-center">
        <h1 className="text-slate-900 text-4xl font-bold mb-2">
          🏀 Basketball Stats Hub
        </h1>
        <p className="text-slate-500 text-lg">
          Your Ultimate Basketball Statistics Dashboard
        </p>
      </div>
      <nav className="flex justify-center gap-6 flex-wrap">
        <NavButton
          isActive={firstSegment === "dashboard"}
          text={"Home"}
          url="/"
        />
        <NavButton
          isActive={firstSegment === "teams"}
          text={"Teams"}
          url="/teams"
        />
        <NavButton
          isActive={firstSegment === "players"}
          text={"Players"}
          url="/players"
        />
        <NavButton
          isActive={firstSegment === "league-stats"}
          text={"League Stats"}
          url="/league-stats"
        />
      </nav>
    </div>
  );
};

export default HeaderMenu;
