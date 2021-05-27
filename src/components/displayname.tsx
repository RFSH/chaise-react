import React from 'react';

interface DisplaynameProps {
    addClass?: boolean;
    value?: {isHTML: boolean, value: string};
}

const Displayname: React.FC<DisplaynameProps> = (props: any) => {
    if (props.value.isHTML) {
        return (
            <span
                dangerouslySetInnerHTML={{__html: props.value.isHTML}}
                className={props.addClass ? 'markdown-container': ''}>
            </span>
        )
    }
    return <span>{props.value.value}</span>
}

export default Displayname;
