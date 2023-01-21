import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import _ from "lodash";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RangeInput from "@/Components/RangeInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function FormANP({ auth, status, title, unit, ageRange }) {
    const inputForm = {
        ...Object.assign(...unit.map((u) => ({ ["unit" + u.id]: 0 }))),
        umur: ageRange.min_umur,
    };

    const { data, setData, post, processing, errors, reset } =
        useForm(inputForm);

    useEffect(() => {
        return () => {
            reset(_.keys(inputForm));
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("dashboard.anp"));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                    {title}
                </h2>
            }
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div className="mt-4 relative">
                                    <InputLabel
                                        forInput="umur"
                                        value={`Umur Pasien (${ageRange.min_umur}-${ageRange.max_umur})`}
                                    />

                                    <RangeInput
                                        id="umur"
                                        name="umur"
                                        value={data.umur}
                                        min={ageRange.min_umur}
                                        max={ageRange.max_umur}
                                        step="1"
                                        className="
                                            mt-1 block w-full
                                            before:content-['min'] before:absolute before:left-0 before:top-11
                                            after:content-['max'] after:absolute after:right-0 after:top-11
                                        "
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.umur}
                                        className="mt-2"
                                    />
                                </div>

                                {unit &&
                                    unit.map((u, i) => (
                                        <div key={u.id} className="mt-10 relative">
                                            <InputLabel
                                                forInput={_.keys(inputForm)[i]}
                                                value={`Frekuensi ${u.jenis_unit} (0-${u.banyak_jenis_unit})`}
                                            />

                                            <RangeInput
                                                id={_.keys(inputForm)[i]}
                                                name={_.keys(inputForm)[i]}
                                                value={
                                                    data[_.keys(inputForm)[i]]
                                                }
                                                min="0"
                                                max={u.banyak_jenis_unit}
                                                step="1"
                                                className={`
                                                    mt-1 block w-full
                                                    before:content-['min'] before:absolute before:left-0 before:top-11
                                                    after:content-['max'] after:absolute after:right-0 after:top-11
                                                `}
                                                handleChange={onHandleChange}
                                            />

                                            <InputError
                                                message={
                                                    errors[_.keys(inputForm)[i]]
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    ))}

                                <div className="flex items-center justify-end mt-16">
                                    <PrimaryButton
                                        className="ml-4"
                                        processing={processing}
                                    >
                                        Proses ANP
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
