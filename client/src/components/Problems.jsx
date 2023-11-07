import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export function Problems() {
  const [problems, setproblems] = useState([]);
  const [loading, setloading] = useState(true);
  let Acceptance;
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/api/v1/allProblems");
        setloading(false);

        setproblems(data.problems);
        console.log("from axios", data.problems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  console.log(problems);
  return (
    <>
      {loading ? (
        <>
          <Box
            sx={{
              display: "flex",

              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "100vw",
              margin: "auto",
            }}
          >
            <CircularProgress />
          </Box>
        </>
      ) : (
        <>
          <>
            <section className="mx-auto w-full max-w-7xl px-4 py-4 mt-28 min-h-screen">
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                  <h2 className="text-lg font-semibold">Problems</h2>
                  <p className="mt-1 text-sm text-gray-700">
                    these are the coding problems
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  ></button>
                </div>
              </div>
              <div className="mt-6 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                            >
                              <span>Title</span>
                            </th>
                            <th
                              scope="col"
                              className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                            >
                              Acceptance
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                            >
                              Difficulty
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                            >
                              Category
                            </th>
                            <th scope="col" className="relative px-4 py-3.5">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {problems.map((problem) => {
                            Acceptance =
                              (problem.Submissions.Correct /
                                (problem.Submissions.Correct +
                                  problem.Submissions.Wrong)) *
                              100;

                            return (
                              <>
                                <tr key={problem._id}>
                                  <td className="whitespace-nowrap px-4 py-4">
                                    <div className="flex items-center">
                                      <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                          <Link to={`${problem._id}`}>
                                            {problem.ProblemTitle}
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-12 py-4">
                                    <div className="text-base text-gray-700 font-semibold  ">
                                      {Acceptance.toFixed(2)}%
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4">
                                    <span
                                      className={`inline-flex  rounded-full  px-2 text-xs font-semibold leading-5 text-black`}
                                    >
                                      {problem.DifficultyLevel}
                                    </span>
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                    {problem.Category}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        </>
      )}
    </>
  );
}
