import { Helmet } from "react-helmet-async";

const gtmId = import.meta.env.VITE_GTM_ID;

export default function OptionalTracking() {
  if (!gtmId) return null;

  return (
    <Helmet>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
          var firstScript = document.getElementsByTagName("script")[0];
          var gtmScript = document.createElement("script");
          gtmScript.async = true;
          gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=${String(gtmId).replace(/[^A-Z0-9-]/gi, "")}";
          firstScript.parentNode.insertBefore(gtmScript, firstScript);
        `}
      </script>
    </Helmet>
  );
}
