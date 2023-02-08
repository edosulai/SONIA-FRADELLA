import DateInput from "@/Components/DateInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function DateRange({ ctx, tableRef }) {
    const { data, setData, get, processing, errors } = useForm({
        from: ctx.from,
        to: ctx.to,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        get(route("dashboard"));
    };

    useEffect(() => {
        return () => {
            reset("from", "to");
        };
    }, []);

    return (
        <form onSubmit={submit}>
            <div className="flex items-end">
                <div className="mr-2">
                    <DateInput
                        id="from"
                        type="from"
                        name="from"
                        value={data.from}
                        className="block w-[180px]"
                        handleChange={onHandleChange}
                    />
                </div>
                <div className="mr-2">
                    <DateInput
                        id="to"
                        type="to"
                        name="to"
                        value={data.to}
                        className="block w-[180px]"
                        handleChange={onHandleChange}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="border-[#e5e7eb] bg-[#d9d9d9] shadow-sm border-[1px] px-5 py-2"
                        disabled={processing}
                    >
                        Cari
                    </button>
                </div>
            </div>
        </form>
    );
}
