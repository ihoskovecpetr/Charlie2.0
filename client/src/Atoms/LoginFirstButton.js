import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

function LoginFirstButton(props) {
  let history = useHistory();

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      style={{ marginTop: 30 }}
      onClick={() => {
        setTimeout(() => {
          history.push({
            pathname: history.location.pathname,
            search: `?signin=true`,
          });
        }, 200);
      }}
    >
      LOGIN FIRST
    </Button>
  );
}

export default React.memo(LoginFirstButton);
