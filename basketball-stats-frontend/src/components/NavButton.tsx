import { useNavigate } from "react-router-dom";

type NavButtonPropsType = {
  text: string;
  url: string;
  isActive: boolean;
};

const NavButton = ({ text, url, isActive }: NavButtonPropsType) => {
  const navigate = useNavigate();

  return (
    <button
      className={`nav-btn ${isActive ? "active" : ""}`}
      onClick={() => navigate(url)}
    >
      {text}
    </button>
  );
};

export default NavButton;
