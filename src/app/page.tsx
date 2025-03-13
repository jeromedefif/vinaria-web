import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-wine-burgundy mb-4">
          Prémiová vína pro náročnou klientelu
        </h1>

        <p className="mb-8 text-gray-700">
          Partner pro restaurace, hotely a vinotéky, které očekávají jen to nejlepší.
        </p>

        <div className="flex gap-4 mb-16">
          <Link
            href="/katalog"
            className="bg-amber-600 text-white px-6 py-2 rounded"
          >
            Naše portfolio
          </Link>
          <a
            href="https://www.beginy.cz"
            className="border border-gray-400 px-6 py-2 rounded"
          >
            B2B přihlášení
          </a>
        </div>

        <h2 className="text-2xl font-bold text-wine-burgundy mb-4">
          Proč si vybrat naše vína?
        </h2>

        <p className="mb-4 text-gray-700">
          V srdci moravského vinařského regionu vytváříme vína, která reprezentují to nejlepší, co naše krajina nabízí.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">Tradice a kvalita</h3>
            <p>Spojujeme tradiční vinařské postupy s moderními technologiemi.</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">Exkluzivita</h3>
            <p>Naše vína najdete pouze ve vybraných gastronomických zařízeních.</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">Terroir a originalita</h3>
            <p>Respektujeme jedinečný charakter každé vinice.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
