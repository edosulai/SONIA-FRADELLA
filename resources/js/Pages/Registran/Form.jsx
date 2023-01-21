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
import TextAreaInput from "@/Components/TextAreaInput";

export default function Index({ auth, status, title, registran = null }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const useFormInertia = useForm({
        nama_pasien: registran ? registran.nama_pasien : "",
        nama_kepala_keluarga: registran ? registran.nama_kepala_keluarga : "",
        no_kartu: registran ? registran.no_kartu : 0,
        umur: registran ? registran.umur : 0,
        alamat: registran ? registran.alamat : "",
        jenis_kelamin: registran ? registran.jenis_kelamin : "",
        status: registran ? registran.status : "",
    });

    const { data, setData, processing, errors, reset } = useFormInertia;

    const submit = (e) => {
        e.preventDefault();

        if (registran) {
            useFormInertia.patch(route("registran.edit", registran.id));
        } else {
            useFormInertia.post(route("registran.new"));
        }
    };

    useEffect(() => {
        return () => {
            reset(
                "nama_pasien",
                "nama_kepala_keluarga",
                "no_kartu",
                "umur",
                "alamat",
                "jenis_kelamin",
                "status"
            );
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
                                        forInput="nama_pasien"
                                        value="Nama Pasien"
                                    />

                                    <TextInput
                                        id="nama_pasien"
                                        type="text"
                                        name="nama_pasien"
                                        value={data.nama_pasien}
                                        className="mt-1 block w-full"
                                        autoComplete="nama_pasien"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.nama_pasien}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="nama_kepala_keluarga"
                                        value="Nama Kepala Keluarga"
                                    />

                                    <TextInput
                                        id="nama_kepala_keluarga"
                                        type="text"
                                        name="nama_kepala_keluarga"
                                        value={data.nama_kepala_keluarga}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.nama_kepala_keluarga}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="no_kartu"
                                        value="Nama Kartu"
                                    />

                                    <TextInput
                                        id="no_kartu"
                                        type="number"
                                        name="no_kartu"
                                        value={data.no_kartu}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.no_kartu}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="umur"
                                        value="Umur Pasien"
                                    />

                                    <TextInput
                                        id="umur"
                                        type="number"
                                        name="umur"
                                        value={data.umur}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.umur}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="jenis_kelamin"
                                        value="Jenis Kelamin"
                                    />

                                    <SelectInput
                                        id="jenis_kelamin"
                                        name="jenis_kelamin"
                                        value={data.jenis_kelamin}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        options={[
                                            {
                                                label: "Laki-Laki",
                                                value: "laki-laki",
                                            },
                                            {
                                                label: "Perempuan",
                                                value: "perempuan",
                                            },
                                        ]}
                                    />

                                    <InputError
                                        message={errors.jenis_kelamin}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="status"
                                        value="Status Pasien"
                                    />

                                    <SelectInput
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        options={[
                                            {
                                                label: "Umum",
                                                value: "umum",
                                            },
                                            {
                                                label: "JKM",
                                                value: "jkm",
                                            },
                                            {
                                                label: "BPJS",
                                                value: "bpjs",
                                            },
                                        ]}
                                    />

                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="alamat"
                                        value="Alamat Pasien"
                                    />

                                    <TextAreaInput
                                        id="alamat"
                                        type="text"
                                        name="alamat"
                                        value={data.alamat}
                                        className="mt-1 block w-full"
                                        rows="3"
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.alamat}
                                        className="mt-2"
                                    />
                                </div>

                                <div
                                    className={
                                        registran
                                            ? "flex items-center justify-between mt-4"
                                            : "flex items-center justify-end mt-4"
                                    }
                                >
                                    {registran && (
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
                                        {registran
                                            ? "Ubah Data"
                                            : "Simpan Data"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {registran && (
                <Modal
                    show={confirmingDeletion}
                    onClose={() => setConfirmingDeletion(false)}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 ">
                            Apakah kamu yakin ingin menghapus data registran{" "}
                            <b>{registran.nama_pasien}</b> ?
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
                                        route("registran.delete", registran.id),
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
