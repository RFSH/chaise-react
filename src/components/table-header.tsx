import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

interface TableHeaderProps {
    tableReady: boolean
    countReady: boolean
    totalCount: number
    currentCount: number
    pageLimit: number
    updatePageLimit: Function
}

const TableHeader: React.FC<TableHeaderProps> = (props: TableHeaderProps) => {
    const pageLimits = [5, 10, 25, 50, 75, 100, 200];

    const onSelect = (pl: number) => {
        props.updatePageLimit(pl);
    }

    const renderDropdownOptions = () => {
        return pageLimits.map((pl) => {
            return (
                <Dropdown.Item key={pl} onClick={() => onSelect(pl)}>
                    <span>{pl}</span>
                    {props.pageLimit == pl && <span className="glyphicon pull-right glyphicon-ok"></span>}
                </Dropdown.Item>
            )
        })
    }

    const renderDropdown = () => {
        return (
            <DropdownButton
                id="dropdown-basic-button" title={props.pageLimit}
                className="chaise-dropdown"
            >
                {renderDropdownOptions()}
            </DropdownButton>
        )
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <span>Displaying {props.currentCount == 0 ? props.currentCount : ""}</span>
                <span>
                    {props.currentCount > 0 && renderDropdown()}
                </span>
                {props.countReady && <span> of {props.totalCount} records</span>}
            </div>
            <div style={{ marginBottom: "5px" }}>
                <a className="chaise-btn chaise-btn-primary" href="https://dev.isrd.isi.edu/~ashafaei/chaise-react/recordedit">
                    <span className="chaise-btn-icon glyphicon glyphicon-plus"></span>
                    <span>Create</span>
                </a>
            </div>
        </div>
    )
}

export default TableHeader;
