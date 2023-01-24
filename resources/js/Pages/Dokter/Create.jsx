import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import SelectInput from "@/Components/SelectInput";

export default function Index({ auth, status, spesialis }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_dokter: "",
        no_identitas: 0,
        spesialis_id: 0,
    });

    useEffect(() => {
        return () => {
            reset("nama_dokter", "no_identitas", "spesialis_id");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("dokter.new"));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                    Dokter
                </h2>
            }
        >
            <Head title="Dokter" />

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
                                <div>
                                    <InputLabel
                                        forInput="nama_dokter"
                                        value="Nama Dokter"
                                    />

                                    <TextInput
                                        id="nama_dokter"
                                        type="text"
                                        name="nama_dokter"
                                        value={data.nama_dokter}
                                        className="mt-1 block w-full"
                                        autoComplete="nama_dokter"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.nama_dokter}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="no_identitas"
                                        value="No Identitas Dokter"
                                    />

                                    <TextInput
                                        id="no_identitas"
                                        type="number"
                                        name="no_identitas"
                                        value={data.no_identitas}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.no_identitas}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="spesialis_id"
                                        value="Bidang Spesialis"
                                    />

                                    <SelectInput
                                        id="spesialis_id"
                                        type="number"
                                        name="spesialis_id"
                                        value={data.spesialis_id}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        options={spesialis.map((spesial) => ({
                                            label: spesial.nama_spesialis,
                                            value: spesial.id,
                                        }))}
                                    />

                                    <InputError
                                        message={errors.spesialis_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton
                                        className="ml-4"
                                        processing={processing}
                                    >
                                        Simpan Data
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
