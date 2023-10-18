import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
const UserSubmissions = () => {
  return (
    <>
      <section className="mx-auto w-full   mt-5 max-w-3xl">
        {/* <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"> */}
        <div>
          <h2 className="text-lg font-semibold pl-1"> Submissions</h2>
        </div>
        {/* </div> */}
        <div className="mt-4 flex flex-col border-slate-950 border-solid border-4 rounded-md">
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
                        Submit Time
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Language
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {/* {problems.map((problem) => (
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
                                <div className="text-sm text-gray-700  ">
                                  Nill
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-4 py-4">
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                  {problem.Difficulty}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {problem.Category}
                              </td>
                            </tr>
                          ))} */}
                  </tbody>
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
