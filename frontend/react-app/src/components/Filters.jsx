export default function Filters({ location, setLocation, type, setType }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-3 border rounded-lg"
      >
        <option value="">All Locations</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Remote">Remote</option>
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-3 border rounded-lg"
      >
        <option value="">All Job Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Internship">Internship</option>
      </select>
    </div>
  );
}



