import React from 'react';
import ReactDOM from 'react-dom';
import TableContainer from 'Components/table-container';


const RecordsetApp: React.FC<{}> = () => {
    return (
        <React.StrictMode>
            <div>This is recordset page and a table is below:</div>
            <TableContainer />
        </React.StrictMode>
    )
}

ReactDOM.render(
  <RecordsetApp />,
  document.getElementById("recordset-app-root")
);
