import { useState } from "react";

interface FacetProps {
    reference: any,
    updateReference: Function
}

function Facet (props: FacetProps) {
    const [facetApplied, setFacetApplied] = useState(false);

    const toggleFacet = () => {
        setFacetApplied((prev) => {
            // @ts-ignore: Object is possibly 'null'.
            let filter = ["FACEBASE:1-4G4E"], fc = props.reference.facetColumns[2];
            if (!prev) {
                props.updateReference(fc.addChoiceFilters(filter));
            } else {
                props.updateReference(fc.removeChoiceFilters(filter));
            }

            return !prev;
        });
    }

    return (
        <div>
            <input type="checkbox" checked={facetApplied} onChange={toggleFacet} />
            <label style={{ fontWeight: "normal", marginLeft: "5px" }}> Gene: ABCA4</label>
        </div>
    )
}


export default Facet
