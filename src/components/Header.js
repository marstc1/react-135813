import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import QuickResponseCode from "qrcode.react";

import logo from "../images/logo.png";

const propTypes = {
  name: PropTypes.string.isRequired,
  roomNumber: PropTypes.string.isRequired,
};

const Header = ({ name, roomNumber }) => {
  const inviteUrl = `https://www.135813.com/${roomNumber}`;

  return (
    <Row className='header' justify='center'>
      <Col flex='1000px'>
        <Row justify='space-between' align='middle'>
          <Col flex='300px'>
            <a href='/'>
              <img
                alt="1 3 5 8 13 ... we dropped a two but you don't have to!"
                src={logo}
                width='118px'
                height='110px'
              />
            </a>
          </Col>

          <Col flex='300px'>
            <Row className='info'>
              <Col flex='auto'>
                <h2>Room: {roomNumber}</h2>
                <span>{inviteUrl}</span>

                <Row style={{ paddingTop: "2em" }}>
                  <span
                    style={{
                      padding: "0.2rem 0.4rem",
                      backgroundColor: "#00b2b2",
                      borderRadius: "50%",
                      color: "#fff",
                      margin: "0rem 0.5rem 0 0",
                    }}>
                    <UserOutlined />
                  </span>
                  <span
                    style={{
                      fontWeight: "bold",
                      lineHeight: "1.8rem",
                    }}>
                    {name}
                  </span>
                </Row>
              </Col>
              <Col flex='80px'>
                <Row justify='end'>
                  <QuickResponseCode value={inviteUrl} size={80} />
                </Row>
                <Row justify='center' style={{ marginTop: "0" }}>
                  <span className='small'>Scan me!</span>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

Header.propTypes = propTypes;

export { Header };
