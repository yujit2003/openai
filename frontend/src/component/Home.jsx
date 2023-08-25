import React, { useState } from "react";
import "./utils/home.css";

const Home = () => {
  const [tcase, setTcase] = useState(0);
  const [title, setTitle] = useState("Title");
  const [steps, setSteps] = useState("");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("");


  const handleForm = (e) => {
    alert(tcase+" "+title+" "+steps+" "+notes+" "+result)

    setTcase(1+tcase);
    setTitle("");
    setSteps("");
    setNotes("");
    setResult("");
    
}

  return (
    <>
      <div className="home_container">
        <div className="home_box">
          <div className="home_box_details">
            <div className="home_title">
              <h1>Prompt to Code Generator</h1>
            </div>
            <div className="home_box_1">
              <div className="home_box_1_testcase">
                <h6>TEST CASE ID</h6>
                <input
                  type="text"
                  className="testcase"
                  onChange={(e) => setTcase(e.target.value)}
                  value={tcase}
                />
              </div>
              <div className="home_box_1_title">
                <h6>TITLE</h6>
                <input
                  type="text"
                  className="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
            </div>
            <div className="home_box_1">
              <div className="home_box_1_steps">
                <h6>STEPS</h6>
                <textarea type="text" value={steps} onChange={(e) => setSteps(e.target.value)}/>
              </div>
              <div className="home_box_1_notes">
                <h6>NOTES</h6>
                <textarea type="text" value={notes} onChange={(e) => setNotes(e.target.value)}/>
              </div>
            </div>
            <div className="home_box_3">
              <div className="home_box_1_result">
                <h6>RESULT</h6>
                <textarea type="text" value={result} onChange={(e) => setResult(e.target.value)}/>
              </div>
            </div>
            <div className="home_button">
              <button className="button-1" onClick={handleForm}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
