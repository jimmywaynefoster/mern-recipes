import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { isUserAuthenticated } from "./api-auth.js";
import { useHistory } from "react-router-dom";

//Allow two button types. The type must be specified in the prop "buttonType"
//The two allowed types are "Button" and "IconButton"
export default function ButtonWithAuthDialog({
  onClick,
  buttonType,
  ...props
}) {
  let history = useHistory();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    isUserAuthenticated(signal).then((athenticated) => {
      if (athenticated) {
        onClick();
        abortController.abort();
      } else {
        setOpen(true);
      }
    });
  };

  return (
    <>
      {buttonType == "Button" && (
        <Button onClick={handleClick} {...props}></Button>
      )}
      {buttonType == "IconButton" && (
        <IconButton onClick={handleClick} {...props}></IconButton>
      )}
      <Dialog open={open}>
        <DialogTitle>{"Not logged in"}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              history.push("/login", history.location.pathname);
            }}
            color="secondary"
            autoFocus="autoFocus"
          >
            Log in
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
