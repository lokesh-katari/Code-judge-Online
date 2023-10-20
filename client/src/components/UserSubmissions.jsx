import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
const UserSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const { data } = await axios.get(`/api/v1/user/submissions`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSubmissions(data.data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchSubmissions();
  }, []);
  return (
    <>
      <section className="mx-auto w-full   mt-5 max-w-3xl">
        <div>
          <h2 className="text-xl font-semibold pl-1 "> Submissions :</h2>
        </div>

        <div className="mt-2 flex flex-col border-slate-950 border-solid border-4 rounded-md">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-bold text-gray-700 "
                      >
                        <span>Title</span>
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3.5 text-left text-sm font-bold text-gray-700"
                      >
                        Execution Time
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-bold text-gray-700"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-bold text-gray-700"
                      >
                        Language
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-bold text-gray-700"
                      >
                        Time
                      </th>
                    </tr>
                  </thead>
                  {loading ? (
                    <>
                      <td colspan="5">
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
                          <p className="mt-2">loading....</p>
                        </Box>
                      </td>
                    </>
                  ) : (
                    <>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {submissions.map((submission) => (
                          <tr key={submission.result._id}>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="flex items-center">
                                <div className="">
                                  <div className="text-sm font-medium text-gray-900">
                                    <Link to={`${submission.result.P_id}`}>
                                      {submission.result.title}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-5 py-4 ">
                              <div className="text-sm text-gray-700  ">
                                {submission.result.executionTime}
                                <span className="font-semibold"> ms</span>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-5 py-4">
                              <div
                                className={`text-sm font-semibold ${
                                  submission.result.answer === "Correct"
                                    ? "text-green-600"
                                    : " text-red-600"
                                }  `}
                              >
                                {submission.result.answer}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-5 py-4">
                              <div className="text-sm text-gray-700  ">
                                {submission.result.language}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                              {new Date(
                                submission.result.SubmittedAt
                              ).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserSubmissions;
