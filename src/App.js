import React, { Component } from "react";
import { LoginForm } from "./components/LoginForm";
import { Results } from "./components/Results";
import { Room } from "./components/Room";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { notification, Row, Col } from "antd";

import "./App.css";
import { SmileOutlined } from "@ant-design/icons";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Cards } from "./components/Cards";

const openNotification = (message, description) => {
  notification.open({
    message,
    description,
    icon: <SmileOutlined style={{ color: "#00b2b2" }} />,
  });
};

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
          visible={!this.state.groupName}
          handleSubmit={this.joinGroup}
          handleCreateGroupClick={this.createGroup}
          roomNotFound={this.state.roomNotFound}
        />

        {this.state.groupName && (
          <>
            <Header name={this.state.name} roomNumber={this.state.groupName} />

            <Row
              className='content'
              justify='center'
              style={{ minHeight: "430px" }}>
              {!this.state.showResults && (
                <Cards
                  cards={this.state.cards}
                  handleOnClick={this.sendVote}
                  disabled={this.state.lockCards}
                />
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
                  <Row style={{ width: "100%" }}>
                    <Room
                      connectedUsers={this.state.connectedUsers}
                      showVotes={this.state.showVotes}
                      roomNumber={this.state.groupName}
                    />
                  </Row>
                </Col>
              )}
            </Row>

            <Footer />
          </>
        )}
      </div>
    ) : (
      <div>Connecting ...</div>
    );
  }
}

export default App;
