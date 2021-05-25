import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'Components/table';

import 'Styles/app.scss';
import 'Styles/bootstrap/bootstrap.css';
import 'Styles/fontawesome/fontawesome.css';

const RecordsetApp: React.FC<{}> = () => {
    return (
        <React.StrictMode>
            <div>This is recordset page and a table is below:</div>
            <Table />
        </React.StrictMode>
    )
}

ReactDOM.render(
  <RecordsetApp />,
  document.getElementById("recordset-app-root")
);
