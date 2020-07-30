import { useState, useEffect } from "react";

export function useHandleAppBrowser() {
  const [inAppBrowser, setInAppBrowser] = useState(false);

  useEffect(() => {
    const openInBrowser = (target, browserScheme) => {
      var ifc = document.createElement("div");
      ifc.innerHTML = `<iframe src='${browserScheme}${target}' style='width:0;height:0;border:0; border:none;visibility: hidden;'></iframe>`;
      document.body.appendChild(ifc);
    };

    const isInApp = (appSpecificUserAgents) => {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      for (var i = 0; i <= appSpecificUserAgents.length; i++) {
        if (userAgent.indexOf(appSpecificUserAgents[i]) > -1) return true;
      }
    };

    const tryOpenBrowser = () => {
      if (document.body) {
        console.log(
          "window.location.href: ",
          window.location.href,
          window.location.href.split("//")[1]
        );
        // window.open(window.location.href, "_blank");
        // openInBrowser(
        //   "www.charliehouseparty.club",
        //   "googlechrome://navigate?url="
        // );
        if (isInApp(["FBAN", "FBAV"])) {
          console.log("SettingInAppBrowser: ");
          setInAppBrowser(true);
          openInBrowser(window.location.href.split("//")[1], "googlechrome://"); //x-web-search://
          // openInBrowser(window.location.href, "googlechrome://navigate?url=");
        }
      } else {
        window.requestAnimationFrame(tryOpenBrowser);
      }
    };

    tryOpenBrowser();
  }, []);

  return { inAppBrowser };
}
