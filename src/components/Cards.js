import React from "react";
import PropTypes from "prop-types";
import { Col, Button } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";

const propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleOnClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const Cards = ({ cards, handleOnClick, disabled }) => {
  return (
    <Col flex='700px' style={{ textAlign: "center" }}>
      {cards.map((card) => (
        <Button
          className='btn-card'
          disabled={disabled}
          key={card}
          onClick={() => handleOnClick(card)}>
          {card === "C" ? <CoffeeOutlined /> : card}
        </Button>
      ))}
    </Col>
  );
};

Cards.propTypes = propTypes;

export { Cards };
