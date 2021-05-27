import 'Styles/app.scss'
import 'Styles/bootstrap/bootstrap.css'
import 'Styles/fontawesome/fontawesome.css'

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import setup from 'Utils/setup'

import Table from 'Components/table'
import Displayname from 'Components/displayname'

const RecordsetApp: React.FC<{}> = (): JSX.Element => {
    const [reference, setReference] = useState(null);
    const [displayname, setDisplayname] = useState();

    useEffect(() => {
        // setup is already done
        if (reference != null) return;

        setup().then((ERMrest) => {
            let url = "https://dev.isrd.isi.edu/ermrest/catalog/1/entity/isa:dataset";

            return ERMrest.resolve(url, {cid: "migration"})
        }).then( (response: any) => {
            let ref = response.contextualize.compact;
            setDisplayname(ref.displayname);
            setReference(ref);
        }).catch((error: any) => {
            console.log("couldn't setup");
            console.dir(error);
        });
    });

    if (reference == null) {
        return <div style={{margin: "10px auto;"}}>Loading...</div>;
    }

    return (
        <React.StrictMode>
            <h1>
                <Displayname value={displayname} />
            </h1>
            <div>
                <input type="checkbox"/>
                <label htmlFor="vehicle1" style={{fontWeight: "normal", marginLeft: "5px"}}> Gene: ABCA4</label>
            </div>
            <div className="main-body">
              <Table reference={reference}/>
            </div>
        </React.StrictMode>
    )
}

ReactDOM.render(
  <RecordsetApp />,
  document.getElementById("recordset-app-root")
);
