import Q from 'Vendor/q';
import axios from 'axios';
import { windowRef } from 'Utils/window-ref';

function appTagToURL(tag: string, location: any, context: string) {
    const appTagMapping: any = {
        "tag:isrd.isi.edu,2016:chaise:record": "/record",
        "tag:isrd.isi.edu,2016:chaise:detailed": "/detailed",
        "tag:isrd.isi.edu,2016:chaise:viewer": "/viewer",
        "tag:isrd.isi.edu,2016:chaise:search": "/search",
        "tag:isrd.isi.edu,2016:chaise:recordset": "/recordset",
        "tag:isrd.isi.edu,2016:chaise:recordedit": "/recordedit"
    };

    const appContextMapping: any = {
        "detailed": "/record",
        "compact": "/recordset",
        "edit": "/recordedit",
        "entry": "/recordedit",
        "*": "/record"
    };

    let getValueFromContext = function(object: any, context: string): string {
        var partial = context,
            parts = context.split("/");
        while (partial !== "") {
            if (partial in object) { // found the context
                return object[partial];
            }
            parts.splice(-1, 1); // remove the last part
            partial = parts.join("/");
        }
        return object["*"];
    }

    var appPath;
    if (tag && (tag in appTagMapping)) {
        appPath = appTagMapping[tag];
    } else {
        appPath = getValueFromContext(appContextMapping, context);
    }

    var url = "/~ashafaei/chaise" + appPath + "/#" + location.catalog + "/" + location.path;

    if (location.queryParamsString) {
        url = url + "?" + location.queryParamsString;
    }
    return url;
}

const setup = async () : Promise<any> => {
    windowRef.ERMrest.configure(axios, Q);

    await windowRef.ERMrest.onload();

    windowRef.ERMrest.appLinkFn(appTagToURL);

    return windowRef.ERMrest;
}

export default setup;
