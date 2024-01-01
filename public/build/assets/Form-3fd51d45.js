import{r as f,K as k,j as t,a as e,n as D}from"./app-d55c4ea4.js";import{A as I}from"./AuthenticatedLayout-d15c389f.js";import{I as o}from"./InputError-595b2933.js";import{I as c}from"./InputLabel-c1c256bb.js";import{T as g}from"./TextInput-4d8b4d92.js";import{P as S}from"./PrimaryButton-4f75e45d.js";import{S as w}from"./SelectInput-adbedbd8.js";import{D as _,M as C,S as j}from"./DangerButton-174a44b2.js";import"./ApplicationLogo-0e620696.js";import"./transition-06e71d4e.js";function U({auth:x,status:u,spesialis:p,title:h,dokter:a=null}){const[N,i]=f.useState(!1),n=k({nama_dokter:a?a.nama_dokter:"",no_identitas:a?a.no_identitas:0,spesialis_id:a?a.spesialis_id:p[0].id}),{data:l,setData:v,processing:m,errors:r,reset:b}=n,y=s=>{s.preventDefault(),a?n.patch(route("dokter.edit",a.id)):n.post(route("dokter.new"))};f.useEffect(()=>()=>{b("nama_dokter","no_identitas","spesialis_id")},[]);const d=s=>{v(s.target.name,s.target.type==="checkbox"?s.target.checked:s.target.value)};return t(I,{auth:x,header:e("h2",{className:"font-semibold text-xl text-gray-800  leading-tight",children:h}),children:[e(D,{title:h}),e("div",{className:"py-12",children:e("div",{className:"max-w-xl mx-auto sm:px-6 lg:px-8",children:e("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:t("div",{className:"p-6 text-gray-900 ",children:[u&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:u}),t("form",{onSubmit:y,children:[t("div",{children:[e(c,{forInput:"nama_dokter",value:"Nama Dokter"}),e(g,{id:"nama_dokter",type:"text",name:"nama_dokter",value:l.nama_dokter,className:"mt-1 block w-full",autoComplete:"nama_dokter",isFocused:!0,handleChange:d}),e(o,{message:r.nama_dokter,className:"mt-2"})]}),t("div",{className:"mt-4",children:[e(c,{forInput:"no_identitas",value:"No Identitas Dokter"}),e(g,{id:"no_identitas",type:"number",name:"no_identitas",value:l.no_identitas,className:"mt-1 block w-full",handleChange:d}),e(o,{message:r.no_identitas,className:"mt-2"})]}),t("div",{className:"mt-4",children:[e(c,{forInput:"spesialis_id",value:"Bidang Spesialis"}),e(w,{id:"spesialis_id",name:"spesialis_id",value:l.spesialis_id,className:"mt-1 block w-full",handleChange:d,options:p.map(s=>({label:s.nama_spesialis,value:s.id}))}),e(o,{message:r.spesialis_id,className:"mt-2"})]}),t("div",{className:a?"flex items-center justify-between mt-4":"flex items-center justify-end mt-4",children:[a&&e(_,{type:"button",className:"mr-4",processing:m,onClick:()=>i(!0),children:"Hapus Data"}),e(S,{className:"ml-4",processing:m,children:a?"Ubah Data":"Simpan Data"})]})]})]})})})}),a&&e(C,{show:N,onClose:()=>i(!1),children:t("div",{className:"p-6",children:[t("h2",{className:"text-lg font-medium text-gray-900 ",children:["Apakah kamu yakin ingin menghapus data dokter"," ",e("b",{children:a.nama_dokter})," ?"]}),e("p",{className:"mt-1 text-sm text-gray-600 ",children:"Setelah data dihapus, semua sumber daya dan datanya akan dihapus secara permanen."}),t("div",{className:"mt-6 flex justify-end",children:[e(j,{onClick:()=>i(!1),children:"Batalkan"}),e(_,{className:"ml-3",processing:m,onClick:()=>{n.delete(route("dokter.delete",a.id),{preserveScroll:!0,onSuccess:()=>i(!1)})},children:"Hapus Data"})]})]})})]})}export{U as default};