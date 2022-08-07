import "./bootstrap.min.css";
import "./App.css";
import EmotionTable from "./EmotionTable.js";
import React from "react";
import Header from "./Header.jsx";
class App extends React.Component {
  /*
  We are setting the component as a state named innercomp.
  When this state is accessed, the HTML that is set as the 
  value of the state, will be returned. The initial input mode
  is set to text
  */
  state = {
    innercomp: (
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="3"
          id="textinput"
          placeholder="Enter lyrics of a song"
        />
        ,
      </div>
    ),
    mode: "text",
    sentimentOutput: [],
    sentiment: true,
  };

  /*
  This method returns the component based on what the input mode is.
  If the requested input mode is "text" it returns a textbox with 4 rows.
  If the requested input mode is "url" it returns a textbox with 1 row.
  */

  renderOutput = (input_mode) => {
    let rows = 1;
    let mode = "url";
    let placeholder = "Enter an url ";
    //If the input mode is text make it 4 lines
    if (input_mode === "text") {
      mode = "text";
      rows = 4;
      placeholder = "Enter lyrics of a song";
    }
    this.setState({
      innercomp: (
        <div className="mb-3">
          <textarea
            className="form-control"
            rows={rows}
            id="textinput"
            placeholder={placeholder}
          />
          ,
        </div>
      ),
      mode: mode,
      sentimentOutput: [],
      sentiment: true,
    });
  };

  sendForSentimentAnalysis = () => {
    this.setState({ sentiment: true });
    let url = ".";
    let mode = this.state.mode;
    url =
      url +
      "/" +
      mode +
      "/sentiment?" +
      mode +
      "=" +
      document.getElementById("textinput").value;

    fetch(url).then((response) => {
      response.json().then((data) => {
        this.setState({ sentimentOutput: data.label });
        let output = data.label;
        let color = "white alert p-5 rounded";
        switch (output) {
          case "positive":
            color = "alert-success";
            break;
          case "negative":
            color = "alert-danger";
            break;
          default:
            color = "black";
        }
        output = (
          <div className={color} role="alert">
            <span className="uppercase p-4"> The result was: {output}</span>
          </div>
        );
        this.setState({ sentimentOutput: output });
      });
    });
  };

  sendForEmotionAnalysis = () => {
    this.setState({ sentiment: false });
    let url = ".";
    let mode = this.state.mode;
    url =
      url +
      "/" +
      mode +
      "/emotion?" +
      mode +
      "=" +
      document.getElementById("textinput").value;

    fetch(url).then((response) => {
      response.json().then((data) => {
        this.setState({ sentimentOutput: <EmotionTable emotions={data} /> });
      });
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="App p-5 mb-4 bg-light rounded-3 shadow container-md">
          <div className="button-group d-flex justify-content-center align-items-center">
            <span className="align-center">Choose: </span>
            <button
              className="btn btn btn-outline-primary mx-2"
              onClick={() => {
                this.renderOutput("text");
              }}
            >
              Text
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                this.renderOutput("url");
              }}
            >
              URL
            </button>
          </div>

          <br />
          <br />
          {this.state.innercomp}
          <br />

          <div className="button-group d-flex justify-content-center align-items-center">
            <button
              className="btn btn-outline-info mx-1"
              onClick={this.sendForSentimentAnalysis}
            >
              Analyze Sentiment
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.sendForEmotionAnalysis}
            >
              Analyze Emotion
            </button>
          </div>
          <br />
          {this.state.sentimentOutput}
        </div>
      </div>
    );
  }
}

export default App;
