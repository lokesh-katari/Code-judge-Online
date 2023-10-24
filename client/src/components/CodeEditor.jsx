import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Aos from "aos";
import "aos/dist/aos.css";

import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { compileCode } from "../features/Codes/codeSlice";
const CodeEditor = () => {
  let loading = useSelector((state) => state.codeSlice.loading);
  const output = useSelector((state) => state.codeSlice.output);
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const runCode = async (e) => {
    e.preventDefault();
    try {
      let encodedCode = JSON.stringify(code.replace(/\r\n/g, "\n"));
      let replacedString = encodedCode.replace(/\\\\n|\\\\r/g, (match) => {
        if (match === "\\\\n") return "\\\\\\\\n";
        if (match === "\\\\r") return "\\\\\\\\r";
      });
      await dispatch(
        compileCode({ code: replacedString, language, isOnlineCompiler: true })
      );

      // setOutput(output.replace(/\\n|\\r\\n|<br>/g, "\n"));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <h1
        className="text-8xl text-slate-900 mt-20 text-center  animate__animated animate__slideInLeft  "
        style={{
          fontFamily: "Anek Bangla, sans-serif",
          letterSpacing: "1px",
        }}
        id="compiler"
      >
        Online compiler
      </h1>

      <div
        className="m-1 flex flex-row  mt-1 h-3/4 px-10 p-9"
        data-aos="zoom-in-right"
      >
        <div>
          <div className="">
            Language:
            <select
              class="w-25 mb-1 px-3 py-2 mt-2"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Default select example"
            >
              <option value="javascript">javascript</option>
              <option value="python">python</option>
              <option value="cpp">cpp</option>
            </select>
            <Editor
              className=""
              height="60vh"
              width="50vw"
              theme="vs-dark"
              defaultLanguage="javascript"
              language={language}
              onChange={(e) => setCode(e)}
              value={code}
            />
            <div className="m-auto">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-auto"
                type="button"
                onClick={runCode}
              >
                Run
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 pl-2 pt-9 p-1" data-aos="zoom-in-left">
          <div
            class=" text-white p-4 rounded-md  w-full mt-4 "
            style={{
              backgroundColor: "rgba(30,30,30)",
              overflow: "auto",
              height: "90%",
            }}
          >
            <span class="text-blue-400" style={{ color: "rgb(229, 229, 229)" }}>
              {!loading ? (
                <>
                  <p
                    className="font-mono "
                    style={{ color: "rgb(9, 186, 30)" }}
                  >
                    ~ Welcome to Online code judge...
                  </p>
                  <pre className="font-mono">{output}</pre>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  <CircularProgress />
                  <p className="mt-2">submition queued....</p>
                </Box>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
