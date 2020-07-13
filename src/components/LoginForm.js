import React, { useState } from "react";
import { Button, Checkbox, Col, Divider, Form, Input, Modal, Row } from "antd";
import {
  CoffeeOutlined,
  ImportOutlined,
  UserOutlined,
} from "@ant-design/icons";

const submitActions = {
  createRoom: "createRoom",
  joinRoom: "joinRoom",
};

const LoginForm = ({
  handleCreateGroupClick,
  handleSubmit,
  roomNotFound,
  visible,
}) => {
  const [selectedCards, setSelectedCards] = useState([
    "1",
    "3",
    "5",
    "8",
    "13",
  ]);

  const availableCards = [
    "0",
    "1",
    "2",
    "3",
    "5",
    "8",
    "13",
    "21",
    "34",
    "55",
    "C",
    "?",
  ];

  const [submitAction, setSubmitAction] = useState(submitActions.joinRoom);

  const onFinish = (values) => {
    const { name, roomNumber } = values;

    if (submitAction === submitActions.joinRoom) {
      return handleSubmit(name, roomNumber);
    }

    return handleCreateGroupClick(name, selectedCards);
  };

  const onChange = (checkedValues) => {
    setSelectedCards(checkedValues);
  };

  return (
    <Modal
      centered
      className='login-modal'
      closable={false}
      maskClosable={false}
      keyboard={false}
      visible={visible}
      footer={null}>
      <Row justify='center'>
        <Col style={{ maxWidth: "300px" }}>
          <div
            className='logo'
            style={{
              marginBottom: "2em",
              height: "180px",
              width: "220px",
            }}>
            <span>1 3 5 8 13</span>
          </div>
          <Form
            autoComplete='off'
            name='normal_login'
            className='login-form'
            size='large'
            onFinish={onFinish}>
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: "Please enter your Name!",
                },
              ]}>
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Name'
              />
            </Form.Item>

            <Divider>Choose</Divider>

            <Form.Item
              name='roomNumber'
              style={{ width: "45%", display: "inline-block" }}
              rules={[
                {
                  required: submitAction === submitActions.joinRoom,
                  message: "Room number required",
                },
              ]}
              hasFeedback
              validateStatus={roomNotFound && "error"}
              help={roomNotFound && "Room not found"}>
              <Input
                prefix={<ImportOutlined className='site-form-item-icon' />}
                placeholder='135813'
                type='text'
                maxLength='6'
              />
            </Form.Item>

            <Form.Item
              className='right'
              style={{ width: "50%", display: "inline-block" }}>
              <Button
                onClick={() => setSubmitAction(submitActions.joinRoom)}
                type='primary'
                htmlType='submit'
                className='login-form-button'>
                JOIN ROOM
              </Button>
            </Form.Item>

            <Divider style={{ marginBottom: "0" }}>or</Divider>

            <Form.Item>
              <Checkbox.Group
                name='cards'
                style={{ width: "100%" }}
                defaultValue={selectedCards}
                onChange={onChange}>
                <Row className='cards-container'>
                  {availableCards.map((card) => (
                    <Col span={4} key={card}>
                      <Checkbox className='checkbox-card' value={card}>
                        {card === "C" ? <CoffeeOutlined /> : card}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Row justify='end'>
              <Form.Item>
                <Button
                  onClick={() => setSubmitAction(submitActions.createRoom)}
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'>
                  CREATE ROOM
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export { LoginForm };
