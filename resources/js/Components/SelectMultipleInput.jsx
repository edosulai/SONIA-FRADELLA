import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SelectMultipleInput(
    { name, id, value, className, options, required, isFocused, handleChange },
    ref
) {
    const input = ref ? ref : useRef();
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <select
                // name={name + "[]"}
                name={name}
                id={id}
                defaultValue={value}
                className={
                    `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                multiple={true}
                required={required}
                onChange={(e) => handleChange(e)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
});





// export default forwardRef(function SelectMultipleInput(
//     { name, id, value, options, required, isFocused, handleChange },
//     ref
// ) {
//     const [selecteds, setSelecteds] = useState([]);
//     const [show, setShow] = useState(false);
//     const options = [
//         { value: 1, text: "Option 1" },
//         { value: 2, text: "Option 2" },
//         { value: 3, text: "Option 3" },
//         { value: 4, text: "Option 4" },
//     ];

//     const removeSelected = (index, option) => {
//         setSelecteds(selecteds.filter((selected) => selected !== option));
//     };

//     const selectedValues = () => {
//         return selecteds.map((selected) => options[selected].text).join(", ");
//     };

//     return (
//         <div className="flex flex-col items-center relative">
//             <div>awd</div>
//             <div onClick={() => setShow(true)} className="w-full">
//                 <div className="p-1 flex bg-light-100 w-full rounded-md border border-light-300">
//                     <div className="flex flex-auto flex-wrap">
//                         {selecteds.map((option, index) => {
//                             return (
//                                 <div
//                                     key={options[option].value}
//                                     className="flex justify-center items-center m-1 font-medium py-1 px-1 bg-light-100 rounded-md border border-light-300"
//                                 >
//                                     <div className="text-xs font-normal leading-none max-w-full flex-initial">
//                                         {options[option].text}
//                                     </div>
//                                     <div className="flex flex-auto flex-row-reverse">
//                                         <div
//                                             onClick={() =>
//                                                 removeSelected(index, option)
//                                             }
//                                         >
//                                             <svg
//                                                 className="fill-current h-4 w-4 "
//                                                 role="button"
//                                                 viewBox="0 0 20 20"
//                                             >
//                                                 <path d="M14.348,14.849c-0.469,0.469-1.229,0.469-1.697,0L10,11.819l-2.651,3.029c-0.469,0.469-1.229,0.469-1.697,0c-0.469-0.469-0.469-1.229,0-1.697l2.758-3.15L5.651,6.849c-0.469-0.469-0.469-1.228,0-1.697s1.228-0.469,1.697,0L10,8.183l2.651-3.031c0.469-0.469,1.228-0.469,1.697,0s0.469,1.229,0,1.697l-2.758,3.152l2.758,3.152C14.817,13.62,14.817,14.38,14.348,14.849z" />
//                                             </svg>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//             {show && (
//                 <div className="absolute z-10 w-full">
//                     <div className="bg-light-100 rounded-md">
//                         <ul className="p-1">
//                             {options.map((option, index) => {
//                                 return (
//                                     <li key={option.value}>
//                                         <label className="block cursor-pointer py-1 px-1">
//                                             <input
//                                                 type="checkbox"
//                                                 className="mr-1"
//                                                 checked={
//                                                     selecteds.indexOf(index) !==
//                                                     -1
//                                                 }
//                                                 onChange={() => {
//                                                     if (
//                                                         selecteds.indexOf(
//                                                             index
//                                                         ) === -1
//                                                     ) {
//                                                         setSelecteds([
//                                                             ...selecteds,
//                                                             index,
//                                                         ]);
//                                                     } else {
//                                                         removeSelected(
//                                                             index,
//                                                             index
//                                                         );
//                                                     }
//                                                 }}
//                                             />
//                                             {option.text}
//                                         </label>
//                                     </li>
//                                 );
//                             })}
//                         </ul>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// });
