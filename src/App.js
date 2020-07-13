import React, { Component } from "react";
import { LoginForm } from "./components/LoginForm";
import { Results } from "./components/Results";
import { Room } from "./components/Room";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Button, notification, Row, Col, Card, Input, Typography } from "antd";

import "./App.css";
import logo from "./images/logo.png";
import { SmileOutlined, UserOutlined, CoffeeOutlined } from "@ant-design/icons";

import QRcode from "qrcode.react";

const openNotification = (message, description) => {
  notification.open({
    message,
    description,
    icon: <SmileOutlined style={{ color: "#00b2b2" }} />,
  });
};

const { Title } = Typography;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      name: "",
      groupName: undefined,
      connectedUsers: undefined,
      cards: undefined,
      results: undefined,
      lockCards: false,
      showVotes: false,
      showResults: false,
      hubConnection: null,
      roomNotFound: undefined,
    };
  }

  componentDidMount = () => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/vote")
      .build();

    this.setState({ hubConnection }, () => {
      this.state.hubConnection
        .start()
        .then(() => console.log("Connection started!"))
        .catch((err) => console.error(err));

      this.state.hubConnection.on("init", () => {
        this.setState({ connected: true });
      });

      this.state.hubConnection.on("updateCards", (cards) => {
        this.setState({ cards });
      });

      this.state.hubConnection.on("updateGroupName", (groupName) => {
        this.setState({ groupName });
      });

      this.state.hubConnection.on("updateConnectedUsers", (data) => {
        const connectedUsers = JSON.parse(data);
        this.setState({ connectedUsers });
      });

      this.state.hubConnection.on("showLiveResults", (data) => {
        const results = JSON.parse(data);
        this.setState({ results });
        this.setState({ showResults: true });
      });

      this.state.hubConnection.on("showVotes", (showVotes) => {
        this.setState({ showVotes });
      });

      this.state.hubConnection.on("showResults", (showResults) => {
        this.setState({ showResults });
      });

      this.state.hubConnection.on("setlockCards", (isLocked) => {
        this.setState({ lockCards: isLocked });
      });

      this.state.hubConnection.on("receiveMessage", (message) => {
        openNotification(message);
      });

      this.state.hubConnection.on("roomNotFound", (roomNotFound) => {
        this.setState({ roomNotFound: true });
      });
    });
  };

  joinGroup = (name, groupName) => {
    this.setState({ name });

    this.state.hubConnection
      .invoke("JoinGroup", groupName, name)
      .catch((err) => console.error("Unable to join group!"));
  };

  createGroup = (name, selectedCards) => {
    this.setState({ name });

    const numbers = [];
    const chars = [];
    selectedCards.forEach((a) => {
      if (isNaN(a)) {
        chars.push(a);
      } else {
        numbers.push(a);
      }
    });
    const sortedCards = numbers.sort((a, b) => a - b).concat(chars.sort());
    console.log(sortedCards);

    this.state.hubConnection
      .invoke("CreateGroup", name, sortedCards)
      .catch((err) => console.error("Unable to create group!"));
  };

  sendVote = (vote) => {
    this.state.hubConnection
      .invoke("VoteInGroup", this.state.groupName, this.state.name, vote)
      .then(() => this.setState({ lockCards: true }))
      .catch((err) => console.error(err));
  };

  resetVotes = () => {
    this.state.hubConnection.invoke("Reset").catch((err) => console.error(err));
  };

  render() {
    return this.state.connected ? (
      <div className='App'>
        <LoginForm
          handleSubmit={this.joinGroup}
          handleCreateGroupClick={this.createGroup}
          visible={!this.state.groupName}
          roomNotFound={this.state.roomNotFound}
        />

        {this.state.groupName && (
          <>
            <Row className='header' justify='center'>
              <Col flex='1000px'>
                <Row justify='space-between' align='bottom'>
                  <Col flex='300px'>
                    <a href='/'>
                      <img
                        alt="1 3 5 8 13 ... we dropped a two but you don't have to!"
                        src={logo}
                        width='100px'
                        height='93px'
                      />
                    </a>
                  </Col>

                  <Col flex='300px'>
                    {this.state.name && (
                      <Row className='pad-left' style={{ paddingTop: "2em" }}>
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
                          style={{ fontWeight: "bold", lineHeight: "1.8rem" }}>
                          {this.state.name}
                        </span>
                      </Row>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row justify='center'>
              {this.state.cards && !this.state.showResults && (
                <Col flex='700px' style={{ textAlign: "center" }}>
                  {this.state.cards.map((cardName) => (
                    <Button
                      className='btn-card'
                      disabled={this.state.lockCards}
                      key={cardName}
                      onClick={() => this.sendVote(cardName)}>
                      {cardName}
                    </Button>
                  ))}
                </Col>
              )}

              {this.state.showResults && this.state.results && (
                <Col flex='700px'>
                  <Results
                    results={this.state.results}
                    resetHandler={this.resetVotes}
                  />
                </Col>
              )}

              {this.state.groupName && this.state.connectedUsers && (
                <Col flex='300px'>
                  <Room
                    connectedUsers={this.state.connectedUsers}
                    showVotes={this.state.showVotes}
                    roomNumber={this.state.groupName}
                  />

                  {this.state.groupName && (
                    <Card
                      title={`Join Room ${this.state.groupName}`}
                      style={{ marginTop: "2rem" }}>
                      <Row justify='center'>
                        <QRcode
                          value={`https://www.135813.com/${this.state.groupName.replace(
                            /\s/g,
                            ""
                          )}`}
                        />
                      </Row>
                      <Row>
                        <Input
                          defaultValue={`https://www.135813.com/${this.state.groupName.replace(
                            /\s/g,
                            ""
                          )}`}
                        />
                      </Row>
                    </Card>
                  )}
                </Col>
              )}
            </Row>

            <Row className='footer' justify='center'>
              <Col flex='1000px'>
                <Row justify='space-between' align='top'>
                  <Col flex='300px'>
                    <Row>
                      <Title level={4}>About</Title>
                      <ul>
                        <li>
                          <a
                            href='https://www.eleven-eleven.co.uk'
                            target='_new'>
                            Eleven Eleven
                          </a>
                        </li>
                        <li>
                          <a
                            href='https://www.eleven-eleven.co.uk'
                            target='_new'>
                            Email Us
                          </a>
                        </li>
                      </ul>
                    </Row>

                    <Row>
                      <Title level={4}>Our Sites</Title>
                      <ul>
                        <li>
                          <a
                            href='https://www.eleven-eleven.co.uk'
                            target='_new'>
                            Super Stats
                          </a>
                        </li>
                        <li>
                          <a
                            href='https://www.eleven-eleven.co.uk'
                            target='_new'>
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
                        We believe there are pockets of the internet that can
                        still be great. That's why this site has:
                      </p>
                      <ul>
                        <li>No ads</li>
                        <li>No social media</li>
                        <li>No tracking</li>
                        <li>No analytics</li>
                        <li>No sponsored posts</li>
                        <li>No affiliate links</li>
                      </ul>
                      <p>
                        If you like what we do and would like to support me, you
                        can do so below!
                      </p>
                      <Button type='primary' icon={<CoffeeOutlined />}>
                        Buy me a coffee
                      </Button>
                    </Row>
                  </Col>

                  <Col flex='300px'>
                    <Title level={4}>Custom Software Development</Title>
                    <p>Eleven Eleven</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        )}
      </div>
    ) : (
      <div>Connecting ...</div>
    );
  }
}

export default App;
