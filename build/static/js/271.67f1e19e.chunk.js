"use strict";(self.webpackChunke_library_admin=self.webpackChunke_library_admin||[]).push([[271],{1271:(e,t,l)=>{l.r(t),l.d(t,{default:()=>y});var a=l(5043),s=l(9382),i=l(7313),n=l(2996),r=l(3529),d=l(3102),x=l(6918),o=l(1009),c=l(2224),p=l(692),u=l(1387),m=l(6811),h=l(1688),v=l(9964),f=l(579);const j=()=>{var e,t,l,j,y;const g=(0,h.W6)(),[b,N]=(0,a.useState)(!1),{id:A,itemId:w}=(0,h.g)(),[_,B]=(0,a.useState)(null),C=(0,a.useRef)(null),[z,k]=(0,a.useState)({card_type:"card",name_tm:"",text_tm:"",author:"",year:"",publishing:"",id:w}),[S,D]=(0,a.useState)(!1);(0,a.useEffect)((()=>{F()}),[w]);const F=()=>{m.S.get("/api/item/"+w).then((e=>{var t,l,a,s;console.log(e.data),k(e.data),(null===e||void 0===e||null===(t=e.data)||void 0===t||null===(l=t.CategoryItemFiles)||void 0===l?void 0:l.length)>0?B({name:null===e||void 0===e||null===(a=e.data)||void 0===a||null===(s=a.CategoryItemFiles[0])||void 0===s?void 0:s.filename}):console.log("")})).catch((e=>{console.log(e)}))};return b?(0,f.jsx)(v.A,{}):(0,f.jsxs)("div",{className:"w-full",children:[S&&(0,f.jsx)(s.A,{className:"!fixed z-50 top-5 right-5",sx:{alignItems:"flex-start"},startDecorator:(0,f.jsx)(d.A,{}),variant:"soft",color:"warning",endDecorator:(0,f.jsx)(i.Ay,{onClick:()=>D(!1),variant:"soft",color:"warning",children:(0,f.jsx)(r.A,{})}),children:(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{children:"Maglumat n\xe4dogry!"}),(0,f.jsx)(n.Ay,{level:"body-sm",color:"warning",children:"Maglumatlary doly we dogry girizmeli!"})]})},"title"),(0,f.jsx)("div",{className:"w-full pb-[30px] flex justify-between items-center",children:(0,f.jsx)("h1",{className:"text-[30px] font-[700]",children:null===z||void 0===z||null===(e=z.Category)||void 0===e?void 0:e.name_tm})}),(0,f.jsxs)("div",{className:"w-full min-h-[60vh] p-5 bg-white rounded-[8px]",children:[(0,f.jsxs)("div",{className:" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]",children:[(0,f.jsx)("div",{className:"border-l-[3px] border-blue h-[20px]"}),(0,f.jsxs)("h1",{className:"text-[20px] font-[500]",children:[null===z||void 0===z?void 0:z.name_tm," maglumaty"]})]}),(0,f.jsxs)("div",{className:"flex items-center border-t-[1px] justify-between py-[30px]",children:[(0,f.jsxs)("div",{className:"w-[380px]",children:[(0,f.jsx)("h1",{className:"text-[18px] font-[500]",children:"Tertip belgisi "}),(0,f.jsx)("p",{className:"text-[14px] mt-2 font-[500] text-[#98A2B2]",children:"Kategori\xfdany\u0148 tertip belgisini girizi\u0148."})]}),(0,f.jsx)("div",{className:"flex justify-start w-[550px]",children:(0,f.jsx)("input",{value:null===z||void 0===z?void 0:z.order_num,onChange:e=>{k({...z,order_num:e.target.value})},className:"text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none ",placeholder:"Tertip nomur giriz",type:"text"})})]}),(0,f.jsxs)("div",{className:"flex items-center border-t-[1px] justify-between py-[30px]",children:[(0,f.jsxs)("div",{className:"w-[380px]",children:[(0,f.jsx)("h1",{className:"text-[18px] font-[500]",children:"Ady"}),(0,f.jsx)("p",{className:"text-[14px] mt-2 font-[500] text-[#98A2B2]",children:"Adyny girizi\u0148."})]}),(0,f.jsx)("div",{className:"flex justify-start w-[550px]",children:(0,f.jsx)("input",{value:null===z||void 0===z?void 0:z.name_tm,onChange:e=>{k({...z,name_tm:e.target.value})},className:"text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none ",placeholder:"Adyny giriz",type:"text"})})]}),(0,f.jsxs)("div",{className:"flex items-center border-t-[1px] justify-between py-[30px]",children:[(0,f.jsxs)("div",{className:"w-[380px]",children:[(0,f.jsx)("h1",{className:"text-[18px] font-[500]",children:"Card g\xf6rn\xfc\u015fi "}),(0,f.jsx)("p",{className:"text-[14px] mt-2 font-[500] text-[#98A2B2]",children:"Card ha\xfdsy g\xf6rn\xfc\u015fe degi\u015flidigini girizi\u0148."})]}),(0,f.jsx)("div",{className:"flex justify-start w-[550px]",children:(0,f.jsxs)(x.A,{onChange:(e,t)=>k({...z,card_type:t}),value:null===z||void 0===z?void 0:z.card_type,placeholder:"Card g\xf6rn\xfc\u015fi",className:"text-[14px] w-full text-[#98A2B2] font-[400] h-[50px]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none ",indicator:(0,f.jsx)(p.A,{className:"!text-[16px]"}),sx:{["& .".concat(o.A.indicator)]:{transition:"0.2s",["&.".concat(o.A.expanded)]:{transform:"rotate(-180deg)"}}},children:[(0,f.jsx)(c.A,{value:"card",children:"Suratly"},"card"),(0,f.jsx)(c.A,{value:"string",children:"Suratsyz"},"string")]})})]}),(0,f.jsxs)("div",{className:"flex items-center border-t-[1px] justify-between py-[30px]",children:[(0,f.jsxs)("div",{className:"w-[380px]",children:[(0,f.jsx)("h1",{className:"text-[18px] font-[500]",children:"Author"}),(0,f.jsx)("p",{className:"text-[14px] mt-2 font-[500] text-[#98A2B2]",children:"Author girizi\u0148."})]}),(0,f.jsx)("div",{className:"flex justify-start w-[550px]",children:(0,f.jsx)("input",{value:null===z||void 0===z?void 0:z.author,onChange:e=>{k({...z,author:e.target.value})},className:"text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none ",placeholder:"Author giriz",type:"text"})})]}),(0,f.jsxs)("div",{className:"flex items-center border-t-[1px] justify-between py-[30px]",children:[(0,f.jsxs)("div",{className:"w-[380px]",children:[(0,f.jsx)("h1",{className:"text-[18px] font-[500]",children:"\xddyl"}),(0,f.jsx)("p",{className:"text-[14px] mt-2 font-[500] text-[#98A2B2]",children:"\xddyly girizi\u0148."})]}),(0,f.jsx)("div",{className:"flex justify-start w-[550px]",children:(0,f.jsx)("input",{value:null===z||void 0===z?void 0:z.year,onChange:e=>{k({...z,year:e.target.value})},className:"text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none ",placeholder:"\xddyl giriz",type:"text"})})]}),(0,f.jsxs)("div",{className:"flex items-center border-t-[1px] justify-between py-[30px]",children:[(0,f.jsxs)("div",{className:"w-[380px]",children:[(0,f.jsx)("h1",{className:"text-[18px] font-[500]",children:"\xc7aphana"}),(0,f.jsx)("p",{className:"text-[14px] mt-2 font-[500] text-[#98A2B2]",children:"\xc7aphana girizi\u0148."})]}),(0,f.jsx)("div",{className:"flex justify-start w-[550px]",children:(0,f.jsx)("input",{value:null===z||void 0===z?void 0:z.publishing,onChange:e=>{k({...z,publishing:e.target.value})},className:"text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none ",placeholder:"\xc7aphana giriz",type:"text"})})]}),(0,f.jsxs)("div",{className:"flex items-center border-t-[1px] justify-between py-[30px]",children:[(0,f.jsxs)("div",{className:"w-[380px]",children:[(0,f.jsx)("h1",{className:"text-[18px] font-[500]",children:"Fa\xfdl sa\xfdla"}),(0,f.jsx)("p",{className:"text-[14px] mt-2 font-[500] text-[#98A2B2]",children:"Fa\xfdl sa\xfdla\u0148. Di\u0148e birje WORD file .DOCX (.DOC kabul edilme\xfd\xe4r) ya-da PDF file sa\xfdlamana rugsat beril\xfd\xe4r."})]}),(0,f.jsxs)("div",{className:"flex justify-start items-center gap-3 w-[550px]",children:[(0,f.jsx)("input",{ref:C,onChange:e=>(async e=>{console.log(e);const t=null===e||void 0===e?void 0:e.name.split("."),l=(null===t||void 0===t?void 0:t.length)>0?t[(null===t||void 0===t?void 0:t.length)-1]:null;var a,s,i,n;"pdf"!=l&&"docx"!=l||!e?D(!0):(0==(null===z||void 0===z||null===(a=z.name_tm)||void 0===a?void 0:a.length)&&0==(null===z||void 0===z||null===(s=z.year)||void 0===s?void 0:s.length)&&"docx"==l&&k({...z,name_tm:t[0],year:t[1],card_type:"string"}),0==(null===z||void 0===z||null===(i=z.name_tm)||void 0===i?void 0:i.length)&&0==(null===z||void 0===z||null===(n=z.year)||void 0===n?void 0:n.length)&&"pdf"==l&&k({...z,name_tm:t[0],year:t[1],card_type:"card"}),B(e))})(e.target.files[0]),className:"hidden",type:"file"}),(0,f.jsx)("div",{className:"px-5 py-3 text-[14px] text-[#98A2B2] border-[1px] border-dashed rounded-[12px] cursor-pointer ",onClick:()=>C.current.click(),children:"File sa\xfdla"}),(0,f.jsx)("div",{className:"px-5 py-3 text-[14px] text-[#98A2B2]",children:null===_||void 0===_?void 0:_.name}),_?(0,f.jsx)(u.A,{onClick:()=>{B(null),k({...z,name_tm:"",year:"",card_type:"card"})},className:"text-[#98A2B2] cursor-pointer"}):null]})]}),(0,f.jsxs)("div",{className:"flex items-center border-t-[1px] justify-between py-[30px]",children:[(0,f.jsxs)("div",{className:"w-[380px]",children:[(0,f.jsx)("h1",{className:"text-[18px] font-[500]",children:"Go\u015fulan senesi"}),(0,f.jsx)("p",{className:"text-[14px] mt-2 font-[500] text-[#98A2B2]",children:"D\xf6redilen senesi"})]}),(0,f.jsx)("div",{className:"flex justify-start w-[550px]",children:(0,f.jsx)("h1",{className:"text-[16px] font-[400]",children:(null===z||void 0===z||null===(t=z.createdAt)||void 0===t?void 0:t.slice(0,10))+" / "+(null===z||void 0===z||null===(l=z.createdAt)||void 0===l?void 0:l.slice(11,16))})})]})]}),(0,f.jsxs)("div",{className:"w-full mt-5 flex justify-between items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]",children:[(0,f.jsxs)("div",{className:"flex items-center gap-2",children:[(0,f.jsx)("h1",{className:"text-[14px] font-[400] text-[#98A2B2]",children:"So\u0148ky d\xfczedi\u015f"}),(0,f.jsx)("h1",{className:"text-[14px] font-[400]",children:(null===z||void 0===z||null===(j=z.updatedAt)||void 0===j?void 0:j.slice(0,10))+" / "+(null===z||void 0===z||null===(y=z.updatedAt)||void 0===y?void 0:y.slice(11,16))})]}),(0,f.jsxs)("div",{className:"w-fit flex gap-6 items-center ",children:[(0,f.jsx)("button",{onClick:()=>g.goBack(),className:"text-blue text-[14px] font-[500] py-[11px] px-[27px] hover:bg-red hover:text-white rounded-[8px]",children:"Go\xfdbolsun et"}),(0,f.jsx)("button",{onClick:()=>(()=>{var e;N(!0);const t=new FormData;t.append("order_num",z.order_num),t.append("card_type",z.card_type),t.append("name_tm",z.name_tm),t.append("author",z.author),t.append("year",z.year),t.append("publishing",z.publishing),t.append("id",w),null!==_&&void 0!==_&&_.size&&t.append("file",_),(null===(e=z.name_tm)||void 0===e?void 0:e.length)>0?m.S.patch("/api/item/update",t).then((e=>{N(!1),console.log(e.data),g.push({pathname:"/category/"+A})})).catch((e=>{N(!1),console.log(e)})):D(!0)})(),className:"text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90",children:"\xddatda sakla"})]})]})]})},y=a.memo(j)},6811:(e,t,l)=>{l.d(t,{C:()=>s,S:()=>i});var a=l(7154);const s="http://192.168.7.179:8282/";console.log(s);const i=a.A.create({baseURL:s,timeout:1e7,headers:{Authorization:"Bearer "+(()=>{if(JSON.parse(localStorage.getItem("userData")))return JSON.parse(localStorage.getItem("userData")).token})(),"Content-Type":"multipart/form-data",Accept:"application/json"}})},1387:(e,t,l)=>{l.d(t,{A:()=>i});var a=l(62),s=l(579);const i=(0,a.A)((0,s.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete")}}]);
//# sourceMappingURL=271.67f1e19e.chunk.js.map