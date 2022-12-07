import React, { useState, useEffect } from "react";
import { Col, Row, Button, Modal, Image, Figure } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const config = {
  headers: {
    "Access-Control-Allow-Credentials": true,
    Origin: "X-Requested-With",
  },
};

export default function IssueModal(props) {
  const { show, data } = props;
  const [issueData, setIssueData] = useState("Loading");
  useEffect(() => {
    if (show) {
      const fetchData = async () => {
        await fetch(
          "https://cors-anywhere.herokuapp.com/" +
            data["api_detail_url"] +
            "/?api_key=357324b5a6289c2521e0d7f163e20b6027a92ed5&format=json",
          config
        )
          .then((response) => response.json())
          .then((data) => setIssueData(data.results))
          .catch((err) => console.log(err));
      };

      fetchData();

      console.log(issueData);
    }
  }, [show]);

  return issueData !== "Loading" ? (
    <Modal
      {...props}
      size="lg"
      fullscreen= {true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onEntered={() => {
        console.log();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {issueData["name"]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Row>
            <Col>
          <Row>
            <h1> Characters</h1>
          </Row>
          <Row>
            <div class="d-flex align-content-around flex-wrap">
              {issueData["character_credits"].map((char) => (
                <p>{char["name"]}&nbsp; </p>
              ))}
            </div>
          </Row>
          <Row>
            <h1> Teams</h1>
          </Row>
          <Row>
            <div class="d-flex align-content-around flex-wrap">
              {issueData["team_credits"].map((team) => (
                <p>{team["name"]}&nbsp; </p>
              ))}
            </div>
          </Row>
          <Row>
            <h1>Locations</h1>
          </Row>
          <Row>
            <div class="d-flex align-content-around flex-wrap">
              {issueData["location_credits"].map((location) => (
                <p>{location["name"]}&nbsp; </p>
              ))}
            </div>
          </Row>
          <Row>
            <h1>Concepts</h1>
          </Row>
          <Row>
            <div class="d-flex align-content-around flex-wrap">
              {issueData["concept_credits"].map((concept) => (
                <p>{concept["name"]}&nbsp; </p>
              ))}
            </div>
          </Row>
        </Col>
        <Col>
        <Figure>
      <Figure.Image
        width={400}
        height={600}
        alt="171x180"
        src={issueData["image"]["original_url"]}
      />
    </Figure>
        </Col>
            </Row>
        
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  ) : (
    <Modal>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Modal>
  );
}
