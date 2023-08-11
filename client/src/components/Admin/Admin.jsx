import React, { useState } from "react";
import axios from "axios";
const Admin = () => {
  const [inputList, setInputList] = useState([{ id: 0, value: "list" }]);
  const [returnType, setReturnType] = useState("list");
  const [problemTitle, setproblemTitle] = useState("");
  const [problemdesc, setproblemdesc] = useState("");

  const [testCases, setTestCases] = useState([{ id: 0, value: "" }]);

  let code = [
    {
      language: "javascript",
      code: ``,
    },
    {
      language: "python",
      code: ``,
    },
    {
      language: "cpp",
      code: ``,
    },
  ];

  const handleSubmit = async () => {
    console.log(inputList);
    console.log(returnType);
    console.log(testCases);
    console.log(problemTitle);
    console.log(problemdesc);
    await axios.post(
      "http://localhost:5000/api/v1/codeQueUpload",
      { code, problemTitle },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  // Function to handle adding a new test case
  const handleAddTestCase = () => {
    setTestCases([...testCases, { id: testCases.length, value: "" }]);
  };

  // Function to handle removing a test case
  const handleRemoveTestCase = (id) => {
    const updatedTestCases = testCases.filter((testCase) => testCase.id !== id);
    setTestCases(updatedTestCases);
  };

  // Function to handle adding a new input
  const handleAddInput = () => {
    setInputList([...inputList, { id: inputList.length, value: "" }]);
  };
  const handleRemoveInput = (id) => {
    const updatedInputs = inputList.filter((input) => input.id !== id);
    setInputList(updatedInputs);
  };
  return (
    <>
      <div className="mt-32 flex flex-col justify-center items-center ">
        <div className="w-full md:w-1/3">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="name"
          >
            Problem Title
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="title"
            id="name"
            value={problemTitle}
            onChange={(e) => setproblemTitle(e.target.value)}
          ></input>
        </div>
        <div className="w-full md:w-1/3">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="name"
          >
            Problem Description
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Problem description"
            id="name"
            value={problemdesc}
            onChange={(e) => setproblemdesc(e.target.value)}
          ></input>
        </div>
        <div className="flex  w-screen justify-center  ">
          <div>
            {inputList.map((input, index) => (
              <div key={input.id}>
                <select
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  value={input.value}
                  onChange={(e) => {
                    const updatedInputs = [...inputList];
                    updatedInputs[index].value = e.target.value;
                    setInputList(updatedInputs);
                  }}
                >
                  {/* Options for the dropdown */}
                  <option value="list">list</option>
                  <option value="list-2">2d-list</option>
                  <option value="string">string</option>
                  <option value="integer"> integer</option>
                  <option value="float">float</option>
                </select>

                {/* Button to remove the input */}
                <button onClick={() => handleRemoveInput(input.id)}>
                  Remove
                </button>
              </div>
            ))}

            {/* Button to add a new input */}

            <button onClick={handleAddInput}>Add input type</button>
          </div>
        </div>
        Specify return type
        <select
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          value={returnType}
          onChange={(e) => {
            setReturnType(e.target.value);
          }}
        >
          {/* Options for the dropdown */}
          <option value="list">list</option>
          <option value="list-2">2d-list</option>
          <option value="string">string</option>
          <option value="integer"> integer</option>
          <option value="float">float</option>
        </select>
        <div>
          {/* Display existing test cases */}
          {testCases.map((testCase, index) => (
            <div key={testCase.id}>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                value={testCase.value}
                onChange={(e) => {
                  const updatedTestCases = [...testCases];
                  updatedTestCases[index].value = e.target.value;
                  setTestCases(updatedTestCases);
                }}
              />
              ;{/* Button to remove the test case */}
              <button onClick={() => handleRemoveTestCase(testCase.id)}>
                Remove
              </button>
            </div>
          ))}

          {/* Button to add a new test case */}
          <button onClick={handleAddTestCase}>Add Test Case</button>
        </div>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default Admin;
