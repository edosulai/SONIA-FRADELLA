import moment from "moment";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useEffect, createContext } from "react";
import ReactDOMServer from "react-dom/server";
import {
    UserCircleIcon,
    PlusCircleIcon,
    HomeIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Table from "@/Components/Table";
import { forElse } from "@/Utils/Helpers";
import CetakTable from "@/Components/CetakTable";
import DateRange from "@/Components/DateRange";

export default function Dashboard({
    auth,
    pasien,
    status,
    unit,
    total_pasien,
    total_dokter,
    total_registran,
}) {
    const celltoLink = (data, td, rowIndex, cellIndex) =>
        ReactDOMServer.renderToString(
            <Link
                className="flex items-center cursor-pointer px-4 py-2"
                href={route("dashboard.edit", data[1])}
                tabIndex="-1"
            >
                {data[0]}
            </Link>
        );

    const columnSetting = [
        { from: "id", to: "id", select: 0, hidden: true },
        { from: "No", to: "No", select: 1, sort: "asc", render: celltoLink },
        {
            from: "created_at",
            to: "Tanggal",
            select: 2,
            render: (data, td, rowIndex, cellIndex) =>
                ReactDOMServer.renderToString(
                    <Link
                        className="flex items-center cursor-pointer px-4 py-2"
                        href={route("dashboard.edit", data[1])}
                        tabIndex="-1"
                    >
                        {new Date(data[0]).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </Link>
                ),
        },
        {
            from: "nama_pasien",
            to: "Nama Pasien",
            select: 3,
            render: celltoLink,
        },
        {
            from: "nama_kepala_keluarga",
            to: "Nama KK",
            select: 4,
            render: celltoLink,
        },
        {
            from: "no_kartu",
            to: "No Kartu",
            select: 5,
            render: celltoLink,
        },
        {
            from: "umur",
            to: "Umur",
            select: 6,
            render: celltoLink,
        },
        {
            from: "jenis_kelamin",
            to: "Jenis Kelamin",
            select: 7,
            render: celltoLink,
        },
        {
            from: "status",
            to: "Status",
            select: 8,
            render: celltoLink,
        },
        ...unit.map((u, index) => ({
            from: "jenis_unit",
            to: u.jenis_unit,
            select: 9 + parseInt(index),
            render: (data, td, rowIndex, cellIndex) => {
                return ReactDOMServer.renderToString(
                    <Link
                        className="flex items-center cursor-pointer px-4 py-2"
                        href={route("dashboard.edit", data[1])}
                        tabIndex="-1"
                    >
                        {(unit[cellIndex - 9] &&
                            data[0] == unit[cellIndex - 9].jenis_unit &&
                            "✓") || (
                            <XMarkIcon className="w-6 h-6 text-red-500" />
                        )}
                    </Link>
                );
            },
        })),
    ];

    const filteredData = _.map(pasien, (obj) =>
        _.pick(obj, _.map(columnSetting, "from"))
    );

    const fromTo = _.map(filteredData, (obj) =>
        _.reduce(
            columnSetting,
            (result, m) => {
                result[m.to] = obj[m.from];
                return result;
            },
            {}
        )
    );

    const mergedData = fromTo.reduce((acc, curr) => {
        // mencari objek dengan "Tanggal" dan "No Kartu" yang sama
        let found = acc.find(
            (obj) =>
                obj["Tanggal"] === curr["Tanggal"] &&
                obj["No Kartu"] === curr["No Kartu"]
        );
        if (found) {
            // jika ditemukan, menggabungkan objek yang ditemukan dengan objek saat ini
            // menggunakan metode assign untuk menyalin properti dari objek saat ini ke objek yang ditemukan
            // mengecualikan properti "Umum","Balita","Lansia" yang memiliki nama dan nilai yang sama
            Object.keys(curr).forEach((key) => {
                forElse(
                    unit,
                    (u, i, breakLoop) => {
                        if (u.jenis_unit == key) {
                            if (found[key] == key) {
                                found[key] = found[key];
                            } else if (curr[key] == key) {
                                found[key] = curr[key];
                            } else {
                                found[key] = found[key];
                            }

                            return breakLoop();
                        }
                    },
                    () => {
                        found[key] = curr[key];
                    }
                );
            });
        } else {
            // jika tidak ditemukan, menambahkan objek saat ini ke hasil akhir
            acc.push(curr);
        }
        return acc;
    }, []);

    const dataWithIndex = _.map(mergedData, (item, index) =>
        _.extend({}, item, {
            No: String(index + 1).padStart(
                mergedData.length.toString().length,
                "0"
            ),
        })
    );

    const newData = _.map(dataWithIndex, function (obj) {
        return _.mapValues(obj, function (value, key) {
            if (key === "id") {
                return;
            }
            return [value, obj.id];
        });
    });

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex">
                    <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                        Dashboard
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
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            <div className="flex justify-between gap-16">
                                <div className="pl-1 w-96 h-20 bg-blue-400 rounded-lg shadow-md">
                                    <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                        <div className="my-auto">
                                            <p className="font-bold">
                                                TOTAL PASIEN
                                            </p>
                                            <p className="text-lg">
                                                {total_registran} Pasien
                                            </p>
                                        </div>
                                        <div className="my-auto">
                                            <UserCircleIcon className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pl-1 w-96 h-20 bg-green-400 rounded-lg shadow-md">
                                    <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                        <div className="my-auto">
                                            <p className="font-bold">
                                                JUMLAH DOKTER
                                            </p>
                                            <p className="text-lg">
                                                {total_dokter} Dokter
                                            </p>
                                        </div>
                                        <div className="my-auto">
                                            <PlusCircleIcon className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pl-1 w-96 h-20 bg-yellow-400 rounded-lg shadow-md">
                                    <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                        <div className="my-auto">
                                            <p className="font-bold">
                                                TOTAL KUNJUNGAN (BULANAN)
                                            </p>
                                            <p className="text-lg">
                                                {total_pasien} Orang
                                            </p>
                                        </div>
                                        <div className="my-auto">
                                            <HomeIcon className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 text-gray-900">
                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600">
                                    {status}
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <Table
                                    data={newData}
                                    columns={columnSetting}
                                    tops={[
                                        {
                                            element: CetakTable,
                                            context: {
                                                nama: "Laporan Kunjungan",
                                                tombol: "Cetak Laporan",
                                                orientation: "landscape",
                                            },
                                        },
                                        {
                                            element: DateRange,
                                            context: {
                                                from:
                                                    dataWithIndex.length > 0
                                                        ? moment
                                                              .utc(
                                                                  _.minBy(
                                                                      dataWithIndex,
                                                                      (o) =>
                                                                          new Date(
                                                                              o.Tanggal
                                                                          )
                                                                  ).Tanggal
                                                              )
                                                              .toDate()
                                                        : new Date(),
                                                to:
                                                    dataWithIndex.length > 0
                                                        ? moment
                                                              .utc(
                                                                  _.maxBy(
                                                                      dataWithIndex,
                                                                      (o) =>
                                                                          new Date(
                                                                              o.Tanggal
                                                                          )
                                                                  ).Tanggal
                                                              )
                                                              .toDate()
                                                        : new Date(),
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
