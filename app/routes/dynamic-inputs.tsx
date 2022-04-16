import {Form, useActionData, useLoaderData} from "@remix-run/react";
import {constructFromFormData, constructFromQueryString, Fieldset, Input} from "namespaced-fieldset";
import React, {useState} from "react";
import {ActionFunction, LoaderFunction} from "@remix-run/cloudflare";
import FormResultDisplay from "~/components/FormResultDisplay";

export const action: ActionFunction = async ({request}) => {
    const text = await request.text();
    return constructFromQueryString(text);
};

type Person = {
    name: string;
    children?: Person[];
}

type LoaderData = { person: Person };
export const loader: LoaderFunction = () => ({
    person: {name: "Mona"}
})

const PersonEditor: React.VFC<{ person: Person }> = ({person}) => {
    const [children, setChildren] = useState(person.children || []);

    return (
        <>
            Name: <Input name="name" defaultValue={person.name}/>
            {(children || []).map((child, index) => (
                <Fieldset key={index} namespace={`children[${index}]`}>
                    <legend>Child {index + 1}</legend>
                    <PersonEditor key={index} person={child}/>
                </Fieldset>
            ))}
            <div>
                <button type="button" onClick={() => setChildren([
                    ...children,
                    {name: "", children: []}
                ])}>Add Child
                </button>
            </div>
        </>
    )
}

export default function () {
    const actionData = useActionData();
    const {person} = useLoaderData<LoaderData>();
    const [clientSideParsed, setClientSideParsed] = useState("");
    return (
        <>
            <h2>Dynamic input elements example</h2>
            <Form method="post" onChange={(e) => {
                const formData = new FormData(e.currentTarget);
                setClientSideParsed(JSON.stringify(constructFromFormData(formData), null, 2));
            }}>
                <Fieldset.Headless namespace={`person`}>
                    <PersonEditor person={person}/>
                </Fieldset.Headless>
                <button>Submit</button>
            </Form>

            <hr/>
            <FormResultDisplay actionData={actionData} clientSideParsed={clientSideParsed}/>
        </>
    );
}
