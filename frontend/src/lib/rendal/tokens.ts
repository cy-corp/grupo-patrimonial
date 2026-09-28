/** Visual system of the Rendal home.
 * Face: Manrope stays loaded as `--font-montserrat` until the client confirms
 * the manual's Montserrat. Do not mix a second family on new screens.
 */
export const EASE = "cubic-bezier(0.32,0.72,0,1)";

export const colors = {
  cream: "#F8F1E3",
  creamDeep: "#EDE6DA",
  white: "#FFFFFF",
  petroleo: "#0F5B63",
  petroleoHover: "#0A474E",
  petroleoNoite: "#0E2A2D",
  grafite: "#1F1F1F",
  dourado: "#C9A96A",
} as const;

export const headlineLight =
  "bg-clip-text text-transparent bg-[linear-gradient(90deg,#000_0%,#666_100%)]";

export const headlineDark =
  "bg-clip-text text-transparent bg-[linear-gradient(90deg,#FFF_0%,#9B9B9B_100%)]";
