import { CSSProperties, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ErrorAlertMessage from "../Components/Alerts/ErrorAlertMessage";
import { useGlobalState } from "../Context/GlobalStateContext";
import SuccessAlertMessage from "../Components/Alerts/SuccessAlertMessage";
import Button from "../Components/Forms/Button";

export default function Contact() {
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [subject, setSubject] = useState<string | undefined>("BUG");
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string | undefined>(undefined);
    const [messageLength, setMessageLength] = useState<number>(0);
    let messageMaxLength = 1024;

    useEffect(() => {
        setMessageLength(messageMaxLength - message.length);
    }, [message.length]);

    const { contactSend, sendContact, loading } = useGlobalState();

    async function handleSubmit(event: any) {
        event.preventDefault();

        try {
            if (name && email && subject && message) {
                await sendContact(name, email, subject, message);
            }
        } catch (error: any) {
            setError(error);
        } finally {
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
            setError("");
        }
    }

    return (
        <>
            <Navbar />
            <div className="container col-lg-4 mt-5" style={containerContact}>
                <div className="row mt-5">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3 mt-5">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                className="fs-4 mb-3 form-control"
                                id="name"
                                name="name"
                                required
                                value={name}
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="email">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="fs-4 form-control"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <select
                            className="fs-4 form-select mb-3"
                            name="subject"
                            onChange={(e) => setSubject(e.target.value)}
                            value={subject}
                            required
                        >
                            <option value="BUG" selected>
                                I want to report a bug
                            </option>
                            <option value="FEEDBACK">I want to give a feedback</option>
                            <option value="SUPPORT">I need support with API</option>
                            <option value="OTHER">Other</option>
                        </select>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">
                                Digit your message ({messageLength ?? undefined} characters remaining)
                            </label>
                            <small id="count" className="text-muted"></small>
                            <textarea
                                id="message"
                                maxLength={1024}
                                className="fs-4 form-control"
                                name="message"
                                value={message}
                                rows={7}
                                required
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        {loading ? <Button disabled={true}>Processing...</Button> : <Button>Send Message</Button>}
                    </form>

                    {contactSend && <SuccessAlertMessage message={"Message send!"} />}

                    {error && <ErrorAlertMessage error={error} />}
                </div>

                <div className="col-lg-12 text-center text-muted mb-3 mt-3">
                    <small>&copy; Galhardo MicroSaaS 2023</small>
                </div>
            </div>
        </>
    );
}

const containerContact: CSSProperties = {
    marginTop: "300px",
};
