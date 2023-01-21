import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function RangeInput(
    { name, id, value, className, min, max, step, handleChange },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        input.current.value = value;
    }, [value]);

    return (
        <div className="flex flex-col items-start">
            <input
                type="range"
                name={name}
                id={id}
                className={
                    `appearance-none bg-gray-300 focus:ring-indigo-500  rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
});
