import React, { useState, useEffect } from "react";
import axios from "axios";

function TestCasesPassed({ testcasespassed, mode, id, diff }) {
  const updateUserSubmissions = async (id, diff) => {
    if (testcasespassed.length === 5) {
      await axios.post("/api/v1/user/updatesubmission", {
        P_id: id,
        difficultyLevel: diff,
      });
    }
  };

  let totalTestCases;
  let result = "WRONG ANSWER";
  mode === "RUN" ? (totalTestCases = 2) : (totalTestCases = 5);
  if (testcasespassed.length === 2) {
    result = "CORRECT ANSWER";
  }
  if (testcasespassed.length === 5) {
    result = "CORRECT ANSWER";
    updateUserSubmissions(id, diff);
  }
  if (mode === "IDLE") {
    totalTestCases = 5;
  }

  // const [testcasespassed, setTestCasesPassed] = useState(testcasespass); // Example array of passed test case indexes
  useEffect(() => {
    // Update the results based on testcasespassed
    const resultDivs = document.querySelectorAll("#result");
    if (mode === "IDLE") {
      resultDivs.forEach((resultDiv, index) => {
        const testCaseNumber = index + 1;
        let lockSymbol = "<span>&#128274;</span>";
        resultDiv.innerHTML = `Test Case ${testCaseNumber}: ${lockSymbol}`;
        // Apply a class for styling
      });
    } else {
      resultDivs.forEach((resultDiv, index) => {
        const testCaseNumber = index + 1;
        if (testcasespassed.includes(index)) {
          resultDiv.textContent = `Test Case ${testCaseNumber}: Passed`;
          resultDiv.classList.add("passed"); // Apply a class for styling
        } else {
          resultDiv.textContent = `Test Case ${testCaseNumber}: Failed`;
          resultDiv.classList.add("failed"); // Apply a class for styling
        }
      });
    }
  }, [testcasespassed]);

  return (
    <>
      {Array.from({ length: totalTestCases }, (_, index) => (
        <div
          key={index}
          id="result"
          className="w-full h-9 p-2 rounded-md m-1 mb-2 flex justify-between "
          style={{ backgroundColor: "rgba(60, 64, 60)" }}
        >
          {/* The content will be updated dynamically */}
        </div>
      ))}
      {mode === "IDLE" || mode === "SUBMIT" ? (
        ""
      ) : (
        <div className="mt-8">
          <p
            className={
              result === "CORRECT ANSWER"
                ? "bg-green-700 rounded-md p-1"
                : "bg-red-700 rounded-md p-1"
            }
          >
            {result}
          </p>
        </div>
      )}
    </>
  );
}

export default TestCasesPassed;
