export const CONTACT_PROFILE_IDS = [
  "comprar",
  "financiar",
  "terreno",
  "investir",
  "parceiro",
] as const;

export type ContactProfileId = (typeof CONTACT_PROFILE_IDS)[number];

export function isContactProfileId(
  value: string | null | undefined,
): value is ContactProfileId {
  return CONTACT_PROFILE_IDS.some((item) => item === value);
}
