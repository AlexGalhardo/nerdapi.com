import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorAlertMessage from "../Alerts/ErrorAlertMessage";
import Loading from "../Loading";
import { GET_BLOG_BY_SLUG } from "../../Api";
import useFetch from "../../Hooks/useFetch";

export default function BlogPost() {
    const { slug } = useParams();
    const { data, loading, error, request } = useFetch();

    useEffect(() => {
        const { url, options } = GET_BLOG_BY_SLUG(slug as string);
        request(url, options);
    }, [request, slug]);

    if (error) return <ErrorAlertMessage error={error} />;
    if (loading) return <Loading />;
    if (data) {
        return (
            <>
                <div className="container col-md-8 mt-5">
                    <div className="col p-4 d-flex flex-column position-static">
                        <h1 className="fw-bold text-primary text-center">{data.title}</h1>
                        <div className="text-center mb-1 text-muted">
                            <small>{data.created_at}</small>
                        </div>
                        <br />
                        <p>{data.text}</p>
                    </div>
                </div>
            </>
        );
    } else return null;
}
