import React, { useState, useEffect, useRef } from "react";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory, useParams } from "react-router-dom";
import PageLoading from "../../components/PageLoading";

import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { KeyboardArrowDown, Delete } from "@mui/icons-material";

const CategoryItemCreate = () => {
  const history = useHistory();
  const { id } = useParams();
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState({});
  const [group, setGroup] = useState({
    card_type: "card",
    name_tm: "",
    text_tm: "",
    author: "",
    year: "",
    publishing: "",
  });
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    setLoading(true);
    axiosInstance
      .get("/api/category/" + id, {
        params: { limit: 0, page: 1 },
      })
      .then((data) => {
        setLoading(false);
        console.log(data.data);
        setCategory(data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const CreateCategoryItem = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("card_type", group.card_type);
    formData.append("name_tm", group.name_tm);
    formData.append("author", group.author);
    formData.append("year", group.year);
    formData.append("publishing", group.publishing);
    formData.append("CategoryId", id);
    if (file) {
      formData.append("file", file);
    }

    group.name_tm?.length > 0
      ? axiosInstance
          .post("/api/item/create", formData)
          .then((data) => {
            console.log(data.data);
            setLoading(false);
            history.push({ pathname: "/category/" + id });
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          })
      : setWarning(true);
  };

  const handleFile = async (f) => {
    console.log(f);
    const typeArray = f?.name.split(".");
    const type =
      typeArray?.length > 0 ? typeArray[typeArray?.length - 1] : null;

    if ((type == "pdf" || type == "docx") && f) {
      if (
        group?.name_tm?.length == 0 &&
        group?.year?.length == 0 &&
        type == "docx"
      ) {
        setGroup({
          ...group,
          name_tm: typeArray[0],
          year: typeArray[1],
          card_type: "string",
        });
      }
      if (
        group?.name_tm?.length == 0 &&
        group?.year?.length == 0 &&
        type == "pdf"
      ) {
        setGroup({
          ...group,
          name_tm: typeArray[0],
          year: typeArray[1],
          card_type: "card",
        });
      }
      setFile(f);
    } else {
      setWarning(true);
    }
  };
  return loading ? (
    <PageLoading />
  ) : (
    <div className="w-full">
      {/* alert */}
      {warning ? (
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
      ) : null}
      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">{category?.name_tm}</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">{category?.name_tm} goş</h1>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Ady</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Adyny giriziň.
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
            <h1 className="text-[18px] font-[500]">Card görnüşi </h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Card haýsy görnüşe degişlidigini giriziň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <Select
              onChange={(e, value) => setGroup({ ...group, card_type: value })}
              value={group?.card_type}
              placeholder="Card görnüşi"
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
              <Option key={"card"} value={"card"}>
                Suratly
              </Option>
              <Option key={"string"} value={"string"}>
                Suratsyz
              </Option>
            </Select>
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Author</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Author giriziň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={group?.author}
              onChange={(e) => {
                setGroup({ ...group, author: e.target.value });
              }}
              className="text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Author giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Ýyl</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Ýyly giriziň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={group?.year}
              onChange={(e) => {
                setGroup({ ...group, year: e.target.value });
              }}
              className="text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Ýyl giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Çaphana</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Çaphana giriziň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={group?.publishing}
              onChange={(e) => {
                setGroup({ ...group, publishing: e.target.value });
              }}
              className="text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Çaphana giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Faýl saýla</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Faýl saýlaň. Diňe birje WORD file .DOCX (.DOC kabul edilmeýär)
              ya-da PDF file saýlamana rugsat berilýär.
            </p>
          </div>
          <div className="flex justify-start items-center gap-3 w-[550px]">
            <input
              ref={fileRef}
              onChange={(e) => handleFile(e.target.files[0])}
              className="hidden"
              type="file"
            />
            <div
              className="px-5 py-3 text-[14px] text-[#98A2B2] border-[1px] border-dashed rounded-[12px] cursor-pointer "
              onClick={() => fileRef.current.click()}
            >
              File saýla
            </div>
            <div className="px-5 py-3 text-[14px] text-[#98A2B2]">
              {file?.name}
            </div>
            {file ? (
              <Delete
                onClick={() => {
                  setFile(null);
                  setGroup({
                    ...group,
                    name_tm: "",
                    year: "",
                    card_type: "card",
                  });
                }}
                className="text-[#98A2B2] cursor-pointer"
              />
            ) : null}
          </div>
        </div>
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
            onClick={() => CreateCategoryItem()}
            className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
          >
            Ýatda sakla
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryItemCreate;
