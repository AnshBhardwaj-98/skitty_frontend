import { LogOut, SettingsIcon } from "lucide-react";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, authlogout } = useAuthStore();
  return (
    <div>
      <div className="navbar bg-base-100 shadow-xl px-4">
        <div className="flex-1">
          <Link to={"/"}>
            <div className="btn btn-ghost text-xl">
              <div className=" h-full w-10 p-1">
                <img src="src/assets/skit.png" alt="" className="size-full" />
              </div>
              Skitty
            </div>
          </Link>
        </div>
        {authUser ? (
          <div className="flex gap-8 items-center justify-between">
            <Link to={"/profile"}>
              <div className=" size-10  rounded-full overflow-hidden bg-white	hover:animate-pulse">
                <img
                  alt="Tailwind CSS Navbar component "
                  className=" w-full h-full object-cover	"
                  src={
                    authUser && authUser.profilePic
                      ? authUser.profilePic
                      : "src/assets/user.png"
                  }
                />
              </div>
            </Link>
            <Link to={"/settings"} className="hover:animate-spin">
              <SettingsIcon />
            </Link>

            <div className="bg-red-500 rounded-full p-2 flex items-center justify-center hover:animate-pulse">
              <LogOut onClick={authlogout} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
