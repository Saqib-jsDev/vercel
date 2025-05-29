import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import NotesCards from "../../components/NotesCards";
import { Button,  } from "react-bootstrap";
import useNotes from "../../customHooks/useNotes";



export default function MyNotes({search}) {
      const {loading,error,notes} = useNotes(true)
  
  return (
    <MainScreen title="WelCome back Saqib Ali  ..... ">
      <Link to={"createnote"}>
        <Button
          style={{
            marginLeft: 10,
            marginBottom: 10,
          }}siz="lg">
          Create New Notes
        </Button>
      </Link>
<NotesCards search={search}  >
</NotesCards>
    </MainScreen>
  );
}