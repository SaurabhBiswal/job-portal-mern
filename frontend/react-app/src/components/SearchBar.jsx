export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search jobs by title or company..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-3 border rounded-lg mb-4"
    />
  );
}

