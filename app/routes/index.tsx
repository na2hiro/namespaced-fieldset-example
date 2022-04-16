import {Form, useActionData} from "@remix-run/react";
import {constructFromFormData, constructFromQueryString, Fieldset, Input} from "namespaced-fieldset";
import React, {useState} from "react";
import {Code, H3} from "~/components/decorated-elements";
import {ActionFunction} from "@remix-run/cloudflare";

export const action: ActionFunction = async ({request}) => {
    const text = await request.text();
    return constructFromQueryString(text);
};

export default function () {
    const actionData = useActionData();
    const [clientSideParsed, setClientSideParsed] = useState("(type in to see result of client-side construct)");
    return (
        <>
            <h1>
                <Code>namespaced-inputs</Code> demo
            </h1>
            <Form method="post" onChange={(e) => {
                const formData = new FormData(e.currentTarget);
                setClientSideParsed(JSON.stringify(constructFromFormData(formData), null, 2));
            }}>
                <h2>Give namespace with <Code>Fieldset</Code>, then <Code>Input</Code>s are namespaced
                </h2>
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
                    <div style={{margin: "0 8px"}}>
                        <H3>Try it out</H3>
                        <Fieldset namespace="person[0]">
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
                        </Fieldset>
                    </div>
                    <div style={{margin: "0 8px"}}>
                        <H3>JSX you write</H3>
                        TODO: first introduce object, second introduce array
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

                <h2>Use <Code>Fieldset.Headless</Code>, if you don't want to render <Code>fieldset</Code></h2>
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
                    <div style={{margin: "0 8px"}}>
                        <H3>Try it out</H3>
                        <Fieldset.Headless namespace="person[1]">
                            First: <Input name="firstname"/>
                            Last: <Input name="lastname"/>
                            <Fieldset.Headless namespace="kids[0]">
                                Name: <Input name="name"/>
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
        Name: <Input name="name"/>
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
Name: <input name="person[1].kids[0].name"/>`}
                        </pre>
                    </div>
                </div>
                <button>Submit</button>
            </Form>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                <div>
                    <h2>Client-side construction from <Code>form</Code> element</h2>
                    <p>
                        <Code>constructFromFormData()</Code> accepts <Code>FormData</Code></p>
                    <pre>
                        {clientSideParsed}
                    </pre>
                </div>

                <div>
                    <h2>Server-side construction from query string</h2>
                    <p>
                        <Code>constructFromQueryString</Code> accepts <Code>application/x-www-form-urlencoded</Code>, the default way of encoding forms
                    </p>
                    <pre>
                {actionData ? JSON.stringify(actionData, null, 2) : "(Submit the form to see result of server-side construct)"}
            </pre>
                </div>
            </div>
        </>
    );
}
