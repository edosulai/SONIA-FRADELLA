import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ReactDOMServer from "react-dom/server";
import { Head, Link } from "@inertiajs/react";
import Table from "@/Components/Table";
import React from "react";
import CetakTable from "@/Components/CetakTable";

export default function ResultANP({ auth, anp, status }) {
    const celltoLink = (data, td, rowIndex, cellIndex) =>
        ReactDOMServer.renderToString(
            <span className="flex items-center px-4 py-2">{data}</span>
        );

    const columnSetting = [
        { from: "No", to: "No", select: 0, sort: "asc", render: celltoLink },
        {
            from: "nama_pasien",
            to: "Nama Pasien",
            select: 1,
            render: celltoLink,
        },
        {
            from: "nama_kepala_keluarga",
            to: "Nama KK",
            select: 2,
            render: celltoLink,
        },
        {
            from: "no_kartu",
            to: "No Kartu",
            select: 3,
            render: celltoLink,
        },
        {
            from: "umur",
            to: "Umur",
            select: 4,
            render: celltoLink,
        },
        {
            from: "jenis_kelamin",
            to: "Jenis Kelamin",
            select: 5,
            render: celltoLink,
        },
        {
            from: "status",
            to: "Status",
            select: 6,
            render: celltoLink,
        },
        {
            from: "priority",
            to: "Tingkat Prioritas",
            select: 7,
            render: celltoLink,
        },
    ];

    const data = _.sortBy(anp, "priority").reverse();

    const dataWithIndex = _.map(data, (item, index) =>
        _.extend({}, item, {
            No: String(index + 1).padStart(data.length.toString().length, "0"),
        })
    );

    const fromTo = _.map(dataWithIndex, (obj) =>
        _.reduce(
            columnSetting,
            (result, m) => {
                result[m.to] = obj[m.from];
                return result;
            },
            {}
        )
    );

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex">
                    <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                        Hasil Sorting ANP
                    </h2>
                    <div className="space-x-4 -my-px ml-10 flex">
                        <Link
                            href={route("dashboard.new")}
                            className="rounded block px-4 py-2 text-sm leading-5 text-light-700 hover:bg-light-100 focus:outline-none focus:bg-light-10 transition duration-150 ease-in-out"
                        >
                            Tambah Kunjungan
                        </Link>
                        <Link
                            href={route("dashboard.anp")}
                            className="rounded block px-4 py-2 text-sm leading-5 text-light-700 hover:bg-light-100 focus:outline-none focus:bg-light-10 transition duration-150 ease-in-out"
                        >
                            Sorting ANP
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Hasil Sorting ANP" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600">
                                    {status}
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <Table
                                    data={fromTo}
                                    columns={columnSetting}
                                    tops={[
                                        {
                                            element: CetakTable,
                                            context: {
                                                nama: "Laporan Hasil Sorting Pasien Sesuai Nilai Prioritas",
                                                tombol: "Cetak Laporan Prioritas",
                                            },
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
