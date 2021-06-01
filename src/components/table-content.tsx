import React from 'react'

import Displayname from 'Components/displayname'

const TableContent: React.FC<any> = (props: any) => {
    const renderColumnHeaders = () => {
        return props.reference.columns.map((col: any, index: number) => {
            return (
                <th key={index} className="clickable">
                    <span className="table-column-displayname" >
                        <Displayname value={col.displayname} />
                    </span>
                </th>
            )
        })
    }

    const renderRows = () => {
        if (!props.page) return;

        if (props.page.length == 0) {
            return (
                <tr>
                    <td colSpan={props.reference.columns.length} style={{textAlign: "center"}}>
                        <span>No results found</span>
                    </td>
                </tr>
            )
        }

        return props.page.tuples.map((tuple: any, index: number) => {
            return (
                <tr key={tuple.uniqueId} className="chaise-table-row" style={{ "position": "relative" }}>
                    <td className="block action-btns">
                        <div className="chaise-btn-group">
                            <a type="button" className="view-action-button chaise-btn chaise-btn-tertiary chaise-btn-link icon-btn"
                                href="https://dev.isrd.isi.edu/~ashafaei/chaise-react/record">
                                <span className="chaise-btn-icon chaise-icon chaise-view-details"></span>
                            </a>
                        </div>
                    </td>
                    {renderCells(tuple)}
                </tr>

            )
        })
    }

    const renderCells = (tuple: any) => {
        if (!tuple) return;
        return tuple.values.map((val: any, index: number) => {
            return (
                <td key={index}>
                    <div className="showContent">
                      <Displayname addClass={true} value={{value: val, isHTML: tuple.isHTML[index]}} />
                    </div>
                </td>
            )
        })
    }

    return (
        <div className="outer-table recordset-table s_isa t_dataset" style={{ position: "relative" }}>
            {!props.tableReady &&
                <div style={{position: "absolute", background: "white", top: "65px", left: "calc(50% - 30px)", zIndex : 2, padding: "20px", border: "1px solid #ccc", borderRadius: "2px"}} >
                    Loading table...
                </div >
            }
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
