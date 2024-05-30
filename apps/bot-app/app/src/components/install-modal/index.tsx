import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export const InstallModal: React.FC = () => {

    const [open, setOpen] = React.useState(localStorage.getItem("installPwa") !== "true" ?? false);
    const deferredPromptRef = React.useRef<any>(null);

    React.useEffect(() => {
        if (localStorage.getItem("installPwa") !== "true") {
            // Check if the browser has the install event
            if ("serviceWorker" in navigator && "PushManager" in window) {
                setOpen(true);
                window.addEventListener("beforeinstallprompt", (e) => {
                    e.preventDefault();
                    deferredPromptRef.current = e;
                });
            }
        }
    }, []);

    const closeAndSetLocalStorage = () => {
        setOpen(false);
        localStorage.setItem("installPwa", "true");
    };
    const handleOpen = React.useCallback(() => {
        closeAndSetLocalStorage();
        if (deferredPromptRef.current) {
            deferredPromptRef.current.prompt();
            deferredPromptRef.current.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("App installed");
                } else {
                    console.log("App installation declined");
                }
            });
        }
        setOpen(false);
    }, []);

    const handleClose = React.useCallback(() => {
        setOpen(false);
        localStorage.setItem("installPwa", "true");
    }, []);

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Install App
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Click the button to install the app.
                        </Typography>
                        <Button
                            onClick={handleOpen}
                            style={{
                                marginTop: "20px",
                                backgroundColor: "var(--secondary)",
                                color: "white",
                            }}
                        >
                            Install
                        </Button>
                    </Box>

                </>
            </Modal>
        </>
    );
};
