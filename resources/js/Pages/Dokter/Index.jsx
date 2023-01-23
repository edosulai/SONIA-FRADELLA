import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index(props) {
    const columns = [{ data: "nama" }, { data: "umur" }, { data: "alamat" }];

    const data = [
        {
            nama: "John Doe",
            umur: 32,
            alamat: "New York",
        },
        {
            nama: "Jane Smith",
            umur: 28,
            alamat: "Los Angeles",
        },
        {
            nama: "Bob Johnson",
            umur: 45,
            alamat: "Chicago",
        },
    ];

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                    Dokter
                </h2>
            }
        >
            <Head title="Dokter" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            <Table data={data} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
