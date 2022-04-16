import {Code} from "~/components/decorated-elements";
import React from "react";

type Props = { clientSideParsed: string, actionData: any };
const FormResultDisplay: React.VFC<Props> = ({clientSideParsed, actionData}) => {
    return (
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
            <div>
                <h3><Code>constructFromFormData()</Code> on client side</h3>
                <pre>{clientSideParsed || "(type in to inputs...)"}</pre>
            </div>

            <div>
                <h3><Code>constructFromQueryString()</Code> on server side</h3>
                <pre>
                {actionData ? JSON.stringify(actionData, null, 2) : "(submit the form...)"}
                </pre>
            </div>
        </div>
    )
}
export default FormResultDisplay;