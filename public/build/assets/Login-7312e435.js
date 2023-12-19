import{a as e,K as h,r as g,j as s,n as b}from"./app-1c2b3a01.js";import{G as x}from"./GuestLayout-15a2aaf5.js";import{I as i}from"./InputError-a318d43f.js";import{I as c}from"./InputLabel-b88b18b6.js";import{P as w}from"./PrimaryButton-512e0b3f.js";import{T as d}from"./TextInput-e5d1f89d.js";import"./ApplicationLogo-dbed9a2f.js";function N({name:t,value:l,handleChange:r}){return e("input",{type:"checkbox",name:t,value:l,className:"rounded  border-gray-300  text-indigo-600 shadow-sm focus:ring-indigo-500  ",onChange:m=>r(m)})}function P({status:t,canResetPassword:l}){const{data:r,setData:m,post:u,processing:p,errors:n,reset:f}=h({email:"",password:"",remember:""});g.useEffect(()=>()=>{f("password")},[]);const o=a=>{m(a.target.name,a.target.type==="checkbox"?a.target.checked:a.target.value)};return s(x,{children:[e(b,{title:"Log in"}),t&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:t}),s("form",{onSubmit:a=>{a.preventDefault(),u(route("login"))},children:[s("div",{children:[e(c,{forInput:"email",value:"Email"}),e(d,{id:"email",type:"email",name:"email",value:r.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,handleChange:o}),e(i,{message:n.email,className:"mt-2"})]}),s("div",{className:"mt-4",children:[e(c,{forInput:"password",value:"Password"}),e(d,{id:"password",type:"password",name:"password",value:r.password,className:"mt-1 block w-full",autoComplete:"current-password",handleChange:o}),e(i,{message:n.password,className:"mt-2"})]}),e("div",{className:"block mt-4",children:s("label",{className:"flex items-center",children:[e(N,{name:"remember",value:r.remember,handleChange:o}),e("span",{className:"ml-2 text-sm text-gray-600 ",children:"Remember me"})]})}),s("div",{className:"flex items-center justify-end mt-4",children:[!1,e(w,{className:"ml-4",processing:p,children:"Log in"})]})]})]})}export{P as default};