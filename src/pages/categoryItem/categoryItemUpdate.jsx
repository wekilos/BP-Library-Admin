import React, { useEffect, useRef, useState } from "react";
import Switch from "@mui/joy/Switch";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { KeyboardArrowDown, Delete } from "@mui/icons-material";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory, useParams } from "react-router-dom";
import PageLoading from "../../components/PageLoading";

const WelayatlarUpdate = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { id, itemId } = useParams();
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [group, setGroup] = useState({
    card_type: "card",
    name_tm: "",
    text_tm: "",
    author: "",
    year: "",
    publishing: "",
    id: itemId,
  });
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    getData();
  }, [itemId]);

  const getData = () => {
    axiosInstance
      .get("/api/item/" + itemId)
      .then((data) => {
        console.log(data.data);
        setGroup(data.data);
        data?.data?.CategoryItemFiles?.length > 0
          ? setFile({ name: data?.data?.CategoryItemFiles[0]?.filename })
          : console.log("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateGroup = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("order_num", group.order_num);
    formData.append("card_type", group.card_type);
    formData.append("name_tm", group.name_tm);
    formData.append("author", group.author);
    formData.append("year", group.year);
    formData.append("publishing", group.publishing);
    formData.append("id", itemId);
    if (file?.size) {
      formData.append("file", file);
    }

    group.name_tm?.length > 0
      ? axiosInstance
          .patch("/api/item/update", formData)
          .then((data) => {
            setLoading(false);
            console.log(data.data);
            history.push({ pathname: "/category/" + id });
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
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
        <h1 className="text-[30px] font-[700]">{group?.Category?.name_tm}</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">{group?.name_tm} maglumaty</h1>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Tertip belgisi </h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Kategoriýanyň tertip belgisini giriziň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={group?.order_num}
              onChange={(e) => {
                setGroup({ ...group, order_num: e.target.value });
              }}
              className="text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Tertip nomur giriz"
              type="text"
            />
          </div>
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

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Goşulan senesi</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Döredilen senesi
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <h1 className="text-[16px] font-[400]">
              {group?.createdAt?.slice(0, 10) +
                " / " +
                group?.createdAt?.slice(11, 16)}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full mt-5 flex justify-between items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
        <div className="flex items-center gap-2">
          <h1 className="text-[14px] font-[400] text-[#98A2B2]">
            Soňky düzediş
          </h1>
          <h1 className="text-[14px] font-[400]">
            {group?.updatedAt?.slice(0, 10) +
              " / " +
              group?.updatedAt?.slice(11, 16)}
          </h1>
        </div>
        <div className="w-fit flex gap-6 items-center ">
          <button
            onClick={() => history.goBack()}
            className="text-blue text-[14px] font-[500] py-[11px] px-[27px] hover:bg-red hover:text-white rounded-[8px]"
          >
            Goýbolsun et
          </button>
          <button
            onClick={() => updateGroup()}
            className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
          >
            Ýatda sakla
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(WelayatlarUpdate);
