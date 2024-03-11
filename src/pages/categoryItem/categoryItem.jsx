import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { Add, Edit, Delete, Image } from "@mui/icons-material";
import { BASE_URL, axiosInstance } from "../../utils/axiosIntance";
import { useHistory, useParams } from "react-router-dom";
import Pagination from "../../components/pagination";
import PageLoading from "../../components/PageLoading";

const CategoryItem = () => {
  const history = useHistory();
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [pages, setPages] = useState([]);
  const [isDelete, setISDelete] = useState(false);
  const [groups, setGroups] = useState([]);
  const [category, setCategory] = useState({});
  const [selecteds, setSelecteds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    limit: 20,
    page: 1,
    search_query: "",
    CategoryId: id,
  });

  useEffect(() => {
    getCategory();
    getGroups();
  }, [id]);

  useEffect(() => {
    const time = setTimeout(() => {
      getGroups();
    }, 400);

    return () => clearTimeout(time);
  }, [filter]);

  const getGroups = () => {
    setLoading(true);
    axiosInstance
      .get("/api/item/all", {
        params: {
          limit: filter.limit,
          page: filter.page,
          search_query: filter.search_query,
          CategoryId: id,
        },
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

  const deleteGroups = () => {
    axiosInstance
      .delete("/api/item/destroy/" + isDelete?.id)
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
        <h1 className="text-[30px] font-[700]">{category?.name_tm}</h1>
        <div className="w-fit flex gap-5">
          <Button
            onClick={() =>
              history.push({ pathname: "/category/" + id + "/create" })
            }
            className="  !h-[40px] !bg-blue !rounded-[8px] !px-[17px] !w-fit   !text-[14px] !text-white  "
            startDecorator={<Add />}
          >
            Goş
          </Button>
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

          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[50px] uppercase">
            Suraty
          </h1>

          <h1 className="text-[14px] font-[500] text-[#98A2B2] min-w-[45%] uppercase">
            Ady
          </h1>

          <h1 className="text-[14px] font-[500] text-[#98A2B2] min-w-[20%]  whitespace-nowrap uppercase">
            ýyly
          </h1>

          <h1 className="text-[14px] font-[500] text-center text-[#98A2B2] w-[15%]   whitespace-nowrap uppercase">
            Hereket
          </h1>
        </div>

        {/* Table body */}
        {groups?.rows?.map((item, i) => {
          return loading ? (
            <PageLoading key={"GroupsItemloading" + i} />
          ) : (
            <div
              key={"GroupsItem" + i}
              className="w-full gap-[30px] flex items-center py-2 px-4 min-h-[70px] rounded-[6px] bg-white border-b-[1px] border-[#E9EBF0]"
            >
              <div className="text-[14px] font-[500] px-2 text-[#98A2B2] w-fit uppercase">
                {item?.order_num}
              </div>
              <a
                href={BASE_URL + item?.CategoryItemFiles[0]?.filename}
                target="_blank"
                className="w-[50px]"
              >
                {item?.placeholder?.length > 0 ? (
                  <img
                    className="min-w-[50px] object-contain"
                    src={BASE_URL + item?.placeholder}
                    alt="image"
                  />
                ) : (
                  <div className="min-w-[50px] h-[72px] flex items-center text-[#98A2B2] text-[14px] text-center rounded-[4px] border-[1px] border-dashed ">
                    Surat Ýok
                  </div>
                )}
              </a>
              <a
                href={BASE_URL + item?.CategoryItemFiles[0]?.filename}
                target="_blank"
                className="text-[14px] font-[500] text-black min-w-[45%] uppercase"
              >
                {item?.name_tm}
              </a>

              <h1 className="text-[14px] font-[500] text-black w-[20%] min-w-[200px] whitespace-nowrap uppercase">
                {item?.year}
              </h1>
              <h1 className="text-[14px] font-[500] flex gap-3 justify-center text-center text-black w-[15%]   whitespace-nowrap uppercase">
                <Image
                  onClick={() =>
                    history.push({
                      pathname: "/category/" + id + "/upload/" + item?.id,
                    })
                  }
                  className="text-blue cursor-pointer"
                />
                <Edit
                  onClick={() =>
                    history.push({
                      pathname: "/category/" + id + "/update/" + item?.id,
                    })
                  }
                  className="text-blue cursor-pointer"
                />
                <Delete
                  onClick={() => setISDelete(item)}
                  className="text-red cursor-pointer"
                />
              </h1>
            </div>
          );
        })}

        {/* Table footer */}

        <div className="w-full flex mt-5 justify-between items-center">
          <h1 className="text-[14px] font-[400]">{groups?.count} Maglumat</h1>
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
          open={isDelete}
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
              <h1 className="text-[20px] font-[500]"> Aýyrmak</h1>
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
                Aýyrmak isleýärsiňizmi?
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

export default CategoryItem;
