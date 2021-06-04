// import 'Styles/bootstrap/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'Styles/fontawesome/fontawesome.css'
import 'Styles/app.scss'

import 'Utils/wdyr';

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import setup from 'Utils/setup'

import Displayname from 'Components/displayname'

const RecordEditApp: React.FC<{}> = (): JSX.Element => {
    const [reference, setReference] = useState(null);
    const [displayname, setDisplayname] = useState();

    useEffect(() => {
        console.log('index effect');
        // setup is already done
        if (reference != null) return;

        let mainRef: any;
        setup().then((ERMrest) => {
            let url = "https://dev.isrd.isi.edu/ermrest/catalog/1/entity/isa:dataset";

            return ERMrest.resolve(url, { cid: "migration" })
        }).then((response: any) => {
            mainRef = response.contextualize.entryCreate;
            setDisplayname(mainRef.displayname);
            setReference(mainRef);

        }).catch((error: any) => {
            console.log("couldn't setup");
            console.dir(error);
        });
    });

    const renderForm = () => {
        if (reference == null) return;

        // @ts-ignore: Object is possibly 'null'.
        return reference.columns.map((col: any, colIndex: number) => {
            return (
                <tbody>
                {/*
                <tr className="shift-form">
                      <td className="entity-key">
                        <span *ngIf="col.isRequired" className="text-danger"><b>*</b></span>
                        <span className="column-displayname">
                          <span *ngIf="col.column.displayname.isHTML" [innerHTML]="col.column.displayname.value"></span>
                          <span *ngIf="!col.column.displayname.isHTML">{{ col.column.displayname.value }}</span>
                        </span>
                      </td>
                      <td className="entity-value" [ngSwitch]="col.inputType">
                        <!-- longtext/textarea input -->
                        <div *ngSwitchCase="'longtext'">
                          <textarea rows="5" [attr.name]="col.column.name" [formControlName]="col.column.name" className="content-box chaise-input-control"></textarea>
                        </div>

                        <!-- foreignkey -->
                        <div *ngSwitchCase="'foreignkey'" className="chaise-input-control has-feedback">
                          <input type="text" [attr.name]="col.column.name" [formControlName]="col.column.name">
                        </div>

                        <!-- disabled -->
                        <input *ngSwitchCase="'disabled'" [attr.name]="col.column.name" [formControlName]="col.column.name" type="text" className="chaise-input-control">

                        <!-- shorttext/default text input -->
                        <div *ngSwitchDefault className="chaise-input-control has-feedback">
                          <input type="text" [attr.name]="col.column.name" [formControlName]="col.column.name">
                        </div>
                      </td>
                    </tr>
                    */}
                </tbody>
            )
        })
    }

    if (reference == null) {
        return <div style={{ margin: "10px auto" }}>Loading...</div>;
    }

    return (
        <React.StrictMode>
            <div className="app-container" style={{ display: "block" }}>
                <div className="recordedit-container">
                    <div className="form-container">
                        <div className="app-content-container">
                            <div className="top-panel-container">
                                <div className="top-flex-panel">
                                    <div className="top-left-panel close-panel"></div>
                                    <div className="top-right-panel">
                                        <div className="title-container meta-icons">
                                            <div className="title-buttons">
                                                {/*[disabled]="!form.valid"*/}
                                                <button className="chaise-btn chaise-btn-primary" type="submit">
                                                    <span className="chaise-btn-icon glyphicon glyphicon-saved"></span>
                                                    <span>Save</span>
                                                </button>
                                            </div>
                                            <h1 id="page-title">
                                                <span>Create new </span>
                                                <a href="https://dev.isrd.isi.edu/~ashafaei/chaise2/recordset">
                                                    <Displayname value={displayname} />
                                                </a>
                                            </h1>
                                        </div>
                                        <div className="form-controls">
                                            <span><span className="text-danger"><b>*</b></span> indicates required field</span>
                                            <div className="add-forms chaise-input-group" ng-show="::!form.editMode">
                                                <span className="chaise-input-group-prepend">
                                                    <div className="chaise-input-group-text chaise-input-group-text-sm">Qty</div>
                                                </span>
                                                <input id="copy-rows-input" type="number" className="chaise-input-control chaise-input-control-sm add-rows-input" ng-model="form.numberRowsToAdd" placeholder="1" min="1" />
                                                <span className="chaise-input-group-append">
                                                    <button id="copy-rows-submit" className="chaise-btn chaise-btn-sm chaise-btn-secondary center-block" ng-click="::form.copyFormRow()" ng-disabled="!form.canAddMore" type="button">
                                                        <span>Clone</span>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-panel-container">
                                {/*This is here so the spacing can be done in one place for all the apps*/}
                                <div className="side-panel-resizable close-panel"></div>
                                <div className="main-container">
                                    <div className="main-body">
                                        <div id="form-section">
                                            <div className="input-container">
                                                <div>
                                                    <table className="table">
                                                        {renderForm()}
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    )
}

RecordEditApp.whyDidYouRender = true;

ReactDOM.render(
    <RecordEditApp />,
    document.getElementById("recordedit-app-root")
);
