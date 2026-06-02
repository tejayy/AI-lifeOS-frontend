import { useNavigate } from "react-router-dom";

import { authService } from "../../services/auth.service";

import { useAuthStore } from "../../store/auth.store";

export default function UserMenu() {
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  const handleLogout = async () => {
    await authService.logout();

    setUser(null);

    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="
      rounded-lg
      border
      px-4
      py-2
      "
    >
      Logout
    </button>
  );
}
