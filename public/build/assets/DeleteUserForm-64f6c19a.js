import{r as l,K as g,j as s,a as e}from"./app-b206ddfc.js";import{D as c,M as x,S as N}from"./DangerButton-dc7b2265.js";import{I as D}from"./InputError-5578c82d.js";import{I as v}from"./InputLabel-cd2c3147.js";import{T as C}from"./TextInput-71b35c04.js";import"./transition-877674c1.js";function A({className:d}){const[i,o]=l.useState(!1),a=l.useRef(),{data:m,setData:u,delete:p,processing:f,reset:n,errors:y}=g({password:""}),h=()=>{o(!0)},w=r=>{r.preventDefault(),p(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>t(),onError:()=>a.current.focus(),onFinish:()=>n()})},t=()=>{o(!1),n()};return s("section",{className:`space-y-6 ${d}`,children:[s("header",{children:[e("h2",{className:"text-lg font-medium text-gray-900 ",children:"Delete Account"}),e("p",{className:"mt-1 text-sm text-gray-600 ",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."})]}),e(c,{onClick:h,children:"Delete Account"}),e(x,{show:i,onClose:t,children:s("form",{onSubmit:w,className:"p-6",children:[e("h2",{className:"text-lg font-medium text-gray-900 ",children:"Are you sure you want to delete your account?"}),e("p",{className:"mt-1 text-sm text-gray-600 ",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."}),s("div",{className:"mt-6",children:[e(v,{for:"password",value:"Password",className:"sr-only"}),e(C,{id:"password",type:"password",name:"password",ref:a,value:m.password,handleChange:r=>u("password",r.target.value),className:"mt-1 block w-3/4",isFocused:!0,placeholder:"Password"}),e(D,{message:y.password,className:"mt-2"})]}),s("div",{className:"mt-6 flex justify-end",children:[e(N,{onClick:t,children:"Cancel"}),e(c,{className:"ml-3",processing:f,children:"Delete Account"})]})]})})]})}export{A as default};