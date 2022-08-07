import React from "react";
import "./bootstrap.min.css";

class EmotionTable extends React.Component {
  render() {
    //Returns the emotions as an HTML table
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">SN.</th>
              <th scope="col">Emotion</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {
              /*Write code to use the .map method that you worked on in the 
              Hands-on React lab to extract the emotions. If you are stuck,
              please click the instructions to see how to implement a map*/
              Object.entries(this.props.emotions).map((emotion, idx) => {
                return (
                  <tr key={idx}>
                    <th scope="row">{idx}</th>
                    <td>{emotion[0]}</td>
                    <td>{emotion[1]}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
export default EmotionTable;
