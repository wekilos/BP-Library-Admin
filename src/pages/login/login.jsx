import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { axiosInstance } from "../../utils/axiosIntance";

const Login = () => {
  const [passType, setPassType] = useState("password");
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axiosInstance
      .post("/api/admin/login", {
        email: email,
        password: password,
      })
      .then((data) => {
        console.log(data.data);
        if (data.data?.token) {
          localStorage.setItem("userData", JSON.stringify(data.data));
          history.push({ pathname: "/categories" });
        } else {
          console.log("eeeeeeee");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="max-h-[100vh] w-full flex justify-between">
      <div className="w-full pl-[60px] h-[100vh] flex flex-col justify-around">
        <div className="flex gap-4  items-center">
          <div className="bg-[#0075FF] w-[50px] h-[50px] rounded-[100%] text-white font-[900] leading-[50px] text-center text-[25px]">
            @
          </div>
          <div className="text-[28px] font-[500] text-blck">E-Kitaphana</div>
        </div>

        <div className="">
          <h1 className="text-[28px] text-center font-[400] text-black">
            Türkmenistanyň Baş prokuraturasynyň <br /> E-Kitaphana platformasyna
            hoş geldiňiz!
          </h1>
        </div>

        <div className="mx-auto">
          <div className="w-[400px] flex flex-wrap gap-1">
            <label className="text-[16px]  font-[500]" htmlFor="phone">
              Ulanyjy ady
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") login();
              }}
              id="phone"
              name="phone"
              className="px-4 text-[#98A2B2] text-[16px] font-[400] h-[50px] w-[400px] rounded-[6px] border-[1px] border-[#98A2B2] outline-none"
              type="text"
              placeholder="Giriz"
            />
          </div>

          <div className="w-[400px] mt-4 flex flex-wrap gap-1">
            <label className="text-[16px]  font-[500]" htmlFor="password">
              Açar sözi
            </label>
            <div className="relative w-[400px] mb-[40px]">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") login();
                }}
                id="password"
                name="password"
                className="px-4 absolute left-0 z-10 text-[#98A2B2] text-[16px] font-[400] leading-[50px] h-[50px] w-[400px] rounded-[6px] border-[1px] border-[#98A2B2] outline-none"
                type={passType}
                placeholder="*********"
              />
              {passType == "password" ? (
                <VisibilityOffIcon
                  onClick={() => setPassType("text")}
                  className="z-20 text-[24px] text-blue absolute cursor-pointer right-3 top-3"
                />
              ) : (
                <VisibilityIcon
                  onClick={() => setPassType("password")}
                  className="z-20 text-[24px] text-blue absolute cursor-pointer right-3 top-3"
                />
              )}
            </div>
          </div>

          <button
            onClick={() => login()}
            className=" text-white text-[16px] mt-[30px] bg-blue font-[500] leading-[50px] h-[50px] w-[400px] rounded-[8px] "
          >
            Ulgama gir
          </button>
        </div>

        <div className="text-[16px] mx-auto font-[500] text-[#98A2B2] w-[350px]">
          Açar sözi we admin maglumatlary üýtgetmek üçin super admina ýüz tutuň.
        </div>
      </div>
    </div>
  );
};
export default Login;
