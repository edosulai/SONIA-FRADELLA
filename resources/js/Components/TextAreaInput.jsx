import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextAreaInput(
    { name, id, value, className, rows, required, isFocused, handleChange },
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
            <textarea
                name={name}
                id={id}
                value={value}
                rows={rows}
                className={
                    `border-gray-300    focus:border-indigo-500  focus:ring-indigo-500  rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
});
