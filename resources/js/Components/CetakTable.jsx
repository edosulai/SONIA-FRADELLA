import jsPDF from "jspdf";
import "jspdf-autotable";

export default function CetakTable({ ctx, tableRef }) {
    return (
        <button
            onClick={() => {
                const doc = new jsPDF(ctx.orientation ?? "potrait");

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
