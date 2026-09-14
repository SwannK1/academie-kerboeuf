/**
 * Petite famille d'icônes SVG sobres (traits, 24x24, currentColor) qui
 * remplace les emoji utilisés comme icônes fonctionnelles dans l'espace
 * enseignants (navigation, outils, matières). Aucune dépendance externe :
 * chaque glyphe est un tracé fait main, dans un style cohérent.
 */

export type IconName =
  | "calendar"
  | "notebook"
  | "building"
  | "grid"
  | "folder"
  | "folder-open"
  | "check-circle"
  | "clipboard"
  | "compass"
  | "presentation"
  | "clock"
  | "users"
  | "puzzle"
  | "target"
  | "repeat"
  | "printer"
  | "image"
  | "books"
  | "box"
  | "map-pin"
  | "graduation-cap"
  | "envelope"
  | "message-circle"
  | "save"
  | "book-open"
  | "calculator"
  | "search"
  | "activity"
  | "palette"
  | "music-note"
  | "map"
  | "flask"
  | "bookmark";

const paths: Record<IconName, React.ReactNode> = {
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9.5h18" />
      <path d="M8 2.5v4M16 2.5v4" />
    </>
  ),
  notebook: (
    <>
      <path d="M6 3.5h12a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a2.5 2.5 0 0 1 2.5-2.5Z" />
      <path d="M9 3.5v17" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="1" />
      <path d="M8 8h1.5M14.5 8H16M8 12h1.5M14.5 12H16M8 16h1.5M14.5 16H16" />
      <path d="M10.5 20.5V17h3v3.5" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1" />
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="1" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="1" />
    </>
  ),
  folder: <path d="M3.5 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2h8a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5Z" />,
  "folder-open": (
    <>
      <path d="M3.5 8h4.2l1.7-1.7h5.2L16.3 8h4.2" />
      <path d="M4 8l-1 9.5a1.5 1.5 0 0 0 1.5 1.7h13a1.5 1.5 0 0 0 1.5-1.7L18 8" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.3l2.4 2.4 4.6-5.2" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="17" rx="1.5" />
      <rect x="9" y="2.5" width="6" height="3.5" rx="1" />
      <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15 9l-2 6-6 2 2-6z" />
    </>
  ),
  presentation: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M9 20l3-4 3 4" />
      <path d="M8 9l2.5 2.5L14 8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  users: (
    <>
      <circle cx="8.5" cy="8.5" r="3" />
      <circle cx="16" cy="9.5" r="2.4" />
      <path d="M3.5 20c0-3 2.2-5 5-5s5 2 5 5" />
      <path d="M14.5 20c0-2.3 1.5-4 3.8-4.2" />
    </>
  ),
  puzzle: (
    <path d="M9 4.5h3.2a1.3 1.3 0 0 1 1.2 1.8 1.3 1.3 0 0 0 1.2 1.8H18a1.5 1.5 0 0 1 1.5 1.5v3.4a1.3 1.3 0 0 0-1.8 1.2 1.3 1.3 0 0 0 1.8 1.2v3.4a1.5 1.5 0 0 1-1.5 1.5h-3.4a1.3 1.3 0 0 0-1.2-1.8 1.3 1.3 0 0 0-1.2 1.8H9a1.5 1.5 0 0 1-1.5-1.5v-3.2a1.3 1.3 0 0 1-1.8-1.2A1.3 1.3 0 0 1 7.5 12.4V9a1.5 1.5 0 0 1 1.5-1.5Z" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  repeat: (
    <>
      <path d="M4 12a8 8 0 0 1 13.6-5.7L20 8.5" />
      <path d="M20 4.5v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.6 5.7L4 15.5" />
      <path d="M4 19.5v-4h4" />
    </>
  ),
  printer: (
    <>
      <path d="M6.5 8.5V4h11v4.5" />
      <rect x="3.5" y="8.5" width="17" height="8" rx="1.5" />
      <path d="M6.5 14.5h11v6h-11z" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="M4 17.5l5-5 4 4 3-3.5 4 4.5" />
    </>
  ),
  books: (
    <>
      <path d="M4.5 4.5h4a1.5 1.5 0 0 1 1.5 1.5v14l-3-1.5-2.5 1.5V6a1.5 1.5 0 0 1 0 0Z" />
      <path d="M11.5 6l4.3-1.3a1.5 1.5 0 0 1 1.9 1v13.4a1.5 1.5 0 0 1-1 1.4l-3.7 1.2-1.5-1V6Z" />
    </>
  ),
  box: (
    <>
      <path d="M3.5 8l8.5-4 8.5 4-8.5 4-8.5-4Z" />
      <path d="M3.5 8v8l8.5 4 8.5-4V8" />
      <path d="M12 12v8" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </>
  ),
  "graduation-cap": (
    <>
      <path d="M2.5 9.5L12 5l9.5 4.5-9.5 4.5-9.5-4.5Z" />
      <path d="M6.5 11.5v4.3c0 1.2 2.5 2.7 5.5 2.7s5.5-1.5 5.5-2.7v-4.3" />
      <path d="M21.5 9.5v5.5" />
    </>
  ),
  envelope: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </>
  ),
  "message-circle": (
    <>
      <rect x="3.5" y="4.5" width="17" height="12" rx="3" />
      <path d="M8 16.5v3l4-3" />
    </>
  ),
  save: (
    <>
      <path d="M5 3.5h11l3.5 3.5v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" />
      <path d="M8 3.5v5h7v-5" />
      <rect x="7.5" y="13" width="9" height="6.5" />
    </>
  ),
  "book-open": (
    <>
      <path d="M12 6.5c-1.6-1.3-4-2-7.5-2v13c3.5 0 5.9.7 7.5 2 1.6-1.3 4-2 7.5-2v-13c-3.5 0-5.9.7-7.5 2Z" />
      <path d="M12 6.5v13" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M7.5 6.5h9v3.5h-9z" />
      <path d="M8 13.2h.01M12 13.2h.01M16 13.2h.01M8 16.7h.01M12 16.7h.01M16 16.7h.01" strokeWidth="2.4" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </>
  ),
  activity: <path d="M2.5 12.5h4l2.5-7 4 14 2.5-7h6" />,
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.9 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.7-1.6 1.6-1.6h1.9a3.7 3.7 0 0 0 3.7-3.7c0-4.2-3.9-7.5-8-7.5Z" />
      <circle cx="7.2" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="7" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="14.2" cy="7" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  "music-note": (
    <>
      <circle cx="7" cy="17.5" r="2.5" />
      <circle cx="16" cy="15.5" r="2.5" />
      <path d="M9.5 17.5V5.5L18.5 4v11.5" />
      <path d="M9.5 9l9-1.5" />
    </>
  ),
  map: (
    <>
      <path d="M9 4.5L3.5 6.5v13L9 17.5l6 2 5.5-2v-13l-5.5 2-6-2Z" />
      <path d="M9 4.5v13M15 6.5v13" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3.5h5" />
      <path d="M10.5 3.5v6l-5.3 8.9A1.8 1.8 0 0 0 6.7 21h10.6a1.8 1.8 0 0 0 1.5-2.7L13.5 9.5v-6" />
      <path d="M8 15h8" />
    </>
  ),
  bookmark: <path d="M6.5 3.5h11a1 1 0 0 1 1 1V21l-6.5-4-6.5 4V4.5a1 1 0 0 1 1-1Z" />,
};

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
