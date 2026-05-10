import { isPublishable } from "@/lib/publishable";

export function sanitizePublicPedagogicalText(text: string) {
  return text.replace(/à vérifier/gi, "à confirmer");
}

export function sanitizePublicPedagogicalItems(items: string[]) {
  return items.filter(isPublishable).map(sanitizePublicPedagogicalText);
}
