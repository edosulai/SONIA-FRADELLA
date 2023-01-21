import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SearchInput(
    {
        type = "text",
        name,
        id,
        value,
        className,
        autoComplete,
        required,
        isFocused,
        options,
        handleChange,
    },
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
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
            {options && (
                <div className="relative w-full">
                    <ul className="mt-1 z-10 bg-white rounded-md shadow-lg max-h-56 overflow-y-auto">
                        {options.map((option, index) => (
                            <li key={index}>
                                <button
                                    type="button"
                                    className="w-full block px-4 py-2 text-sm leading-5 text-left text-gray-700 hover:bg-indigo-500 hover:text-white"
                                    onClick={(e) => {
                                        input.current.value = option;
                                        e.target.name = name;
                                        e.target.value = option;
                                        handleChange(e, { cleanOption: true });
                                    }}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});
