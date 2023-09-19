import { useEffect } from "react";
import { APP_NAME } from "../Utils/Envs";

export default function Head(props: { title: string | undefined; description: string }) {
    useEffect(() => {
        document.title = `${props.title} | ${APP_NAME}`;
        document?.querySelector("meta[name='description']")?.setAttribute("content", props.description || "");
    }, [props]);

    return <></>;
}
