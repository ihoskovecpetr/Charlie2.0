import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import SignIn from "src/Pages/SignIn";
import Event from "src/Pages/Event";
import SignOut from "src/Pages/SignOut";
import ConfirmUserPage from "src/Pages/ConfirmUserPage";
import AcceptPage from "src/Pages/AcceptPage";
import UserModal from "src/Pages/UserModal";

import { UserContext } from "src/Contexts/userContext";
import { useScrollDisable } from "src/Hooks/useScrollDisable";

function Layout(props) {
  let history = useHistory();
  const { context, setContext } = useContext(UserContext);

  useScrollDisable();

  useEffect(() => {
    const isAnyModalOn =
      query.has("signin") &&
      query.has("signout") &&
      query.has("event") &&
      query.has("accept_event") &&
      query.has("user") &&
      query.has("confirm");

    if (isAnyModalOn && document.getElementById("menu_wrap")) {
      document.getElementById("menu_wrap").style.position = "fixed";
    }

    if (isAnyModalOn && document.getElementById("profile_wrap")) {
      document.getElementById("profile_wrap").style.position = "fixed";
    }

    if (isAnyModalOn && document.getElementById("mainCreate")) {
      document.getElementById("mainCreate").style.position = "fixed";
    }

    return () => {
      if (document.getElementById("profile_wrap")) {
        document.getElementById("profile_wrap").style.position = "absolute";
      }
      if (document.getElementById("menu_wrap")) {
        document.getElementById("menu_wrap").style.position = "absolute";
      }
      if (document.getElementById("mainCreate")) {
        document.getElementById("mainCreate").style.position = "absolute";
      }
    };
  }, []);

  let query = new URLSearchParams(history.location.search);

  console.log(
    "ModalPage - Params ",
    query.has("accept_event"),
    query.get("accept_event")
  );

  return (
    <div>
      {query.has("signin") && <SignIn />}
      {query.has("signout") && <SignOut />}
      {query.has("event") && <Event />}
      {query.has("confirm") && <ConfirmUserPage />}
      {query.has("accept_event") && <AcceptPage />}
      {query.has("user") && <UserModal />}
    </div>
  );
}

export default Layout;
