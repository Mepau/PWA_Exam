import React, { useState, useEffect } from "react";
import { Container} from "react-bootstrap";
import IssueCards from "./IssueCards";
const config = {
  headers: {
    "Access-Control-Allow-Credentials": true,
    Origin: "X-Requested-With",
  },
};

export default function IssuesLister() {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://cors-anywhere.herokuapp.com/https://comicvine.gamespot.com/api/issues/?api_key=357324b5a6289c2521e0d7f163e20b6027a92ed5&format=json&sort=cover_date:desc",
        config
      )
        .then((response) => response.json())
        .then((data) => setIssues(data.results))
        .catch((err) => console.log(err));
    };

    fetchData();

    console.log(issues);
  }, []);
  return (
    <Container>
      <div class="d-flex align-content-around flex-wrap">
        {issues.map((issue, index) => {
          return (
            <div class="px-3" key={index}>
              <IssueCards data={issue} />
            </div>
          );
        })}
      </div>
    </Container>
  );
}
