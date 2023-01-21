import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectMultipleInput from "@/Components/SelectMultipleInput";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import SearchInput from "@/Components/SearchInput";

export default function Index({
    auth,
    status,
    title,
    pasien = null,
    registrans,
    units,
}) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const useFormInertia = useForm({
        no_kartu: pasien ? pasien.no_kartu : "",
        jenis_unit: pasien ? pasien.jenis_unit : [],
    });

    const { data, setData, processing, errors, reset } = useFormInertia;

    const submit = (e) => {
        e.preventDefault();

        if (pasien) {
            useFormInertia.patch(route("dashboard.edit", pasien.id));
        } else {
            useFormInertia.post(route("dashboard.new"));
        }
    };

    useEffect(() => {
        return () => {
            reset("no_kartu", "jenis_unit");
        };
    }, []);

    const searchValues = registrans.map((registran) => registran.no_kartu);

    const [options, setOptions] = useState();

    const onHandleSearchChange = (event, { cleanOption } = {}) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );

        setOptions(
            cleanOption
                ? []
                : searchValues.filter((search) =>
                      search.includes(event.target.value)
                  )
        );
    };

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            Array.from(event.target.selectedOptions, (item) => item.value)
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
                                <div className="mt-4">
                                    <InputLabel
                                        forInput="no_kartu"
                                        value="No Kartu Pasien"
                                    />

                                    <SearchInput
                                        type="number"
                                        id="no_kartu"
                                        name="no_kartu"
                                        className="mt-1 block w-full"
                                        value={data.no_kartu}
                                        options={options}
                                        handleChange={onHandleSearchChange}
                                    />

                                    <InputError
                                        message={errors.no_kartu}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="no_kartu"
                                        value="ID Pasien"
                                    />

                                    <SelectMultipleInput
                                        id="jenis_unit"
                                        name="jenis_unit"
                                        value={data.jenis_unit}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        options={units.map((u) => ({
                                            label: u.jenis_unit,
                                            value: u.jenis_unit,
                                        }))}
                                    />

                                    <InputError
                                        message={errors.jenis_unit}
                                        className="mt-2"
                                    />
                                </div>

                                <div
                                    className={
                                        pasien
                                            ? "flex items-center justify-between mt-4"
                                            : "flex items-center justify-end mt-4"
                                    }
                                >
                                    {pasien && (
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
                                        {pasien ? "Ubah Data" : "Simpan Data"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {pasien && (
                <Modal
                    show={confirmingDeletion}
                    onClose={() => setConfirmingDeletion(false)}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 ">
                            Apakah kamu yakin ingin menghapus data kunjungan{" "}
                            <b>{pasien.nama_pasien}</b> ?
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
                                        route("dashboard.delete", pasien.id),
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
