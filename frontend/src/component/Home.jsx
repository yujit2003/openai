import React from 'react'
import './utils/home.css';

const Home = () => {
  return (
    <>
        <div className="home_container">
            <div className="home_box">
                <div className="home_box_details">
                    <div className="home_box_1">
                        <div className="home_box_1_testcase">
                            <h6>TEST CASE ID</h6>
                            <input type='text' className = "testcase" />
                        </div>
                        <div className="home_box_1_title">
                            <h6>TITLE</h6>
                            <input type="text" className = "title"/>
                        </div>
                    </div>
                    <div className="home_box_1">
                        <div className="home_box_1_steps">
                                <h6>STEPS</h6>
                                <textarea type='text'  />
                        </div>
                        <div className="home_box_1_notes">
                                <h6>NOTES</h6>
                                <textarea type="text" />
                        </div>
                    </div>
                    <div className="home_box_3">
                        <div className="home_box_1_result">
                                <h6>RESULT</h6>
                                <textarea type='text'  />
                        </div>
                    </div>
                    <div className="home_button">
                        <button className="button-1">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home
