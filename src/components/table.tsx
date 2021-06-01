import React, { useEffect, useState } from 'react';
import TableContent from './table-content';
import TableHeader from './table-header';

interface TableProps {
    reference: any
}

const Table: React.FC<TableProps> = (props: TableProps) => {
    const [tableDirty, setTableDirty] = useState(true);
    const [tableReady, setTableReady] = useState(false);
    const [countDirty, setCountDirty] = useState(true);
    const [countReady, setCountReady] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [pageLimit, setPageLimit] = useState(25);
    const [currentCount, setCurrentCount] = useState(0);
    const [page, setPage] = useState(null);
    const [tableRef, setTableRef] = useState(props.reference);

    const updatePageLimit = (inp: number) => {
        setPageLimit(inp);
        setTableDirty(true);
    }

    const updatePage = () => {
        setTableReady(false);
        props.reference.read(pageLimit).then((page: any) => {
            setCurrentCount(page.length);
            setTableReady(true);
            setPage(page);
        }).catch((error: any) => {
            console.log("error while reading data");
            console.log(error);
        });
    }

    const updateCount = () => {
        setCountReady(false);
        props.reference.getAggregates([props.reference.aggregate.countAgg]).then((response: any) => {
            setTotalCount(response[0]);
            setCountReady(true);
        }).catch((error: any) => {
            console.log("error while getting total count");
            console.log(error);
        })
    }

    useEffect(() => {
        if (tableRef.uri != props.reference.uri) {
            setTableRef(props.reference);
            updatePage();
            updateCount();
            return;
        }

        if (tableDirty) {
            setTableDirty(false);
            updatePage();
        }
        if (countDirty) {
            setCountDirty(false);
            updateCount();
        }
    })

    return (
        <div>
            {/*<div>this is the url: {props.reference?.appLink}</div>*/}
            <TableHeader
                tableReady={tableReady} totalCount={totalCount} countReady={countReady}
                pageLimit={pageLimit} currentCount={currentCount} updatePageLimit={updatePageLimit}
             />
            <TableContent
                reference={props.reference}
                tableReady={tableReady}
                page={page}
            />
        </div>
    )
}

Table.whyDidYouRender = true;

export default Table;
