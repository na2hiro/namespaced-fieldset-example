import React from "react";

export const Code: React.FC = ({children}) => {
    return <span style={{fontFamily: "monospace"}}>{children}</span>
}

export const H3: React.FC = ({children}) => {
    return <h3 style={{marginTop: 0}}>{children}</h3>
}