import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            <div className="flex gap-16">
                                <div class="pl-1 w-96 h-20 bg-blue-400 rounded-lg shadow-md">
                                    <div class="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                        <div class="my-auto">
                                            <p class="font-bold">
                                                TOTAL PASIEN
                                            </p>
                                            <p class="text-lg">$40,000</p>
                                        </div>
                                        <div class="my-auto">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div class="pl-1 w-96 h-20 bg-green-400 rounded-lg shadow-md">
                                    <div class="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                        <div class="my-auto">
                                            <p class="font-bold">
                                                JUMLAH DOKTER
                                            </p>
                                            <p class="text-lg">$40,000</p>
                                        </div>
                                        <div class="my-auto">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div class="pl-1 w-96 h-20 bg-yellow-400 rounded-lg shadow-md">
                                    <div class="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                        <div class="my-auto">
                                            <p class="font-bold">
                                                TOTAL KUNJUNGAN (BULANAN)
                                            </p>
                                            <p class="text-lg">$40,000</p>
                                        </div>
                                        <div class="my-auto">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
