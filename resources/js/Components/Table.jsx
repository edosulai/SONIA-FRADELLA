import { useRef, useEffect } from "react";
import { DataTable } from "simple-datatables";
import "../../css/dataTables.css";

export default function Table({ data, columns }) {
    const tableRef = useRef(null);

    useEffect(() => {
        const table = new DataTable(tableRef.current, {
            dom: "Bfrtip",
            columns: columns,
            data: {
                headings: _.keys(data[0]),
                data: _.map(data, (item) => _.values(item)),
            },
            ordering: false,
        });

        return () => table.destroy();
    }, [tableRef]);

    return <table ref={tableRef} />;
}
