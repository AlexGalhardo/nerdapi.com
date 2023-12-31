import { useGlobalState } from "../../Context/GlobalStateContext";
import SuccessAlertMessage from "../Alerts/SuccessAlertMessage";
import ClipboardJS from "clipboard";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorAlertMessage from "../Alerts/ErrorAlertMessage";

export default function ProfileUser() {
    const { user, updateProfile, loading, error, updatedProfile } = useGlobalState();
    const [errorUsername, setErrorUsername] = useState<string | boolean>(false);
    const [errorNewPassword, setErrorNewPassword] = useState<string | boolean>(false);
    const [errorTelegramNumber, setErrorTelegramNumber] = useState<string | boolean>(false);
    let registred = null;

    const [username, setUsername] = useState<string>(user?.username as string);
    const [telegramNumber, setTelegramNumber] = useState<string>(user?.telegram_number as string);
    const [newPassword, setNewPassword] = useState<string>();
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>();

    const notifyCopiedAPIKEY = () => {
        toast.success("API KEY COPIED!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            theme: "dark",
        });
    };

    function checkUsername(fullName: string) {
        function isValidSingleName(name: string): boolean {
            if (!name || name.length <= 3) {
                setErrorUsername("Username must has at least 4 characters");
                return false;
            } else if (name.length > 16) {
                setErrorUsername("Username must has max 16 characters");
                return false;
            }

            const regexOfValidNamesWithAcents = /^[a-zA-ZÀ-ú]+$/g;
            return regexOfValidNamesWithAcents.test(name);
        }

        const names = fullName.split(" ");
        if (names.length > 1) {
            for (const name of names) {
                if (!isValidSingleName(name)) return false;
            }
        } else if (names.length <= 1) {
            if (!isValidSingleName(fullName)) return false;
        }

        return true;
    }

    function checkTelegramNumber(telegramNumber: string) {
        const BRAZIL_VALID_PHONE_DDD = [
            11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46,
            47, 48, 49, 51, 53, 54, 55, 61, 62, 64, 63, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85,
            86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
        ];

        telegramNumber = telegramNumber?.replace(/\D/g, "");

        if (telegramNumber && telegramNumber?.length !== 13) {
            setErrorTelegramNumber("TelegramNumber must has 13 numbers");
        } else if (telegramNumber && parseInt(telegramNumber.substring(4, 5)) !== 9) {
            setErrorTelegramNumber("TelegramNumber must be in Brazil Phone Number Format like 5518999999999");
        } else if (telegramNumber && new Set(telegramNumber).size === 1) {
            setErrorTelegramNumber("TelegramNumber must be in Brazil Phone Number Format like 5518999999999");
        } else if (telegramNumber && BRAZIL_VALID_PHONE_DDD.indexOf(parseInt(telegramNumber.substring(2, 4))) == -1) {
            setErrorTelegramNumber("TelegramNumber must be in Brazil Phone Number Format like 5518999999999");
        }

        setErrorTelegramNumber("");
    }

    function checkNewPassword(newPassword: string) {
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;

        const securePassword =
            specialCharRegex.test(newPassword) && uppercaseRegex.test(newPassword) && numberRegex.test(newPassword);

        if (newPassword.length < 12) {
            setErrorNewPassword("New Password must has at least 12 characters");
        } else if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
            setErrorNewPassword("Passwords not equal");
        } else if (!securePassword) {
            setErrorNewPassword("New Password must has at least 1 upperCase, 1 number and 1 special character");
        } else {
            setErrorNewPassword("");
        }
    }

    async function handleSubmitUpdateProfile(event: any) {
        event.preventDefault();

        if (telegramNumber) checkTelegramNumber(telegramNumber);
        if (newPassword) checkNewPassword(newPassword);

        if (username && checkUsername(username) && !errorTelegramNumber && !errorNewPassword) {
            setErrorUsername("");
            updateProfile({
                username: username ?? undefined,
                telegramNumber: telegramNumber ?? undefined,
                newPassword: newPassword ?? undefined,
                confirmNewPassword: confirmNewPassword ?? undefined,
            });
        }
    }

    useEffect(() => {
        const clipboard = new ClipboardJS(".BUTTON_COPY_API_KEY");
        return () => {
            clipboard.destroy();
        };
    }, []);

    return (
        <>
            {registred && (
                <SuccessAlertMessage
                    message={
                        registred === "true" &&
                        "Welcome, your password is your email! You can change your password in this page."
                    }
                />
            )}

            <div className="col-lg-5 mt-5">
                <form onSubmit={handleSubmitUpdateProfile}>
                    <small>
                        <span id="alert_name" className="fw-bold text-danger"></span>
                    </small>

                    <div className="form-group mb-3">
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            min={4}
                            max={16}
                            className="fs-4 form-control"
                            defaultValue={user?.username as string}
                            name="name"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errorUsername && (
                            <small>
                                <span className="fw-bold text-danger">{errorUsername}</span>
                            </small>
                        )}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="fs-4 form-control"
                            name="email"
                            defaultValue={user?.email as string}
                            readOnly
                            disabled
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="telegram_number">Telegram Number</label>
                        <input
                            className="fs-4 mb-2 form-control"
                            type="text"
                            name="telegram_number"
                            pattern="^55[0-9]{11}$"
                            minLength={13}
                            maxLength={13}
                            defaultValue={user?.telegram_number as string}
                            onChange={(e) => setTelegramNumber(e.target.value)}
                        />
                        {errorTelegramNumber && (
                            <small>
                                <span className="fw-bold text-danger">{errorTelegramNumber}</span>
                            </small>
                        )}
                    </div>

                    <hr />

                    <div className="form-group mb-3">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            className="fs-4 form-control"
                            name="newPassword"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        <input
                            type="password"
                            className="fs-4 form-control"
                            name="confirmNewPassword"
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </div>
                    {errorNewPassword && (
                        <small>
                            <span className="fw-bold text-danger">{errorNewPassword}</span>
                        </small>
                    )}

                    {loading ? (
                        <button
                            type="submit"
                            className="button fs-4 mt-3 mb-3 w-50 btn btn btn-outline-success"
                            disabled={true}
                        >
                            Processing...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="button fs-4 mt-3 mb-3 w-50 btn btn btn-outline-success"
                            disabled={false}
                        >
                            Update Profile
                        </button>
                    )}

                    <ErrorAlertMessage message={error && !updatedProfile && `${error}`} />

                    <SuccessAlertMessage message={!error && updatedProfile && `Profile Updated!`} />
                </form>
            </div>

            <div className="container col-lg-7">
                <div className="form-group mt-5">
                    <label htmlFor="apiKey">API KEY</label>
                    <input
                        id="apiKey"
                        name="apiKey"
                        className="fs-4 mb-2 form-control"
                        type="text"
                        defaultValue={user?.api_key ?? undefined}
                        readOnly
                        disabled
                    />
                    {!user?.api_key && (
                        <small>
                            <a href="/pricing">You need to have a subscription active to have access to a API KEY.</a>
                        </small>
                    )}
                </div>

                {user?.api_key && (
                    <>
                        <button
                            onClick={notifyCopiedAPIKEY}
                            className="fw-bold btn btn-outline-success border-whitebutton BUTTON_COPY_API_KEY"
                            data-clipboard-text={user?.api_key}
                        >
                            COPY API KEY
                        </button>
                        <ToastContainer />
                    </>
                )}

                <div className="mt-5">
                    <div className="form-group mb-3">
                        <label htmlFor="name">Currently Plan</label>
                        <input
                            className="fs-4 mb-2 form-control"
                            type="text"
                            defaultValue={user?.stripe.subscription.name as string}
                            readOnly
                            disabled
                        />
                    </div>

                    {user?.stripe.subscription.hosted_invoice_url && (
                        <a
                            className="button fs-4 mt-3 mb-3 w-25 btn btn btn-outline-primary"
                            href={user?.stripe.subscription.hosted_invoice_url}
                            target="_blank"
                        >
                            Invoice
                        </a>
                    )}

                    <hr></hr>

                    <div className="form-group mb-3">
                        <label htmlFor="name">Subscription started at</label>
                        <input
                            className="fs-4 mb-2 form-control"
                            name="SUBSCRIPTION_START_DATE_TIME"
                            type="text"
                            defaultValue={user?.stripe.subscription.starts_at ?? undefined}
                            readOnly
                            disabled
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="name">Subscription ends at</label>
                        <input
                            className="fs-4 mb-2 form-control"
                            name="SUBSCRIPTION_END_DATE_TIME"
                            type="text"
                            defaultValue={user?.stripe.subscription.ends_at ?? undefined}
                            readOnly
                            disabled
                        />
                    </div>

                    {user?.stripe.subscription.receipt_url && (
                        <a
                            className="button fs-4 mt-3 mb-3 w-50 btn btn btn-outline-danger"
                            href={user?.stripe.subscription.receipt_url}
                            target="_blank"
                        >
                            Manage Subscription
                        </a>
                    )}
                </div>
            </div>
        </>
    );
}
