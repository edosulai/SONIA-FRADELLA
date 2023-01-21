import { forwardRef, useEffect, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "../../scss/datepicker.scss";

import id from "date-fns/locale/id"; // the locale you want
registerLocale("id", id); // register it with the name you want

export default forwardRef(function DateInput(
    { name, id, value, className, required, isFocused, handleChange },
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
            <DatePicker
                locale="id"
                dateFormat="dd-MMM-yyyy"
                name={name}
                id={id}
                selected={value}
                className={
                    `border-gray-300    focus:border-indigo-500  focus:ring-indigo-500  rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                required={required}
                onChange={(e) =>
                    handleChange({
                        target: {
                            name: name,
                            value: e,
                        },
                    })
                }
            />
        </div>
    );
});
