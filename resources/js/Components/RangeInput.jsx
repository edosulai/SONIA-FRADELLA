import { forwardRef, useEffect, useRef, useState } from "react";

export default forwardRef(function RangeInput(
    { name, id, value, className, min, max, step, handleChange },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        input.current.value = value;
    }, [value]);

    const [tooltip, setTooltip] = useState({
        display: 'none',
        top: 0,
        left: 0,
        value: 0,
    });

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
                onMouseDown={(e) => {
                    setTooltip({ ...tooltip, display: 'block' });
                }}
                onMouseMove={(e) => {
                    const thumbSize = 14;
                    const thumbFromMouse = 20;

                    const { clientX, clientY } = e;
                    const rect = e.target.getBoundingClientRect();
                    const x = clientX - rect.left  - thumbSize;
                    const y = clientY - thumbFromMouse - rect.top;

                    setTooltip({
                        ...tooltip,
                        left: x,
                        top: y,
                        value: e.target.value,
                    });
                }}
                onChange={(e) => {
                    handleChange(e)
                }}
                onMouseUp={() => {
                    setTooltip({ ...tooltip, display: 'none' });
                }}
            />
            <div
                className="absolute bg-gray-300 px-2 py-1 rounded-md text-xs"
                style={{
                    display: tooltip.display,
                    top: tooltip.top,
                    left: tooltip.left,
                }}
            >
                {tooltip.value}
            </div>
        </div>
    );
});
