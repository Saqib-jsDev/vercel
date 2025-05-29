import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotesThunk } from "../store/features/notes/notesActions";

export default function useNotes(fetchOnMount = false) {
  const {  userInfo } = useSelector((state) => state.userAuth);
  const { loading, error,notes  } = useSelector((state) => state.notes);

  const dispatch = useDispatch();
  useEffect(() => {
    if (fetchOnMount && notes.length === 0) {
      dispatch(getAllNotesThunk());
    }
  }, [dispatch, fetchOnMount]);

  return { loading, error, notes };
}
