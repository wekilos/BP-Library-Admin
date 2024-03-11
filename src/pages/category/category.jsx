import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { Add, Delete } from "@mui/icons-material";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import Pagination from "../../components/pagination";
import PageLoading from "../../components/PageLoading";

const Groups = () => {
  const history = useHistory();
  const [pages, setPages] = useState([]);
  const [isDelete, setISDelete] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    search_query: "",
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
      .get("/api/category/all", {
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

  const deleteGroups = () => {
    axiosInstance
      .delete("/api/category/destroy/" + isDelete?.id)
      .then((data) => {
        console.log(data.data);
        getGroups();
        setISDelete(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full">
      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Kategoriýa</h1>
        <div className="w-fit flex gap-5">
          <Button
            onClick={() => history.push({ pathname: "/categories/create" })}
            className="  !h-[40px] !bg-blue !rounded-[8px] !px-[17px] !w-fit   !text-[14px] !text-white  "
            startDecorator={<Add />}
          >
            Kategoriýa goş
          </Button>
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
        <div className="w-full gap-[20px] flex items-center px-4 h-[40px] rounded-[6px] bg-[#F7F8FA]">
          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-fit uppercase">
            Id
          </h1>

          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[10%] uppercase">
            Icon
          </h1>

          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[40%] uppercase">
            Ady
          </h1>

          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[30%] uppercase">
            Link
          </h1>

          <h1 className="text-[14px] text-center font-[500] text-[#98A2B2] w-[15%] uppercase">
            Hereket
          </h1>
        </div>

        {/* Table body */}
        {groups?.rows?.map((item, i) => {
          return loading ? (
            <PageLoading key={"loading" + i} />
          ) : (
            <div
              key={"GroupsItem" + i}
              className="w-full gap-[20px] flex items-center px-4 py-2 min-h-[70px] rounded-[6px] bg-white border-b-[1px] border-[#E9EBF0]"
            >
              <h1 className="text-[14px] font-[500] text-black w-fit uppercase">
                {item?.order_num}
              </h1>

              <h1 className="text-[14px] font-[500] text-black w-[10%] uppercase">
                <div
                  className="!text-white"
                  dangerouslySetInnerHTML={{ __html: item?.icon }}
                />
              </h1>

              <h1 className="text-[14px] font-[500] text-black w-[40%]    uppercase">
                {item?.name_tm}
              </h1>

              <h1 className="text-[14px] font-[500] text-black w-[30%]    uppercase">
                {item?.link}
              </h1>

              <h1 className="text-[14px] flex justify-center items-center gap-4 font-[500] text-[#98A2B2] w-[15%] uppercase">
                <Delete
                  onClick={() => setISDelete(item)}
                  className="text-red cursor-pointer"
                />
                <div
                  onClick={() =>
                    history.push({ pathname: "/categories/" + item?.id })
                  }
                  className="cursor-pointer p-2"
                >
                  <svg
                    width="3"
                    height="15"
                    viewBox="0 0 3 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="1.5" cy="1.5" r="1.5" fill="black" />
                    <circle cx="1.5" cy="7.5" r="1.5" fill="black" />
                    <circle cx="1.5" cy="13.5" r="1.5" fill="black" />
                  </svg>
                </div>
              </h1>
            </div>
          );
        })}

        {/* Table footer */}

        <div className="w-full flex mt-5 justify-between items-center">
          <h1 className="text-[14px] font-[400]">{groups?.count} Kategoriýa</h1>
          <Pagination
            meta={groups?.count}
            filter={filter}
            pages={pages}
            next={() => setFilter({ ...filter, page: filter.page + 1 })}
            prev={() => setFilter({ ...filter, page: filter.page - 1 })}
            goTo={(item) => setFilter({ ...filter, page: item })}
          />
        </div>

        {/* Selected items delete */}
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={isDelete != null}
          onClose={() => setISDelete(null)}
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
              <h1 className="text-[20px] font-[500]">Kategoriýa aýyrmak</h1>
              <button onClick={() => setISDelete(null)}>
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
                Kategoriýany aýyrmak isleýärsiňizmi?
              </h1>

              <div className="flex gap-[29px] justify-center">
                <button
                  onClick={() => setISDelete(null)}
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

export default React.memo(Groups);
