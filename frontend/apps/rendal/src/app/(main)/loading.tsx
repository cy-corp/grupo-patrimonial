export default function Loading() {
  return (
    <main id="conteudo" className="bg-[#F8F1E3] px-6 pt-36 pb-20" aria-busy="true" aria-live="polite">
      <div className="mx-auto max-w-3xl animate-pulse motion-reduce:animate-none">
        <div className="mx-auto h-4 w-28 rounded-full bg-[#EDE6DA]" />
        <div className="mx-auto mt-6 h-12 w-full max-w-lg rounded-2xl bg-[#EDE6DA]" />
        <div className="mx-auto mt-4 h-20 max-w-md rounded-2xl bg-[#EDE6DA]" />
        <div className="mt-10 aspect-video rounded-3xl bg-[#EDE6DA]" />
      </div>
    </main>
  );
}
