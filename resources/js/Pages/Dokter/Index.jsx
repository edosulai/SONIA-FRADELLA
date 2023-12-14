import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ReactDOMServer from "react-dom/server";
import CetakTable from "@/Components/CetakTable";

export default function Index({ data, auth, status }) {
    const celltoLink = function (data, td, rowIndex, cellIndex) {
        return ReactDOMServer.renderToString(
            <Link
                className="flex items-center cursor-pointer px-4 py-2"
                href={route("dokter.edit", data[1])}
                tabIndex="-1"
            >
                {data[0]}
            </Link>
        );
    };

    const columnSetting = [
        { from: "No", to: "No", select: 0, sort: "asc", render: celltoLink },
        {
            from: "nama_dokter",
            to: "Nama Dokter",
            select: 1,
            render: celltoLink,
        },
        {
            from: "no_identitas",
            to: "No Identitas",
            select: 2,
            render: celltoLink,
        },
        {
            from: "nama_spesialis",
            to: "Nama Spesialis",
            select: 3,
            render: celltoLink,
        },
        { from: "id", to: "id", select: 4, hidden: true },
    ];

    const filteredData = _.map(data, (obj) =>
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

    const dataWithIndex = _.map(fromTo, (item, index) =>
        _.extend({}, item, {
            No: String(index + 1).padStart(
                fromTo.length.toString().length,
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
                        Dokter
                    </h2>
                    <div className="space-x-4 -my-px ml-10 flex">
                        <Link
                            href={route("dokter.new")}
                            className="rounded block px-4 py-2 text-sm leading-5 text-light-700 hover:bg-light-100 focus:outline-none focus:bg-light-10 transition duration-150 ease-in-out"
                        >
                            Tambah Data
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Dokter" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600">
                                    {status}
                                </div>
                            )}

                            <Table
                                data={newData}
                                columns={columnSetting}
                                tops={[
                                    {
                                        element: CetakTable,
                                        context: {
                                            nama: "Laporan Data Dokter",
                                            tombol: "Cetak Laporan Dokter",
                                        },
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
