import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotesThunk } from "../store/features/notes/notesActions";

export default function useNotes(fetchOnMount = false) {
  const { loading:userLoading, userInfo } = useSelector((state) => state.userAuth);
  const { loading:notesLoading, error,notes  } = useSelector((state) => state.notes);

  const dispatch = useDispatch();
  useEffect(() => {
    if (fetchOnMount && notes.length === 0) {
      dispatch(getAllNotesThunk());
    }
  }, [dispatch, fetchOnMount]);

  return { userLoading,notesLoading, error, notes,userInfo,dispatch };
}
