import React from 'react';

const TableHeader: React.FC<{}> = (props: any) => {
    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            <span>Displaying </span>
          </div>
          <div style={{marginBottom: "5px"}}>
            <a className="chaise-btn chaise-btn-primary" href="https://dev.isrd.isi.edu/~ashafaei/chaise-react/recordedit">
              <span className="chaise-btn-icon glyphicon glyphicon-plus"></span>
              <span>Create</span>
            </a>
          </div>
        </div>
    )
}

export default TableHeader;
