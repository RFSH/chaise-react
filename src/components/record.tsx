import React from 'react'

import Displayname from 'Components/displayname'
import Table from 'Components/table'

interface RecordProps  {
    reference: any,
    tuple: any,
    relatedReferences: any
}

const Record: React.FC<any> = (props: RecordProps) => {
    const renderRows = () => {
        return props.reference.columns.map((col: any, colIndex: number) => {
            const val = props.tuple.values[colIndex]
            const isHTML = props.tuple.isHTML[colIndex];

            return (
                <tr key={colIndex} className="row record-row" hidden={val == null || val == ''}>
                    <td className="entity-key col-xs-4 col-sm-4 col-md-3 col-lg-2">
                      <span className="column-displayname">
                        <Displayname value={col.displayname} />
                      </span>
                    </td>
                    <td style={{padding: "5px 0"}} className="entity-value col-xs-8 col-sm-8 col-md-9 col-lg-10">
                      <span>
                        <Displayname addClass={true} value={{value: val, isHTML: isHTML}} />
                      </span>
                    </td>
                </tr>
            )
        })
    }

    const renderRelated = () => {
        return props.relatedReferences.map((reference: any, relIndex: any) => {
            return (
                <div key={relIndex}>
                    <h3>
                        <Displayname value={reference.displayname} />
                    </h3>
                    <Table reference={reference}/>
                </div>
            )
        })
    }

    return (
        <div>
            <table className="table table-fixed-layout" id="tblRecord">
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
            {renderRelated()}
        </div>
    )
}

export default Record;
