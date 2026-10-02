import { createNextConfig } from "../create-next-config";

const CANONICAL = "https://www.dcorp.com.br";
const RENDAL = "https://www.gruporendal.com";

export default createNextConfig(__dirname, {
  async redirects() {
    return [
      { source: "/engenharia", destination: "/", permanent: true },
      { source: "/construtora", destination: "/", permanent: true },
      { source: "/incorporadora", destination: RENDAL, permanent: true },
      { source: "/imobiliaria", destination: RENDAL, permanent: true },
      { source: "/patrimonial", destination: RENDAL, permanent: true },
      { source: "/integracao", destination: "/", permanent: true },
      { source: "/orcamento", destination: "/contato", permanent: true },
      {
        source: "/",
        has: [{ type: "host", value: "dcorp.com.br" }],
        destination: CANONICAL,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "dcorp.com.br" }],
        destination: `${CANONICAL}/:path*`,
        permanent: true,
      },
    ];
  },
});
