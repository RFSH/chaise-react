import React from 'react';
import TableContent from './table-content';
import TableHeader from './table-header';

const Table: React.FC<{}> = (props: any) => {
    return (
        <div>
            <TableHeader/>
            <TableContent/>
        </div>
    )
}

export default Table;
