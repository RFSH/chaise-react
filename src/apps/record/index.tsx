// import 'Styles/bootstrap/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'Styles/fontawesome/fontawesome.css'
import 'Styles/app.scss'

import 'Utils/wdyr';

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import setup from 'Utils/setup'

import Displayname from 'Components/displayname'
import Record from 'Components/record'

const RecordApp: React.FC<{}> = (): JSX.Element => {
    const [reference, setReference] = useState(null);
    const [displayname, setDisplayname] = useState();
    const [tuple, setTuple] = useState();
    const [rowName, setrowName] = useState();
    const [relatedReferences, setRelatedReferences] = useState();


    useEffect(() => {
        console.log('index effect');
        // setup is already done
        if (reference != null) return;

        let mainRef : any;
        setup().then((ERMrest) => {
            let url = "https://dev.isrd.isi.edu/ermrest/catalog/1/entity/isa:dataset";

            return ERMrest.resolve(url, {cid: "migration"})
        }).then( (response: any) => {
            mainRef = response.contextualize.detailed;
            setDisplayname(mainRef.displayname);
            setReference(mainRef);

            return mainRef.read(1);
        }).then( (page: any) => {
            let tuple = page.tuples[0];
            setTuple(tuple);
            setrowName(tuple.rowName);
            setRelatedReferences(mainRef.generateRelatedList(tuple));
        }).catch((error: any) => {
            console.log("couldn't setup");
            console.dir(error);
        });
    });

    if (tuple == null || relatedReferences == null) {
        return <div style={{margin: "10px auto"}}>Loading...</div>;
    }

    return (
        <React.StrictMode>
            <h1>
                <a href="https://dev.isrd.isi.edu/~ashafaei/chaise-react/recordset">
                    <Displayname value={displayname} />
                </a>
                <span>:</span>
                <Displayname value={rowName} />
            </h1>
            <div>
            </div>
            <div className="main-body">
              <Record reference={reference} tuple={tuple} relatedReferences={relatedReferences}/>
            </div>
        </React.StrictMode>
    )
}

RecordApp.whyDidYouRender = true;

ReactDOM.render(
  <RecordApp />,
  document.getElementById("record-app-root")
);
