import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";

import logo from "../images/1111-logo.gif";

const { Title } = Typography;

const Footer = () => {
  return (
    <Row className='footer' justify='center'>
      <Col flex='1000px'>
        <Row justify='space-between' align='top'>
          <Col flex='300px'>
            <Row>
              <Title level={4}>Created By</Title>
              <img
                alt='Eleven Eleven - Software Development'
                src={logo}
                width='150px'
                height='38px'
              />
              <span class='small'>Web and Application Development</span>
            </Row>

            <Row>
              <Title level={4}>About</Title>
              <ul>
                <li>
                  <a href='https://www.eleven-eleven.co.uk' target='_new'>
                    Eleven Eleven
                  </a>
                </li>
                <li>
                  <a href='https://www.eleven-eleven.co.uk' target='_new'>
                    Email Us
                  </a>
                </li>
              </ul>
            </Row>
          </Col>

          <Col flex='300px'>
            <Row>
              <Title level={4}>Our Sites</Title>
              <ul>
                <li>
                  <a href='https://www.eleven-eleven.co.uk' target='_new'>
                    Super Stats
                  </a>
                </li>
                <li>
                  <a href='https://www.eleven-eleven.co.uk' target='_new'>
                    Sudoku Solver
                  </a>
                </li>
              </ul>
            </Row>
          </Col>

          <Col flex='300px'>
            <Row>
              <Title level={4}>Support</Title>
              <p>
                We believe there are pockets of the internet that can still be
                great. That's why this site has:
              </p>
              <ul>
                <li>No ads, tracking or analytics</li>
                <li>No social media</li>
                <li>No sponsored or affiliate links</li>
              </ul>
              <p>
                We aim to keep this site free to use for the Agile community for
                as long as possible.
              </p>
              <p>
                If you like what we do and would like to support us, you can do
                so below!
              </p>
              <Button type='primary' icon={<CoffeeOutlined />}>
                Buy me a coffee
              </Button>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export { Footer };
