import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import useAuthentication from "./useAuthentication";

//Can be used instead of PrivateRoute.
//A regular route must be used and the rendered component would be wrapped with this component.
//Example:
//<Route path="/example" component={Component} /> in MainRoute
//Component() {return <NotAuthenticatedDialog><OtherComponents>content</OtherComponents></NotAuthenticatedDialog> }

export default function NotAuthenticatedDialog({}) {
  const [user] = useAuthentication();
  return (
    <>
      {props.children}
      {!user && (
        <Dialog open={true}>
          <DialogTitle>{"Not logged in"}</DialogTitle>
          <DialogActions>
            <Button href="/profile" color="secondary" autoFocus="autoFocus">
              Log in
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
