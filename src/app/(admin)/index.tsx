import { Redirect } from "expo-router";

export default function TabIndex () {
    return (
        <Redirect href={'/(admin)/menu/'} />
    )
}

//This file was created just to redirect us to the menu page, because when the app is first loaded or refreshed, it will look for index.tsx in the (admin) folder