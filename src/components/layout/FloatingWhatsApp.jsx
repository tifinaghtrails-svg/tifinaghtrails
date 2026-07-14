import { siteConfig } from "../../config/site";
import { trackWhatsAppClick } from "../../utils/analytics";

export default function FloatingWhatsApp() {
  const message = encodeURIComponent("Hello TifinaghTrails, I would like more details about your tours.");

  return (
    <a
      className="floating-whatsapp"
      href={`${siteConfig.whatsappUrl}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={() => trackWhatsAppClick({ location: "floating_whatsapp" })}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16.04 4.5c-6.37 0-11.55 5.02-11.55 11.2 0 2.1.61 4.14 1.76 5.91L4.4 27.5l6.17-1.8a11.86 11.86 0 0 0 5.47 1.37c6.37 0 11.55-5.02 11.55-11.19S22.41 4.5 16.04 4.5Zm0 20.7c-1.8 0-3.55-.49-5.07-1.43l-.4-.24-3.04.89.91-2.88-.26-.42a9.17 9.17 0 0 1-1.47-4.95c0-5.14 4.19-9.32 9.33-9.32s9.33 4.18 9.33 9.32-4.19 9.03-9.33 9.03Zm5.1-6.76c-.28-.14-1.65-.79-1.9-.88-.26-.1-.45-.14-.64.14-.19.27-.73.88-.9 1.06-.17.19-.33.21-.61.07-.28-.13-1.18-.42-2.25-1.34-.83-.72-1.39-1.61-1.55-1.88-.17-.28-.02-.43.12-.56.13-.12.28-.32.42-.48.14-.17.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.64-1.5-.87-2.06-.23-.54-.47-.47-.64-.48h-.55c-.19 0-.49.07-.75.35-.26.28-.99.94-.99 2.29s1.01 2.66 1.15 2.84c.14.19 1.99 2.94 4.82 4.12.67.28 1.2.45 1.61.58.68.21 1.29.18 1.78.11.54-.08 1.65-.65 1.88-1.28.23-.63.23-1.17.16-1.28-.07-.12-.26-.19-.54-.32Z" />
      </svg>
    </a>
  );
}
