import { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { DataTable } from "simple-datatables";
import "../../css/dataTables.css";

export default function Table({ data, columns, tops = [], bottoms = [] }) {
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

        tops.forEach((Top) => {
            let newElement = document.createElement("div");
            newElement.style.float = "left";
            tableRef.current.parentNode.previousSibling.insertBefore(
                newElement,
                tableRef.current.parentNode.previousSibling.querySelector(
                    ".datatable-search"
                )
            );
            createRoot(newElement).render(
                <Top.element ctx={Top.context} tableRef={tableRef} />
            );
        });

        return () => table.destroy();
    }, [tableRef]);

    return <table ref={tableRef} />;
}
