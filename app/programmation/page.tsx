import { permanentRedirect } from "next/navigation";

export default function LegacyProgrammingPage() {
  permanentRedirect("/enseignants/programmation");
}
