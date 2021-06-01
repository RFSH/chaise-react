// import 'Styles/bootstrap/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'Styles/fontawesome/fontawesome.css'
import 'Styles/app.scss'

import 'Utils/wdyr';

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import setup from 'Utils/setup'

import Table from 'Components/table'
import Displayname from 'Components/displayname'

const RecordsetApp: React.FC<{}> = (): JSX.Element => {
    const [reference, setReference] = useState(null);
    const [facetApplied, setFacetApplied] = useState(false);
    const [displayname, setDisplayname] = useState();

    const toggleFacet = () => {
        if (reference == null) return;

        setFacetApplied((prev) => {
            // @ts-ignore: Object is possibly 'null'.
            let filter = ["FACEBASE:1-4G4E"], fc = reference.facetColumns[2];
            if (!prev) {
                setReference(() => {
                    return fc.addChoiceFilters(filter);
                })
            } else {
                setReference(() => {
                    return fc.removeChoiceFilters(filter)
                })
            }

            return !prev;
        });

    }

    useEffect(() => {
        console.log('index effect');
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
        return <div style={{margin: "10px auto"}}>Loading...</div>;
    }

    return (
        <React.StrictMode>
            <h1>
                <Displayname value={displayname} />
            </h1>
            <div>
                <input type="checkbox" checked={facetApplied} onChange={toggleFacet}/>
                <label style={{fontWeight: "normal", marginLeft: "5px"}}> Gene: ABCA4</label>
            </div>
            <div className="main-body">
              <Table reference={reference}/>
            </div>
        </React.StrictMode>
    )
}

RecordsetApp.whyDidYouRender = true;

ReactDOM.render(
  <RecordsetApp />,
  document.getElementById("recordset-app-root")
);
