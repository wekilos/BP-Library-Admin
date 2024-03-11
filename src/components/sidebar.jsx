import React from "react";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import { Workspaces, Description } from "@mui/icons-material";
import { closeSidebar } from "./utils";
import { useHistory, useLocation } from "react-router-dom";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { logout } from "../utils/index";
import { axiosInstance } from "../utils/axiosIntance";

const Sidebar = () => {
  const path = useLocation();
  const [openModal, setOpenModal] = React.useState(false);
  const history = useHistory();
  const [groups, setGroups] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getGroups();
  }, []);

  const getGroups = () => {
    setLoading(true);
    axiosInstance
      .get("/api/category/all")
      .then((data) => {
        setLoading(false);
        console.log(data.data);
        setGroups(data.data?.rows);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Sheet
      className="!p-[0px] !bg-[#F7F8FA]"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 100,
        padding: 0,
        height: "100dvh",
        // minHeight: "90vh",
        width: "250px",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        // gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <div
        onClick={() => closeSidebar()}
        className="min-h-[72px] h-[72px] font-[600] text-[22px] border-b-[1px] border-[#E9EBF0] flex items-center justify-start pl-7"
      >
        E-Kitaphana Admin
      </div>

      <Box
        className="p-3"
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <h1 className="text-[14px] my-[10px] font-[600] text-[#98A2B2] px-3 ">
          Dolandyryş paneli
        </h1>
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem className="h-[50px] hover:bg-[#3B82F6]">
            <ListItemButton
              selected={path.pathname.includes("/categories")}
              onClick={() => history.push({ pathname: "/categories" })}
            >
              <Workspaces className="text-blue" />

              <ListItemContent>
                <div
                  className={`text-[14px] font-[500] ${
                    path.pathname.includes("/categories")
                      ? " text-blue "
                      : " text-black "
                  } `}
                >
                  Kategoriýalar
                </div>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {groups?.map((item, i) => {
            return (
              <ListItem
                key={"categoronSide" + i}
                className="h-[50px] hover:bg-[#3B82F6]"
              >
                <ListItemButton
                  selected={path.pathname.includes("/category/" + item?.id)}
                  onClick={() =>
                    history.push({ pathname: "/category/" + item?.id })
                  }
                >
                  {/* <div
                    className=" "
                    dangerouslySetInnerHTML={{ __html: item?.icon }}
                  /> */}
                  <Description className="text-blue " />
                  <ListItemContent>
                    <div
                      className={`text-[14px] line-clamp-2 font-[500] ${
                        path.pathname.includes("/category/" + item?.id)
                          ? " text-blue "
                          : " text-black "
                      } `}
                    >
                      {item?.name_tm}
                    </div>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            );
          })}

          <ListItem className="h-[50px] hover:bg-[#3B82F6]">
            <ListItemButton
              onClick={() => history.push({ pathname: "/admins" })}
              selected={path?.pathname == "/admins"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
                  fill="#3B82F6"
                />
              </svg>

              <ListItemContent>
                <div
                  className={`text-[14px] font-[500] ${
                    path.pathname.includes("/admins")
                      ? " text-blue "
                      : " text-black "
                  } `}
                >
                  Adminler
                </div>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          {/* <ListItem className="h-[50px] hover:bg-[#3B82F6]">
            <ListItemButton
              onClick={() => history.push({ pathname: "/logs" })}
              selected={path?.pathname == "/logs"}
            >
              <PrivacyTipIcon className="text-blue" />

              <ListItemContent>
                <div className="text-[14px] font-[500] text-black">Loglar</div>
              </ListItemContent>
            </ListItemButton>
          </ListItem> */}
        </List>

        <div className="border-t-[1px] border-[#E9EBF0] my-1"></div>
        <List
          className=""
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 0,
          }}
        >
          <ListItem>
            <ListItemButton onClick={() => setOpenModal(true)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.125 12C16.125 11.5858 15.7892 11.25 15.375 11.25L4.40244 11.25L6.36309 9.56944C6.67759 9.29988 6.71401 8.8264 6.44444 8.51191C6.17488 8.19741 5.7014 8.16099 5.38691 8.43056L1.88691 11.4306C1.72067 11.573 1.625 11.7811 1.625 12C1.625 12.2189 1.72067 12.427 1.88691 12.5694L5.38691 15.5694C5.7014 15.839 6.17488 15.8026 6.44444 15.4881C6.71401 15.1736 6.67759 14.7001 6.36309 14.4306L4.40244 12.75L15.375 12.75C15.7892 12.75 16.125 12.4142 16.125 12Z"
                  fill="#FF4D4D"
                />
                <path
                  d="M9.375 8C9.375 8.70219 9.375 9.05329 9.54351 9.3055C9.61648 9.41471 9.71025 9.50848 9.81946 9.58145C10.0717 9.74996 10.4228 9.74996 11.125 9.74996L15.375 9.74996C16.6176 9.74996 17.625 10.7573 17.625 12C17.625 13.2426 16.6176 14.25 15.375 14.25L11.125 14.25C10.4228 14.25 10.0716 14.25 9.8194 14.4185C9.71023 14.4915 9.6165 14.5852 9.54355 14.6944C9.375 14.9466 9.375 15.2977 9.375 16C9.375 18.8284 9.375 20.2426 10.2537 21.1213C11.1324 22 12.5464 22 15.3748 22L16.3748 22C19.2032 22 20.6174 22 21.4961 21.1213C22.3748 20.2426 22.3748 18.8284 22.3748 16L22.3748 8C22.3748 5.17158 22.3748 3.75736 21.4961 2.87868C20.6174 2 19.2032 2 16.3748 2L15.3748 2C12.5464 2 11.1324 2 10.2537 2.87868C9.375 3.75736 9.375 5.17157 9.375 8Z"
                  fill="#FF4D4D"
                />
              </svg>
              <div className="text-[14px] leading-[40px] h-[40px] font-[500] !text-[#FF4D4D]">
                Çykmak
              </div>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <div className="flex w-[350px] border-b-[1px] border-[#E9EBF0] pb-5 justify-between items-center">
            <h1 className="text-[20px] font-[500]">Ulgamdan çykmak</h1>
            <button onClick={() => setOpenModal(false)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 1L1.00006 14.9999M0.999999 0.999943L14.9999 14.9999"
                  stroke="#B1B1B1"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div>
            <h1 className="text-[16px] text-center my-10 font-[400]">
              Ulgamdan çykmak isleýärsiňizmi?
            </h1>

            <div className="flex gap-[29px] justify-center">
              <button
                onClick={() => setOpenModal(false)}
                className="text-[14px] font-[500] px-6 py-3 text-[#98A2B2] rounded-[8px] hover:bg-blue hover:text-white"
              >
                Goýbolsun et
              </button>
              <button
                onClick={() => {
                  logout();
                  history.push({ pathname: "/login" });
                }}
                className="text-[14px] font-[500] text-white hover:bg-[#fd6060] bg-[#FF4D4D] rounded-[8px] px-6 py-3"
              >
                Ulgamdan çyk
              </button>
            </div>
          </div>
        </Sheet>
      </Modal>
      <Divider />
    </Sheet>
  );
};

export default React.memo(Sidebar);
