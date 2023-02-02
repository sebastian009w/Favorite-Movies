import { urlBatman } from "../server/server";
import { FormEvent, useEffect, useState } from "react";
import { CardMovies } from "./Card";
import { Loader } from "./Loader";

export function Batman() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSeach] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      const res = await fetch(urlBatman);
      const result = await res.json();
      const { Search } = result;
      setData(Search);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) {
      return setError("Ingresa un texto valido porfavor");
    }
    const res = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=61093265&s=${search}`
    );
    const result = await res.json();
    setData(result.Search);
    if (!result.Search) {
      return setError("No hay resultados");
    }
  };
  return (
    <>
      <div className="flex md:order-2">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            placeholder="Search..."
            onChange={(e) => setSeach(e.target.value)}
            autoComplete="off"
            value={search}
          />
        </form>
        <span>{error}</span>
      </div>
      <section>
        <div>
          <CardMovies data={data} />
        </div>
      </section>
    </>
  );
}
