import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Divider, Modal } from "antd";
import {
  CoffeeOutlined,
  UserOutlined,
  ImportOutlined,
} from "@ant-design/icons";

const submitActions = {
  joinRoom: "joinRoom",
  createRoom: "createRoom",
};

const LoginForm = ({
  handleSubmit,
  handleCreateGroupClick,
  visible,
  roomNotFound,
}) => {
  console.log(roomNotFound);

  const [selectedCards, setSelectedCards] = useState([
    "1",
    "3",
    "5",
    "8",
    "13",
  ]);

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
    console.log(checkedValues);
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
            <span>1 3 5 8 13 ... we dropped the 2, but you don't have to</span>
          </div>
          <Form
            name='normal_login'
            className='login-form'
            size='large'
            initialValues={{
              remember: true,
            }}
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

            <Divider>or</Divider>

            <Form.Item>
              <Checkbox.Group
                name='cards'
                style={{ width: "100%" }}
                defaultValue={selectedCards}
                onChange={onChange}>
                <Row>
                  <Col style={{ textAlign: "center" }} span={4}>
                    <Checkbox checked={true} value='0'>
                      0
                    </Checkbox>
                  </Col>
                  <Col style={{ textAlign: "center" }} span={4}>
                    <Checkbox checked={true} value='1'>
                      1
                    </Checkbox>
                  </Col>
                  <Col style={{ textAlign: "center" }} span={4}>
                    <Checkbox value='2'>2</Checkbox>
                  </Col>
                  <Col style={{ textAlign: "center" }} span={4}>
                    <Checkbox checked value='3'>
                      3
                    </Checkbox>
                  </Col>
                  <Col style={{ textAlign: "center" }} span={4}>
                    <Checkbox checked value='5'>
                      5
                    </Checkbox>
                  </Col>
                  <Col style={{ textAlign: "center" }} span={4}>
                    <Checkbox checked value='8'>
                      8
                    </Checkbox>
                  </Col>
                  <Col style={{ textAlign: "center" }} span={4}>
                    <Checkbox checked value='13'>
                      13
                    </Checkbox>
                  </Col>
                  <Col style={{ textAlign: "center" }} span={4}>
                    <Checkbox value='21'>21</Checkbox>
                  </Col>
                  <Col style={{ textAlign: "center" }} span={4}>
                    <Checkbox value='34'>34</Checkbox>
                  </Col>
                  <Col style={{ textAlign: "center" }} span={4}>
                    <Checkbox value='55'>55</Checkbox>
                  </Col>
                  <Col style={{ textAlign: "center" }} span={4}>
                    <Checkbox value='C'>
                      <CoffeeOutlined />
                    </Checkbox>
                  </Col>
                  <Col style={{ textAlign: "center" }} span={4}>
                    <Checkbox value='?'>?</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              className='right'
              style={{ width: "50%", display: "inline-block", margin: 0 }}>
              <Button
                onClick={() => setSubmitAction(submitActions.createRoom)}
                type='primary'
                htmlType='submit'
                className='login-form-button'>
                CREATE ROOM
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export { LoginForm };
