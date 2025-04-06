import { Col, Container, Row } from "react-bootstrap";
// video 15.39
export default function Footer(){
    return (

        <footer style={{
            width:"100%",
            position:"relative",
            bottom:0,
            display:"flex",
            justifyContent:"center"
        }}>
            <Container>
                <Row >
                    <Col className="text-center py-3">Copyright Saqib note Zipper</Col>
                </Row>
            </Container>

        </footer>
    )
    
}