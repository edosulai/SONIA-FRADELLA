import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
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

                                <div class="pl-1 w-96 h-20 bg-green-400 rounded-lg shadow-md">
                                    <div class="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                        <div class="my-auto">
                                            <p class="font-bold">
                                                EARNINGS (MONTHLY)
                                            </p>
                                            <p class="text-lg">$40,000</p>
                                        </div>
                                        <div class="my-auto">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div class="pl-1 w-96 h-20 bg-green-400 rounded-lg shadow-md">
                                    <div class="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                        <div class="my-auto">
                                            <p class="font-bold">
                                                EARNINGS (MONTHLY)
                                            </p>
                                            <p class="text-lg">$40,000</p>
                                        </div>
                                        <div class="my-auto">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div class="pl-1 w-96 h-20 bg-green-400 rounded-lg shadow-md">
                                    <div class="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                        <div class="my-auto">
                                            <p class="font-bold">
                                                EARNINGS (MONTHLY)
                                            </p>
                                            <p class="text-lg">$40,000</p>
                                        </div>
                                        <div class="my-auto">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
