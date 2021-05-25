import React from 'react';
import ReactDOM from 'react-dom';
import TableContainer from 'Components/table-container';


const RecordApp: React.FC<{}> = () => {
    return (
        <React.StrictMode>
            <div>This is record page and a table is below:</div>
            <TableContainer />
        </React.StrictMode>
    )
}

ReactDOM.render(
  <RecordApp />,
  document.getElementById("record-app-root")
);
