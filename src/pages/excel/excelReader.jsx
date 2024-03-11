import React, { useState } from "react";
import * as XLSX from "xlsx";
import { axiosInstance } from "../../utils/axiosIntance";

function ExcelReader(props) {
  const [data, setData] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setData(excelData);
    };

    reader.readAsBinaryString(file);
  };

  const createQuestion = () => {
    let array = [];
    data?.map((question, i) => {
      const formData = new FormData();
      formData.append("question", question[0]);
      formData.append("mark", question[3]);
      formData.append("GroupId", props?.GroupId);
      formData.append("GroupItemId", props?.GroupItemId);
      formData.append("title", question[1]);
      formData.append("is_true", question[2]);

      axiosInstance
        .post("/api/question/create", formData, {
          params: { AdminId: userData?.id },
        })
        .then((data) => {
          console.log(data.data);
          array.push(data.data);
          // history.push({ pathname: "/questions" });
        })
        .catch((err) => {
          console.log(err);
        });
    });

    console.log(array);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button
        className="bg-blue text-white px-4 py-2 rounded-[12px]"
        onClick={() => createQuestion()}
      >
        Doret
      </button>
      <table>
        <tbody>
          {data?.map((row, index) => {
            console.log(row);
            return (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ExcelReader;
