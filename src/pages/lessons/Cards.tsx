import React from "react";
import { Card, CardColumns, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function generateCard(cardInfo): JSX.Element {
  return (
    <Card key={`${cardInfo.title}`}>
      <Card.Img variant="top" src={cardInfo.image} />
      <Card.Body>
        <Card.Title>{cardInfo.title}</Card.Title>
        <Card.Text>{cardInfo.genre}</Card.Text>
        <Row>
          <Col xs="auto">
            <Link
              to={`/learn/${
                cardInfo.unofficial
                  ? "unofficial/" + cardInfo.author
                  : "official"
                }/${cardInfo.title}`}
            >
              <Button variant="primary">Launch</Button>
            </Link>
          </Col>
          <Col className="col-auto ml-4 text-muted">
            <Row>
              Views: {cardInfo.views ? cardInfo.views.toLocaleString() : 0}
            </Row>
            <Row>By {cardInfo.author ? cardInfo.author : "OurKorean"}</Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

function CardsMatchingFilter({ filter, showUnofficial, lessonsCardInfos }): JSX.Element {
  filter = filter.toLowerCase();

  const filteredCards = lessonsCardInfos.filter(
    (card) =>
      card.title.toLowerCase().includes(filter) &&
      (!card.unofficial || (card.unofficial && showUnofficial))
  )
    .sort((a, b) => b.views - a.views);

  let buffer: JSX.Element[] = [];

  filteredCards.forEach((cardInfo) => {
    buffer.push(generateCard(cardInfo));
  });

  return <>
    <CardColumns >
      {
        buffer.map(card => <>{card}</>)
      }
    </CardColumns>
  </>;
}

function Cards({ filter, showUnofficial, lessonsCardInfos }) {
  return (
    <CardsMatchingFilter filter={filter} showUnofficial={showUnofficial} lessonsCardInfos={lessonsCardInfos} />
  );
}

const mapStateToProps = (state) => ({
  lessonsCardInfos: state.lessonsCardInfos,
  filter: state.lessonsSearchFilter,
  showUnofficial: state.lessonsShowUnofficial,
});

export default connect(mapStateToProps)(Cards);
