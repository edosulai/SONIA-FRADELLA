import { useRef, useEffect } from "react";
import { DataTable } from "simple-datatables";
import '../../css/dataTables.css';

export default function Table({ data, columns }) {
    const tableRef = useRef(null);

    useEffect(() => {
        const table = new DataTable(tableRef.current, {
            dom: "Bfrtip",
            data: {
                headings: _.keys(data[0]),
                data: _.map(data, (item) => _.values(item)),
            },
            columns: columns,
            ordering: false,
        });

        return () => table.destroy();
    }, [tableRef]);

    return (
        <div>
            <table ref={tableRef} />
        </div>
    );
}
