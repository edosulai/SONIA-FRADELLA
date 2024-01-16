import jsPDF from "jspdf";
import "jspdf-autotable";

export default function CetakTable({ ctx, tableRef }) {
    return (
        <button
            onClick={() => {
                const doc = new jsPDF(ctx.orientation ?? "portrait");

                doc.autoTable({
                    html: tableRef.current,
                    addPageContent: function (data) {
                        // console.log(doc.getFontList());

                        doc.setFontSize(18);
                        doc.setFont("Times", "Bold");
                        doc.text("Puskesmas Kemantan", doc.internal.pageSize.width / 2, 15, { align: "center" });
                        doc.setFontSize(8);
                        doc.setFont("Times", "Italic");
                        doc.text("Jl. Raya Kemantan, Kemantan Darat, Kec. Air Hangat Timur, Kab. Kerinci, Jambi, 37167", doc.internal.pageSize.width / 2, 20, { align: "center" });
                        doc.setFont("Times", "Italic");
                        doc.text("Telp: (0748)353081", doc.internal.pageSize.width / 2, 25, { align: "center" });

                        doc.setFontSize(12);
                        doc.setFont("Times", "Roman");
                        doc.text("..........., ........................", doc.internal.pageSize.width / 1.25, doc.internal.pageSize.height - 70, { align: "center" });
                        doc.text("Kepala Puskesmas Kemantan", doc.internal.pageSize.width / 1.25, doc.internal.pageSize.height - 60, { align: "center" });
                        doc.text("(                                            )", doc.internal.pageSize.width / 1.25, doc.internal.pageSize.height - 20, { align: "center" });
                    },
                    margin: { top: 30, bottom: 80 },
                    didDrawPage: function (data) {
                        doc.text(ctx.nama, data.settings.margin.left, 22);
                    },
                });
                doc.save(`${ctx.nama}.pdf`);
            }}
            className="border-[#e5e7eb] bg-[#d9d9d9] shadow-sm border-[1px] mx-10 px-10 py-2"
        >
            {ctx.tombol}
        </button>
    );
}
