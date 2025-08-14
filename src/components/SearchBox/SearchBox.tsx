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
  const debouncedSearchQuery = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      resetPage();
      setSearchQuery(event.target.value);
    },
    300
  );

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={searchQuery}
      onChange={debouncedSearchQuery}
    />
  );
}
