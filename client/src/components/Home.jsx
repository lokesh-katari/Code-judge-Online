import { useState, useEffect } from "react";
import React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { compileCode, submitCode } from "../features/Codes/codeSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import CircularProgress from "@mui/material/CircularProgress";
import TestCasesPassed from "./TestCasesPassed";
const Home = () => {
  const dispatch = useDispatch();
  const [jscode, setjsCode] = useState("");
  const [pycode, setpyCode] = useState("");
  const [cppcode, setCppCode] = useState("");
  const [code, setCode] = useState("");
  const [template, setTemplate] = useState([]);
  const { id } = useParams();
  let loading = useSelector((state) => state.codeSlice.loading);
  const output = useSelector((state) => state.codeSlice.output);
  const testCasesPassed = useSelector(
    (state) => state.codeSlice.testCasesPassed
  );
  const [language, setLanguage] = useState("javascript");
  const [opcomp, setOpcomp] = useState("IDLE");
  const runCode = async (e) => {
    e.preventDefault();
    try {
      let encodedCode = JSON.stringify(code.replace(/\r\n/g, "\n"));
      let replacedString = encodedCode.replace(/\\\\n|\\\\r/g, (match) => {
        if (match === "\\\\n") return "\\\\\\\\n";
        if (match === "\\\\r") return "\\\\\\\\r";
      });
      await dispatch(compileCode({ code: replacedString, language, id }));
      setOpcomp("RUN");
      // setOutput(output.replace(/\\n|\\r\\n|<br>/g, "\n"));
    } catch (error) {
      console.error(error);
    }
  };
  const submitCodeSolution = async (e) => {
    e.preventDefault();
    try {
      let encodedCode = JSON.stringify(code.replace(/\r\n/g, "\n"));
      let replacedString = encodedCode.replace(/\\\\n|\\\\r/g, (match) => {
        if (match === "\\\\n") return "\\\\\\\\n";
        if (match === "\\\\r") return "\\\\\\\\r";
      });
      await dispatch(submitCode({ code: replacedString, language, id }));
      setOpcomp("SUBMIT");
      // setOutput(output.replace(/\\n|\\r\\n|<br>/g, "\n"));
    } catch (error) {
      console.error(error);
    }
  };
  // Replace \n with actual new lines
  useEffect(() => {
    const getTemplateCode = async ({ problemId }) => {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/problems/${problemId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTemplate(data.problems.template);
      // setCode(data.problems.template[0].codeTemplate);
    };

    getTemplateCode({ problemId: id });
  }, []);
  useEffect(() => {
    for (let index = 0; index < template.length; index++) {
      if (template[index].language === "javascript") {
        setjsCode(template[index].codeTemplate);
      }
      if (template[index].language === "python") {
        setpyCode(template[index].codeTemplate);
      }
      if (template[index].language === "cpp") {
        setCppCode(template[index].codeTemplate);
      }
    }
  }, [setjsCode, setpyCode, setCppCode, template]);

  // const handleLangChange = (e) => {
  //   setLanguage(e.target.value);
  //   if (e.target.value === "javascript") {
  //     setCode(jscode);
  //   }
  //   if (e.target.value === "python") {
  //     setCode(pycode);
  //   }
  //   if (e.target.value === "cpp") {
  //     setCode(cppcode);
  //   }
  // };

  useEffect(() => {
    let tempCode = () => {
      if (language === "javascript") {
        setCode(jscode);
      }
      if (language === "python") {
        setCode(pycode);
      }
      if (language === "cpp") {
        setCode(cppcode);
      }
    };
    tempCode();
  }, [jscode, pycode, cppcode, language]);

  return (
    <>
      <div className="mt-16 h-screen">
        Language:
        <select
          class="w-25 m-3"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Default select example"
        >
          <option value="javascript">javascript</option>
          <option value="python">python</option>
          <option value="cpp">cpp</option>
        </select>
        <div className="m-1 flex flex-row" style={{ height: "70%" }}>
          <div className="">
            <Editor
              className=""
              height="70vh"
              width="60vw"
              theme="vs-dark"
              defaultLanguage="javascript"
              language={language}
              onChange={(e) => setCode(e)}
              value={code}
            />
            <div className="m-lg">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
                type="button"
                onClick={runCode}
              >
                Run
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4 m-3"
                onClick={submitCodeSolution}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="flex flex-col  mr-6" style={{ width: "45vw" }}>
            <div
              class=" text-white p-4 rounded-md w-full ml-2 h-2/4"
              style={{ backgroundColor: "rgba(30,30,30)", overflow: "auto" }}
            >
              <span
                class="text-blue-400"
                style={{ color: "rgb(229, 229, 229)" }}
              >
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
                    <p className="mt-2">COMPILING....</p>
                  </Box>
                )}
              </span>
            </div>
            <div
              className="h-1/2  ml-2 mt-2 w-full text-white p-4 rounded-md font-mono flex justify-center items-center flex-col"
              style={{ backgroundColor: "rgba(30,30,30)" }}
            >
              {opcomp === "RUN" &&
                (loading ? (
                  <>
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
                      <p className="mt-2">Submitting..</p>
                    </Box>
                  </>
                ) : (
                  <TestCasesPassed
                    mode={"RUN"}
                    testcasespassed={testCasesPassed}
                  />
                ))}
              {opcomp === "SUBMIT" && (
                <TestCasesPassed
                  mode={"SUBMIT"}
                  testcasespassed={testCasesPassed}
                />
              )}
              {opcomp === "IDLE" &&
                (loading ? (
                  <>
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
                      <p className="mt-2">RUNNING....</p>
                    </Box>
                  </>
                ) : (
                  <TestCasesPassed
                    mode={"IDLE"}
                    testcasespassed={testCasesPassed}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {}
    </>
  );
};

export default Home;

// console.log(encodedCode);
// const regex = /(['"])(.*?)(\\r|\\n)/g;

// let replacedString = encodedCode.replace(regex, "$1$2\\\\\\n");
// replacedString = replacedString.replace(/\\\\n/g, "\n");
// let replacedString = encodedCode.replace(/\\\\n/g, "\\\\\\\\n");
