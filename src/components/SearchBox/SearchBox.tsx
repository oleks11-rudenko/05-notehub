import { useDebouncedCallback } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (newSearchQuery: string) => void;
  resetPage: () => void;
}

export default function SearchBox({
  searchQuery,
  setSearchQuery,
  resetPage,
}: SearchBoxProps) {
  const debouncedSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    resetPage();
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchQuery(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={searchQuery}
      onChange={handleChange}
    />
  );
}
