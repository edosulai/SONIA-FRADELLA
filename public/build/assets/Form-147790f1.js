import{r as s,a as e,j as r,K as D,n as E}from"./app-b7785dc1.js";import{A}from"./AuthenticatedLayout-195bbb02.js";import{I as k}from"./InputError-468686c0.js";import{I as y}from"./InputLabel-2fab178d.js";import{P as B}from"./PrimaryButton-99a2ad37.js";import{D as _,M as H,S as M}from"./DangerButton-0f20ebe3.js";import"./_commonjsHelpers-042e6b4d.js";import"./ApplicationLogo-dcf0c075.js";import"./transition-937e7a14.js";const P=s.forwardRef(function({name:m,id:c,value:a,className:f,options:g,required:p,isFocused:l,handleChange:i},o){const u=o||s.useRef();return s.useEffect(()=>{l&&u.current.focus()},[]),e("div",{className:"flex flex-col items-start",children:e("select",{name:m,id:c,defaultValue:a,className:"border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "+f,ref:u,multiple:!0,required:p,onChange:n=>i(n),children:g.map(n=>e("option",{value:n.value,children:n.label},n.value))})})}),R=s.forwardRef(function({type:m="text",name:c,id:a,value:f,className:g,autoComplete:p,required:l,isFocused:i,options:o,handleChange:u},n){const h=n||s.useRef();return s.useEffect(()=>{i&&h.current.focus()},[]),r("div",{className:"flex flex-col items-start",children:[e("input",{type:m,name:c,id:a,value:f,className:"border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "+g,ref:h,autoComplete:p,required:l,onChange:d=>u(d)}),o&&e("div",{className:"relative w-full",children:e("ul",{className:"mt-1 z-10 bg-white rounded-md shadow-lg max-h-56 overflow-y-auto",children:o.map((d,v)=>e("li",{children:e("button",{type:"button",className:"w-full block px-4 py-2 text-sm leading-5 text-left text-gray-700 hover:bg-indigo-500 hover:text-white",onClick:x=>{h.current.value=d,x.target.name=c,x.target.value=d,u(x,{cleanOption:!0})},children:d})},v))})})]})});function J({auth:b,status:m,title:c,pasien:a=null,registrans:f,units:g}){const[p,l]=s.useState(!1),i=D({no_kartu:a?a.no_kartu:"",jenis_unit:a?a.jenis_unit:[]}),{data:o,setData:u,processing:n,errors:h,reset:d}=i,v=t=>{t.preventDefault(),a?i.patch(route("dashboard.edit",a.id)):i.post(route("dashboard.new"))};s.useEffect(()=>()=>{d("no_kartu","jenis_unit")},[]);const x=f.map(t=>t.no_kartu),[w,j]=s.useState(),S=(t,{cleanOption:N}={})=>{u(t.target.name,t.target.type==="checkbox"?t.target.checked:t.target.value),j(N?[]:x.filter(C=>C.includes(t.target.value)))},I=t=>{u(t.target.name,Array.from(t.target.selectedOptions,N=>N.value))};return r(A,{auth:b,header:e("h2",{className:"font-semibold text-xl text-gray-800  leading-tight",children:c}),children:[e(E,{title:c}),e("div",{className:"py-12",children:e("div",{className:"max-w-xl mx-auto sm:px-6 lg:px-8",children:e("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:r("div",{className:"p-6 text-gray-900 ",children:[m&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:m}),r("form",{onSubmit:v,children:[r("div",{className:"mt-4",children:[e(y,{forInput:"no_kartu",value:"No Kartu Pasien"}),e(R,{type:"number",id:"no_kartu",name:"no_kartu",className:"mt-1 block w-full",value:o.no_kartu,options:w,handleChange:S}),e(k,{message:h.no_kartu,className:"mt-2"})]}),r("div",{className:"mt-4",children:[e(y,{forInput:"no_kartu",value:"ID Pasien"}),e(P,{id:"jenis_unit",name:"jenis_unit",value:o.jenis_unit,className:"mt-1 block w-full",handleChange:I,options:g.map(t=>({label:t.jenis_unit,value:t.jenis_unit}))}),e(k,{message:h.jenis_unit,className:"mt-2"})]}),r("div",{className:a?"flex items-center justify-between mt-4":"flex items-center justify-end mt-4",children:[a&&e(_,{type:"button",className:"mr-4",processing:n,onClick:()=>l(!0),children:"Hapus Data"}),e(B,{className:"ml-4",processing:n,children:a?"Ubah Data":"Simpan Data"})]})]})]})})})}),a&&e(H,{show:p,onClose:()=>l(!1),children:r("div",{className:"p-6",children:[r("h2",{className:"text-lg font-medium text-gray-900 ",children:["Apakah kamu yakin ingin menghapus data kunjungan"," ",e("b",{children:a.nama_pasien})," ?"]}),e("p",{className:"mt-1 text-sm text-gray-600 ",children:"Setelah data dihapus, semua sumber daya dan datanya akan dihapus secara permanen."}),r("div",{className:"mt-6 flex justify-end",children:[e(M,{onClick:()=>l(!1),children:"Batalkan"}),e(_,{className:"ml-3",processing:n,onClick:()=>{i.delete(route("dashboard.delete",a.id),{preserveScroll:!0,onSuccess:()=>l(!1)})},children:"Hapus Data"})]})]})})]})}export{J as default};
