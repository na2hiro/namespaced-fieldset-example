import {Form, useActionData, useLoaderData} from "@remix-run/react";
import {constructFromFormData, constructFromQueryString, Fieldset, Input} from "namespaced-fieldset";
import React, {useState} from "react";
import {Code, H3} from "~/components/decorated-elements";
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
    person: {
        name: "Mona", children: [
            {name: "Herb"},
            {
                name: "Homer",
                children: [
                    {name: "Bart"},
                    {name: "Lisa"},
                    {name: "Maggie"},
                ]
            }
        ]
    }
});

const PersonEditor: React.VFC<{ person: Person }> = ({person}) => {
    return (
        <>
            Name: <Input name="name" defaultValue={person.name}/>
            {(person.children || []).map((child, index) => (
                <Fieldset namespace={`children[${index}]`}>
                    <legend>Child {index + 1}</legend>
                    <PersonEditor key={index} person={child}/>
                </Fieldset>
            ))}
        </>
    )
}

export default function () {
    const actionData = useActionData();
    const {person} = useLoaderData<LoaderData>();
    const [clientSideParsed, setClientSideParsed] = useState("");
    return (
        <>
            <h2>Nested namespaces example</h2>
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
