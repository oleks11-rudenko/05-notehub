import css from "./App.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "../../services/noteService";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebouncedCallback(setSearchQuery, 300);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 0;
  const resetPage = () => setCurrentPage(1);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={debouncedSearchQuery}
          resetPage={resetPage}
        />
        {isSuccess && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data?.notes && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
