import React, { useState, useEffect } from "react";
import ExcelReader from "./excelReader";
import { useHistory, useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosIntance";

const Excel = () => {
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [group, setGroup] = useState({
    title: "",
    active: true,
    GroupId: 0,
  });

  useEffect(() => {
    getData();
  }, [id]);
  const getData = () => {
    axiosInstance
      .get("/api/groupitem/" + id, {
        params: { AdminId: userData?.id },
      })
      .then((data) => {
        console.log(data.data);
        setGroup(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Excel Reader</h1>
      <ExcelReader GroupId={group?.GroupId} GroupItemId={id} />
    </div>
  );
};

export default Excel;
