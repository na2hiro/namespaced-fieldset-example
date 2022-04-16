import {Form, useActionData} from "@remix-run/react";
import {constructFromFormData, constructFromQueryString, Fieldset, Input} from "namespaced-fieldset";
import React, {useState} from "react";
import {Code, H3} from "~/components/decorated-elements";
import {ActionFunction} from "@remix-run/cloudflare";
import FormResultDisplay from "~/components/FormResultDisplay";

export const action: ActionFunction = async ({request}) => {
    const text = await request.text();
    return constructFromQueryString(text);
};

export default function () {
    const actionData = useActionData();
    const [clientSideParsed, setClientSideParsed] = useState("");
    return (
        <>
            <h2>Basic example</h2>
            <Form method="post" onChange={(e) => {
                const formData = new FormData(e.currentTarget);
                setClientSideParsed(JSON.stringify(constructFromFormData(formData), null, 2));
            }}>
                <h3>Give namespace with <Code>Fieldset</Code>, then <Code>Input</Code>s are namespaced
                </h3>
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
                    <div style={{margin: "0 8px"}}>
                        <H3>Try it out</H3>
                        <Fieldset namespace="person[0]">
                            <legend>Person 1</legend>
                            <div>First: <Input name="firstname"/></div>
                            <div>Last: <Input name="lastname"/></div>
                            <Fieldset namespace="kids[0]">
                                <legend>Kid 1</legend>
                                Name: <Input name="name"/>
                            </Fieldset>
                            <Fieldset namespace="kids[1]">
                                <legend>Kid 2</legend>
                                Name: <Input name="name"/>
                            </Fieldset>
                        </Fieldset>
                    </div>
                    <div style={{margin: "0 8px"}}>
                        <H3>JSX you write</H3>
                        <pre style={{
                            backgroundColor: "#444",
                            color: "white",
                            marginBottom: "16px",
                            padding: "8px 16px"
                        }}>
                        {`<Fieldset namespace="person[0]">
    <legend>Person 1</legend>
    First: <Input name="firstname"/>
    Last: <Input name="lastname"/>
    <Fieldset namespace="kids[0]">
        <legend>Kid 1</legend>
        Name: <Input name="name"/>
    </Fieldset>
    <Fieldset namespace="kids[1]">
        <legend>Kid 2</legend>
        Name: <Input name="name"/>
    </Fieldset>
</Fieldset>`}
                        </pre>
                    </div>
                    <div style={{margin: "0 8px"}}>
                        <H3>Generated HTML</H3>
                        <pre style={{
                            backgroundColor: "#444",
                            color: "white",
                            marginBottom: "16px",
                            padding: "8px 16px"
                        }}>
                        {`<fieldset>
    <legend>Person 1</legend>
    First: <input name="person[0].firstname"/>
    Last: <input name="person[0].lastname"/>
    <fieldset>
        <legend>Kid 1</legend>
        Name: <input name="person[0].kid[0].name"/>
    </fieldset>
    <fieldset>
        <legend>Kid 2</legend>
        Name: <input name="person[0].kid[0].name"/>
    </fieldset>
</fieldset>`}
                        </pre>
                    </div>
                </div>

                <h3>Use <Code>Fieldset.Headless</Code>, if you don't want to render <Code>fieldset</Code></h3>
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
                    <div style={{margin: "0 8px"}}>
                        <H3>Try it out</H3>
                        <Fieldset.Headless namespace="person[1]">
                            <div>First: <Input name="firstname"/></div>
                            <div>Last: <Input name="lastname"/></div>
                            <Fieldset.Headless namespace="kids[0]">
                                <div>Kid Name: <Input name="name"/></div>
                            </Fieldset.Headless>
                        </Fieldset.Headless>
                    </div>
                    <div style={{margin: "0 8px"}}>
                        <H3>JSX you write</H3>
                        <pre style={{
                            backgroundColor: "#444",
                            color: "white",
                            marginBottom: "16px",
                            padding: "8px 16px"
                        }}>
                            {`<Fieldset.Headless namespace="person[1]">
    First: <Input name="firstname"/>
    Last: <Input name="lastname"/>
    <Fieldset.Headless namespace="kids[0]">
        Kid Name: <Input name="name"/>
    </Fieldset.Headless>
</Fieldset.Headless>`}
                        </pre>
                    </div>
                    <div style={{margin: "0 8px"}}>
                        <H3>Generated HTML</H3>
                        <pre style={{
                            backgroundColor: "#444",
                            color: "white",
                            marginBottom: "16px",
                            padding: "8px 16px"
                        }}>
                            {`First: <input name="person[1].firstname"/>
Last: <input name="person[1].lastname"/>
Kid Name: <input name="person[1].kids[0].name"/>`}
                        </pre>
                    </div>
                </div>
                <button>Submit</button>
            </Form>

            <hr />
            <FormResultDisplay actionData={actionData} clientSideParsed={clientSideParsed} />
        </>
    );
}
