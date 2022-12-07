import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import IssueModal from "./IssueModal";

export default function IssueCards(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.data["image"]["original_url"]} />
      <Card.Body>
        <Card.Title>{props.data["name"]}</Card.Title>
        <Card.Text>{props.data["volume"]["name"]}</Card.Text>
        <IssueModal data={props.data} show={modalShow} onHide={() => setModalShow(false)} />
        <Button variant="primary" onClick={() => setModalShow(true)}>
          View more
        </Button>
      </Card.Body>
      <Card.Footer>{props.data["cover_date"]}</Card.Footer>
    </Card>
  );
}
