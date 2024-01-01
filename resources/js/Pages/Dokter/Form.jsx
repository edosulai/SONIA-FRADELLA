import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";

export default function Index({
    auth,
    status,
    spesialis,
    title,
    dokter = null,
}) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const useFormInertia = useForm({
        nama_dokter: dokter ? dokter.nama_dokter : "",
        no_identitas: dokter ? dokter.no_identitas : 0,
        spesialis_id: dokter ? dokter.spesialis_id : spesialis[0].id,
    });

    const { data, setData, processing, errors, reset } = useFormInertia;

    const submit = (e) => {
        e.preventDefault();

        if (dokter) {
            useFormInertia.patch(route("dokter.edit", dokter.id));
        } else {
            useFormInertia.post(route("dokter.new"));
        }
    };

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

                                <div
                                    className={
                                        dokter
                                            ? "flex items-center justify-between mt-4"
                                            : "flex items-center justify-end mt-4"
                                    }
                                >
                                    {dokter && (
                                        <DangerButton
                                            type="button"
                                            className="mr-4"
                                            processing={processing}
                                            onClick={() =>
                                                setConfirmingDeletion(true)
                                            }
                                        >
                                            Hapus Data
                                        </DangerButton>
                                    )}
                                    <PrimaryButton
                                        className="ml-4"
                                        processing={processing}
                                    >
                                        {dokter ? "Ubah Data" : "Simpan Data"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {dokter && (
                <Modal
                    show={confirmingDeletion}
                    onClose={() => setConfirmingDeletion(false)}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 ">
                            Apakah kamu yakin ingin menghapus data dokter{" "}
                            <b>{dokter.nama_dokter}</b> ?
                        </h2>

                        <p className="mt-1 text-sm text-gray-600 ">
                            Setelah data dihapus, semua sumber daya dan datanya
                            akan dihapus secara permanen.
                        </p>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton
                                onClick={() => setConfirmingDeletion(false)}
                            >
                                Batalkan
                            </SecondaryButton>

                            <DangerButton
                                className="ml-3"
                                processing={processing}
                                onClick={() => {
                                    useFormInertia.delete(
                                        route("dokter.delete", dokter.id),
                                        {
                                            preserveScroll: true,
                                            onSuccess: () =>
                                                setConfirmingDeletion(false),
                                        }
                                    );
                                }}
                            >
                                Hapus Data
                            </DangerButton>
                        </div>
                    </div>
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
