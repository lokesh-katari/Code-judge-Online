import React from "react";
import axios from "axios";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Editor from "@monaco-editor/react";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
const Home = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);

  let encodedCode = JSON.stringify(code.replace(/\r\n/g, "\n"));
  console.log(encodedCode);
  // const regex = /(['"])(.*?)(\\r|\\n)/g;

  // let replacedString = encodedCode.replace(regex, "$1$2\\\\\\n");
  // replacedString = replacedString.replace(/\\\\n/g, "\n");
  let replacedString = encodedCode.replace(/\\\\n/g, "\\\\\\\\n");
  console.log(replacedString);
  const [language, setLanguage] = useState("");
  const runCode = async (e) => {
    e.preventDefault();
    // console.log(encodedCode);
    // let eCode = `\'${encodedCode}\'`;
    // console.log(eCode);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/compile",
        { code: replacedString, language },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOutput(JSON.stringify(data.output.replace(/\r\n/g, "\n")));
      console.log(data.output);
    } catch (error) {
      console.error(error);
    }
  };
  const myString = "This is a string\nwith a newline\ncharacter.";

  // Replace \n with actual new lines
  const stringWithNewLines = output.replace(/\\n/g, "\n");
  return (
    <>
      <div className="mt-24">
        <select
          class="w-25 m-3"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Default select example"
        >
          <option>Open this select menu</option>
          <option value="javascript">javascript</option>
          <option value="python">python</option>
          <option value="cpp">cpp</option>
        </select>

        <div class=" vh-100 mx-3">
          <Editor
            height="70vh"
            width="60vw"
            theme="vs-dark"
            language={language}
            onChange={(e) => setCode(e)}
            value={code}
          />
          <div className="m-lg">
            <button
              className="mx-2 btn btn-primary"
              type="button"
              onClick={runCode}
            >
              Run
            </button>
            <button type="button" class="btn btn-primary">
              Submit
            </button>
          </div>

          <SyntaxHighlighter language="plaintext" style={vscDarkPlus}>
            {output}
          </SyntaxHighlighter>
        </div>
      </div>
      <div>
        {myString}
        {/* Display the string with new lines */}
        <pre>{}</pre>
      </div>
    </>
  );
};

export default Home;
