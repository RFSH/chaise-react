import React from 'react';

const TableContent: React.FC<{}> = (props: any) => {
    const cols = ["col1", "col2"];
    const vals = [["v1", "v2"], ["v1_2", "v2_2"]];

    const renderColumnHeaders = () => {
        return cols.map((col, index) => {
            return (
                <th key={index} className="clickable">
                    <span className="table-column-displayname" >
                        <span>{col}</span>
                    </span>
                </th>
            )
        })
    }

    const renderRows = () => {
        return vals.map((rowVal, index) => {
            return (
                <tr key={index} className="chaise-table-row" style={{ "position": "relative" }}>
                    <td className="block action-btns">
                        <div className="chaise-btn-group">
                            <a type="button" className="view-action-button chaise-btn chaise-btn-tertiary chaise-btn-link icon-btn"
                                href="https://dev.isrd.isi.edu/~ashafaei/chaise2/record">
                                <span className="chaise-btn-icon chaise-icon chaise-view-details"></span>
                            </a>
                        </div>
                    </td>
                    {renderCells(rowVal)}
                </tr>

            )
        })
    }

    const renderCells = (rowVal: any) => {
        return rowVal.map((cell: any, index: number) => {
            return (
                <td key={index}>
                    <div className="showContent">
                      <span>{cell}</span>
                    </div>
                </td>
            )
        })
    }

    return (
        <div className="outer-table recordset-table s_isa t_dataset" style={{ position: "relative" }}>
            <table className="table chaise-table table-striped table-hover">
                <thead className="table-heading">
                    <tr>
                        <th className="actions-header view-header">
                            <span className="chaise-icon-for-tooltip">View </span>
                        </th>
                        {renderColumnHeaders()}
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>

    )
}

export default TableContent;
