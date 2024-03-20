export default function SearchBar({
  setSearch
}:{
  setSearch: (query: string) => void 
}){
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value; // Get the new query value from the input field
    setSearch(newQuery);
  };

  return (
    <input
      type="search"
      placeholder="Search For Shops/Restaurants"
      onChange={handleChange}
      className="p-3 w-full drop-shadow-lg rounded-md"
    ></input>
  );
}
