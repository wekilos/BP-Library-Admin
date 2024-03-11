import React, { useEffect, useState } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { KeyboardArrowDown, Add } from "@mui/icons-material";
import CheckBox from "../../components/CheckBox";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import Pagination from "../../components/pagination";
import PageLoading from "../../components/PageLoading";

const Welayatlar = () => {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [pages, setPages] = useState([]);
  const [isDelete, setISDelete] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selecteds, setSelecteds] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    search_query: "",
    deleted: null,
    active: null,
    order: 0,
    AdminId: userData?.id,
  });

  useEffect(() => {
    const time = setTimeout(() => {
      getGroups();
    }, 400);

    return () => clearTimeout(time);
  }, [filter]);

  const getGroups = () => {
    setLoading(true);
    axiosInstance
      .get("/api/welayat/all", {
        params: filter,
      })
      .then((data) => {
        setLoading(false);
        console.log(data.data);
        setGroups(data.data);
        let i = 1;
        let array = [];
        let end = data?.data?.count / filter?.limit;
        if (data?.data?.count % filter?.limit > 0) {
          end = end + 1;
        }
        while (i <= end) {
          array.push(i);
          i++;
        }
        setPages([...array]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const selectItem = (id) => {
    let array = selecteds;
    let bar = false;
    array.map((item) => {
      if (item == id) {
        bar = true;
      }
    });

    if (bar) {
      let newArray = selecteds.filter((item) => {
        return item != id;
      });
      setSelecteds([...newArray]);
    } else {
      array.push(id);
      setSelecteds([...array]);
    }
  };

  const selectAll = () => {
    setAllSelected(true);
    let array = [];
    groups?.rows?.map((item) => {
      array.push(item?.id);
    });
    setSelecteds([...array]);
  };

  const isSelected = (id) => {
    let array = selecteds;
    let bar = false;
    array?.map((item) => {
      if (item == id) {
        bar = true;
      }
    });
    return bar;
  };

  const deleteGroups = () => {
    axiosInstance
      .patch("/api/welayat/delete", {
        groups: JSON.stringify(selecteds),
        AdminId: userData?.id,
      })
      .then((data) => {
        console.log(data.data);
        getGroups();
        setISDelete(false);
        setSelecteds([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full">
      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Welaýatlar</h1>
        <div className="w-fit flex gap-5">
          {/* <Select
            placeholder="Hemmesini görkez"
            className="!border-[#E9EBF0] !border-[1px] !h-[40px] !bg-white !rounded-[8px] !px-[17px] !w-fit !min-w-[200px] !text-[14px] !text-black  "
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
            <Option
              onClick={() =>
                setFilter({ ...filter, active: null, deleted: null })
              }
              value="Ahlisi"
            >
              Hemmesini görkez
            </Option>
            <Option
              onClick={() =>
                setFilter({ ...filter, active: true, deleted: false })
              }
              value="Active"
            >
              Aktiw edilenler
            </Option>
            <Option
              onClick={() => setFilter({ ...filter, active: false })}
              value="disActive"
            >
              Dis Aktiw edilenler
            </Option>
          </Select> */}
          {/* <Button
            onClick={() => history.push({ pathname: "/groups/create" })}
            className="  !h-[40px] !bg-blue !rounded-[8px] !px-[17px] !w-fit   !text-[14px] !text-white  "
            startDecorator={<Add />}
          >
            Welaýat goş
          </Button> */}
          {/* <button className="h-[40px] border-[#E9EBF0] border-[1px] rounded-[8px]"></button> */}
        </div>
      </div>

      {/*  Table*/}
      <div className="w-full p-5 bg-white rounded-[8px]">
        {/* Table search */}
        <div className="w-full mb-4 flex items-center px-4 h-[40px] rounded-[6px] border-[1px] border-[#E9EBF0]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_0_1937)">
              <circle
                cx="7.66683"
                cy="7.66659"
                r="6.33333"
                stroke="#C7CED9"
                strokeWidth="2"
              />
              <path
                d="M12.3335 12.3333L14.6668 14.6666"
                stroke="#C7CED9"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_0_1937">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <input
            value={filter.search_query}
            onChange={(e) =>
              setFilter({ ...filter, search_query: e.target.value })
            }
            type="text"
            className="w-full border-none outline-none h-[38px] pl-4 text-[14px] font-[600] text-[#98A2B2] "
            placeholder="Gözleg"
          />
        </div>

        {/* Table header */}
        <div className="w-full gap-[30px] flex items-center px-4 min-h-[40px] rounded-[6px] bg-[#F7F8FA]">
          <h1 className="text-[14px] font-[500] px-2 text-[#98A2B2] w-fit uppercase">
            Id
          </h1>

          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[50%] uppercase">
            Ady
          </h1>

          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[35%] min-w-[200px] whitespace-nowrap uppercase">
            DEgişli ýerler sany
          </h1>
        </div>

        {/* Table body */}
        {groups?.rows?.map((item, i) => {
          return loading ? (
            <PageLoading />
          ) : (
            <div
              key={"GroupsItem" + i}
              className="w-full gap-[30px] flex items-center px-4 h-[70px] rounded-[6px] bg-white border-b-[1px] border-[#E9EBF0]"
            >
              <div className="text-[14px] font-[500] px-2 text-[#98A2B2] w-fit uppercase">
                {item?.id}
              </div>

              <h1 className="text-[14px] font-[500] text-black w-[50%] uppercase">
                {item?.name}
              </h1>

              <h1 className="text-[14px] font-[500] text-black w-[35%] min-w-[200px] whitespace-nowrap uppercase">
                {item?.Yers?.length + "  "} ýer
              </h1>
            </div>
          );
        })}

        {/* Table footer */}
        {selecteds?.length == 0 && true ? (
          <div className="w-full flex mt-5 justify-between items-center">
            <h1 className="text-[14px] font-[400]">
              {groups?.count} Welaýatlar
            </h1>
            <Pagination
              meta={groups?.count}
              filter={filter}
              pages={pages}
              next={() => setFilter({ ...filter, page: filter.page + 1 })}
              prev={() => setFilter({ ...filter, page: filter.page - 1 })}
              goTo={(item) => setFilter({ ...filter, page: item })}
            />
          </div>
        ) : (
          <div className="w-full mt-2 flex justify-between items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
            <h1 className="text-[14px] font-[400]">
              {selecteds?.length + " "} sany saýlandy
            </h1>
            <div className="w-fit flex gap-6 items-center ">
              <button
                onClick={() => {
                  setSelecteds([]);
                  setAllSelected(false);
                }}
                className="text-[#98A2B2] text-[14px] font-[500] py-[11px] px-[27px] hover:bg-blue hover:text-white rounded-[8px]"
              >
                Goýbolsun et
              </button>
              <button
                onClick={() => setISDelete(true)}
                className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-[#FF4D4D] rounded-[8px]"
              >
                Aýyr
              </button>
            </div>
          </div>
        )}
        {/* Selected items delete */}
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={isDelete}
          onClose={() => setISDelete(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
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
              <h1 className="text-[20px] font-[500]">Topar aýyrmak</h1>
              <button onClick={() => setISDelete(false)}>
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
                Topary aýyrmak isleýärsiňizmi?
              </h1>

              <div className="flex gap-[29px] justify-center">
                <button
                  onClick={() => setISDelete(false)}
                  className="text-[14px] font-[500] px-6 py-3 text-[#98A2B2] rounded-[8px] hover:bg-blue hover:text-white"
                >
                  Goýbolsun et
                </button>
                <button
                  onClick={() => deleteGroups()}
                  className="text-[14px] font-[500] text-white hover:bg-[#fd6060] bg-[#FF4D4D] rounded-[8px] px-6 py-3"
                >
                  Aýyr
                </button>
              </div>
            </div>
          </Sheet>
        </Modal>
      </div>
    </div>
  );
};

export default React.memo(Welayatlar);
