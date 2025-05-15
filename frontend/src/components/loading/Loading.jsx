import Spinner from 'react-bootstrap/Spinner';

export default function Loading({size = 100}) {
  return (
 <div style={{
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    height:"100%"
 }}>
     <span className="visually-hidden">Loading...</span><br />
 <Spinner style={{
    width:size,
    height:size
 }} animation="border" role="status">
    </Spinner>
 </div>

   
  );
}
