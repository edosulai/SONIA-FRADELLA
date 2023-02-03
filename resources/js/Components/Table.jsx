import { useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { DataTable } from "simple-datatables";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../../css/dataTables.css";

export default function Table({ data, columns, print = false }) {
    const tableRef = useRef(null);

    useEffect(() => {
        const table = new DataTable(tableRef.current, {
            layout: {
                top: "{select}{search}",
                bottom: "{info}{pager}",
            },
            columns: columns,
            data: {
                headings: _.keys(data[0]),
                data: _.map(data, (item) => _.values(item)),
            },
        });

        if (print) {
            const doc = new jsPDF();

            const printElement = document.createElement("span");

            tableRef.current.parentNode.previousSibling
                .querySelector(".datatable-dropdown")
                .append(printElement);

            ReactDOM.createRoot(printElement).render(
                <button
                    onClick={() => {
                        doc.autoTable({
                            html: tableRef.current,
                            // addPageContent: function (data) {
                            //     doc.text("KOP SURAT", 40, 30);
                            //     doc.text("Ini adalah contoh kop surat", 40, 50);
                            // },
                            margin: { top: 27 },
                            didDrawPage: function (data) {
                                // doc.setFontSize(18);
                                // doc.setTextColor(40);
                                // doc.setFontStyle("normal");
                                //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
                                doc.text(
                                    print.head,
                                    data.settings.margin.left,
                                    22
                                );
                            },
                        });
                        doc.save("table.pdf");
                    }}
                    className="border-[#e5e7eb] bg-[#d9d9d9] shadow-sm border-[1px] mx-10 px-10 py-2"
                >
                    Cetak PDF
                </button>
            );
        }

        return () => table.destroy();
    }, [tableRef]);

    return <table ref={tableRef} />;
}
