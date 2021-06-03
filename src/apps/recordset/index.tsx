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
import { useAppDispatch, useAppSelector } from './../../hooks';
import { store } from './../../store';
import { Provider } from 'react-redux';
import { decrement, increment } from 'Slices/counter-slice';
import Facet from 'Components/facet';

const RecordsetApp: React.FC<{}> = (): JSX.Element => {
    // The `state` arg is correctly typed as `RootState` already
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()

    const [reference, setReference] = useState(null);
    const [displayname, setDisplayname] = useState();

    const updateReference = (ref: any) => {
        setReference(ref);
    }

    useEffect(() => {
        console.log('index effect');
        // setup is already done
        if (reference != null) return;

        setup().then((ERMrest) => {
            let url = "https://dev.isrd.isi.edu/ermrest/catalog/1/entity/isa:dataset";

            return ERMrest.resolve(url, { cid: "migration" })
        }).then((response: any) => {
            let ref = response.contextualize.compact;
            setDisplayname(ref.displayname);
            setReference(ref);
        }).catch((error: any) => {
            console.log("couldn't setup");
            console.dir(error);
        });
    });

    if (reference == null) {
        return <div style={{ margin: "10px auto" }}>Loading...</div>;
    }

    return (
        <React.StrictMode>
            <h1>
                <Displayname value={displayname} />
            </h1>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
            <Facet reference={reference} updateReference={updateReference}/>
            <div className="main-body">
                <Table reference={reference} />
            </div>
        </React.StrictMode>
    )
}

RecordsetApp.whyDidYouRender = true;

ReactDOM.render(
    <Provider store={store}>
        <RecordsetApp />
    </Provider>,
    document.getElementById("recordset-app-root")
);
