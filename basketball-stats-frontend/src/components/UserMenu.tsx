import { User as UserIcon } from "lucide-react";
import { User } from "../types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserMenuPropsType = {
  user: User;
};

const UserMenu = ({ user }: UserMenuPropsType) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const signOut = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div
      className="flex justify-end mb-4 mx-6 items-center gap-2 cursor-pointer"
      ref={menuRef}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-center border border-1 rounded-full">
        <UserIcon className="h-4 w-4 text-slate-600" />
      </div>
      <div className="relative">
        <div className="flex gap-1 items-center">
          Welcome back
          <p className="text-[#3b82f6]">{user.username}</p>
        </div>
        {open && (
          <div className="absolute bg-white w-full p-2 mt-2 rounded-md border border-1 border-slate-200">
            <button
              role="menuitem"
              className="w-full text-left py-2 px-2 rounded-lg text-sm "
            >
              Settings
            </button>
            <button
              role="menuitem"
              className="w-full text-left py-2 px-2 rounded-lg hover:bg-rose-50 text-sm text-rose-600 cursor-pointer"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
