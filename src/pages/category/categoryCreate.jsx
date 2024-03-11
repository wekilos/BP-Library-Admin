import React, { useState } from "react";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";

import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { KeyboardArrowDown } from "@mui/icons-material";

const CategoryCreate = () => {
  const history = useHistory();
  const [group, setGroup] = useState({
    card_type: "path",
    icon: "",
    icon_white: "",
    name_tm: "",
    name_ru: "",
    name_en: "",
    link: "",
  });
  const [warning, setWarning] = useState(false);

  const createBrand = () => {
    axiosInstance
      .post("/api/category/create", group)
      .then((data) => {
        console.log(data.data);
        history.push({ pathname: "/categories" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full">
      {/* alert */}
      {warning && (
        <Alert
          className="!fixed z-50 top-5 right-5"
          key={"title"}
          sx={{ alignItems: "flex-start" }}
          startDecorator={<WarningIcon />}
          variant="soft"
          color={"warning"}
          endDecorator={
            <IconButton
              onClick={() => setWarning(false)}
              variant="soft"
              color={"warning"}
            >
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <div>{"Maglumat nädogry!"}</div>
            <Typography level="body-sm" color={"warning"}>
              Maglumatlary doly we dogry girizmeli!
            </Typography>
          </div>
        </Alert>
      )}
      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Kategoriýa</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Kategoriýa goş</h1>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Ady </h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Kategoriýanyň adyny giriziň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={group?.name_tm}
              onChange={(e) => {
                setGroup({ ...group, name_tm: e.target.value });
              }}
              className="text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Adyny giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Icon </h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Kategoriýanyň Iconny SVG görnüşde giriziň.
            </p>
          </div>
          <div className="flex justify-between items-center gap-4 w-[550px]">
            <input
              value={group?.icon}
              onChange={(e) => {
                setGroup({ ...group, icon: e.target.value });
              }}
              className="text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Icon giriz"
              type="text"
            />
            <div
              className="!text-white"
              dangerouslySetInnerHTML={{ __html: group?.icon }}
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Icon white</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Kategoriýanyň ikinji Iconny SVG görnüşde giriziň.
            </p>
          </div>
          <div className="flex gap-4 items-center justify-between w-[550px]">
            <input
              value={group?.icon_white}
              onChange={(e) => {
                setGroup({ ...group, icon_white: e.target.value });
              }}
              className="text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Icon 2-nji giriz"
              type="text"
            />
            <div dangerouslySetInnerHTML={{ __html: group?.icon_white }} />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Kategoriýanyň görnüşi </h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Kategoriýanyň haýsy görnüşe degişlidigini giriziň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <Select
              onChange={(e, value) => setGroup({ ...group, card_type: value })}
              value={group?.card_type}
              placeholder="Hemmesini görkez"
              className="text-[14px] w-full text-[#98A2B2] font-[400] h-[50px]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              indicator={<KeyboardArrowDown className="!text-[16px]" />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              <Option key={"path"} value={"path"}>
                path
              </Option>
              <Option key={"link"} value={"link"}>
                link
              </Option>
            </Select>
          </div>
        </div>

        {group?.card_type == "link" && (
          <div className="flex items-center border-t-[1px] justify-between py-[30px]">
            <div className="w-[380px]">
              <h1 className="text-[18px] font-[500]">Link </h1>
              <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
                Kategoriýa basylanda nirä salgylanmalydygyny giriziň.
              </p>
            </div>
            <div className="flex justify-start w-[550px]">
              <input
                value={group?.link}
                onChange={(e) => {
                  setGroup({ ...group, link: e.target.value });
                }}
                className="text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
                placeholder="Link giriz"
                type="text"
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-full mt-5 flex justify-end items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
        <div className="w-fit flex gap-6 items-center ">
          <button
            onClick={() => history.goBack()}
            className="text-blue text-[14px] font-[500] py-[11px] px-[27px] hover:bg-red hover:text-white rounded-[8px]"
          >
            Goýbolsun et
          </button>
          <button
            onClick={() => createBrand()}
            className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
          >
            Ýatda sakla
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoryCreate);
