import React from 'react';
import TableContent from './table-content';
import TableHeader from './table-header';

interface TableProps {
    reference: any;
}

const Table: React.FC<TableProps> = (props: any) => {
    return (
        <div>
            <TableHeader/>
            <TableContent/>
        </div>
    )
}

export default Table;
