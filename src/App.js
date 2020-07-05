import React, { Component } from "react";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { Results } from "./components/Results";
import { Room } from "./components/Room";
import { HubConnectionBuilder } from "@microsoft/signalr";

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
        console.log(message);
      });
    });
  };

  joinGroup = (name, groupName) => {
    this.state.hubConnection
      .invoke("JoinGroup", groupName, name)
      .catch((err) => console.error("Unable to join group!"));
    this.setState({ name, groupName });
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
        {!this.state.groupName && <LoginForm handleSubmit={this.joinGroup} />}

        {this.state.groupName && <h1>Room - {this.state.groupName}</h1>}

        {this.state.name && <span>{this.state.name}</span>}

        {this.state.cards &&
          this.state.cards.map((cardName) => (
            <button
              disabled={this.state.lockCards}
              key={cardName}
              onClick={() => this.sendVote(cardName)}>
              {cardName}
            </button>
          ))}

        {this.state.showResults && this.state.results && (
          <>
            <Results results={this.state.results} />
            <button onClick={() => this.resetVotes()}>Reset</button>
          </>
        )}

        {this.state.groupName && this.state.connectedUsers && (
          <Room
            connectedUsers={this.state.connectedUsers}
            showVotes={this.state.showVotes}
          />
        )}
      </div>
    ) : (
      <div>Connecting ...</div>
    );
  }
}

export default App;
