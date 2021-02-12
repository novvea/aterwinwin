import "./Profile.css";
import { useContext } from "react";
import { UserContext } from "../../shared/provider/UserProvider";
import { ProfileDropDown } from "./profiledropdown/ProfileDropDown";

export const Profile = () => {
  const [authUser] = useContext(UserContext);

  return (
    <div className="profileWrapper">
      <img
        className="profileImg"
        src={"https://thispersondoesnotexist.com/image"}
        alt={"Profilepicture"}
      />
      <div className="profileName">
        {authUser.username}
      </div>
      <ProfileDropDown />
    </div>
  );
};
