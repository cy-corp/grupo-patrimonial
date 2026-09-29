import { createNextConfig } from "../create-next-config";

const CANONICAL = "https://gruporendal.com";
const DCORP = "https://dcorp.com.br";

export default createNextConfig(__dirname, {
  async redirects() {
    return [
      { source: "/incorporadora", destination: "/", permanent: true },
      { source: "/imobiliaria", destination: "/", permanent: true },
      { source: "/patrimonial", destination: "/", permanent: true },
      { source: "/integracao", destination: "/", permanent: true },
      { source: "/processos", destination: "/quem-somos", permanent: true },
      { source: "/orcamento", destination: "/contato", permanent: true },
      { source: "/engenharia", destination: DCORP, permanent: true },
      { source: "/construtora", destination: DCORP, permanent: true },
      {
        source: "/",
        has: [{ type: "host", value: "www.gruporendal.com" }],
        destination: CANONICAL,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.gruporendal.com" }],
        destination: `${CANONICAL}/:path*`,
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "host", value: "rendal.com.br" }],
        destination: CANONICAL,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "rendal.com.br" }],
        destination: `${CANONICAL}/:path*`,
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "host", value: "www.rendal.com.br" }],
        destination: CANONICAL,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rendal.com.br" }],
        destination: `${CANONICAL}/:path*`,
        permanent: true,
      },
    ];
  },
});
