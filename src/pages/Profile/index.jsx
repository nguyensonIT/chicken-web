import { useHandleContext } from "../../contexts/UserProvider";
import logo from "../../assets/img/Logo.png";

const Profile = () => {
  const { user } = useHandleContext();
  console.log(user);

  return (
    <div className="w-full mb-[-20px] bg-bgMainColor min-h-screen">
      <div className="wrapper">
        <div className="top">
          <div className="img w-[100px] h-[100px] rounded-full overflow-hidden">
            <img
              className=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = logo;
              }}
              src={user.image}
              alt="img-user"
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
