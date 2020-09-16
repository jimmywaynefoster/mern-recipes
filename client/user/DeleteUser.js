import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { remove } from "./api-user.js";
import { Redirect } from "react-router-dom";
import useAuthentication from "./../auth/useAuthentication";
import ButtonWithAuthDialog from "./../auth/ButtonWithAuthDialog";

const useStyles = makeStyles((theme) => ({
  cancelButton: {
    color: "#000",
    marginBottom: 12,
  },
  confirmButton: {
    color: "#fff",
    marginBottom: 12,
    marginRight: 12,
  },
}));

export default function DeleteUser(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [user] = useAuthentication(open);

  const clickButton = () => {
    setOpen(true);
  };

  const deleteAccount = () => {
    remove().then((data) => {
      if (data && data.err) {
        console.log(data.err);
      } else {
        setRedirect(true);
      }
    });
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <span>
      <ButtonWithAuthDialog
        aria-label="Delete"
        onClick={clickButton}
        color="secondary"
        buttonType="IconButton"
      >
        <DeleteIcon />
      </ButtonWithAuthDialog>

      {user && (
        <Dialog open={open} onClose={handleRequestClose}>
          <DialogTitle>{"Delete Account"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirm to delete your account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleRequestClose}
              variant="outlined"
              color="primary"
              className={classes.cancelButton}
            >
              Cancel
            </Button>
            <Button
              onClick={deleteAccount}
              variant="contained"
              color="secondary"
              className={classes.confirmButton}
              autoFocus="autoFocus"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </span>
  );
}
