import React, { useState } from "react";
import {
  Check,
  Circle,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

function Lectures() {
  const {
    subjects,
    updateSubjectProgress,
  } = useStudy();

  const [selectedSubject, setSelectedSubject] =
    useState("network");

  const subject = subjects.find(
    (item) => item.id === selectedSubject
  );

  const percentage =
    subject && subject.totalLectures > 0
      ? Math.round(
          (subject.completedLectures /
            subject.totalLectures) *
            100
        )
      : 0;

  const updateCompleted = (value) => {
    if (!subject) return;

    updateSubjectProgress(
      subject.id,
      value
    );
  };

  return (
    <div className="space-y-7 pb-10">

      {/* =====================================
          HEADER
      ===================================== */}

      <section>
        <p className="text-sm font-medium text-violet-400">
          GATE ECE 2027
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Lecture Tracker
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
          Track exactly how many lectures you have
          completed for each subject.
        </p>
      </section>


      {/* =====================================
          SUBJECT SELECTOR
      ===================================== */}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
            <BookOpen
              size={20}
              className="text-violet-400"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-violet-400">
              Select Subject
            </p>

            <p className="text-sm text-zinc-500">
              Choose the subject you want to update.
            </p>
          </div>

        </div>


        <div className="relative mt-5">

          <select
            value={selectedSubject}
            onChange={(e) =>
              setSelectedSubject(
                e.target.value
              )
            }
            className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 pr-10 text-sm text-white outline-none focus:border-violet-500"
          >

            {subjects.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}

          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600"
          />

        </div>

      </section>


      {/* =====================================
          CURRENT SUBJECT PROGRESS
      ===================================== */}

      {subject && (

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-xs uppercase tracking-widest text-violet-400">
                Current Subject
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {subject.name}
              </h2>

              {subject.totalLectures > 0 ? (

                <p className="mt-2 text-sm text-zinc-500">
                  {subject.completedLectures} of{" "}
                  {subject.totalLectures} lectures completed
                </p>

              ) : (

                <p className="mt-2 text-sm text-zinc-500">
                  Lecture count not added yet.
                </p>

              )}

            </div>


            {subject.totalLectures > 0 && (

              <div className="text-right">

                <p className="text-4xl font-bold text-violet-300">
                  {percentage}%
                </p>

                <p className="text-xs text-zinc-600">
                  completed
                </p>

              </div>

            )}

          </div>


          {/* =====================================
              PROGRESS DETAILS
          ===================================== */}

          {subject.totalLectures > 0 && (

            <>

              <div className="mt-7 h-4 overflow-hidden rounded-full bg-zinc-800">

                <div
                  className="h-full rounded-full bg-violet-500 transition-all duration-300"
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>


              <div className="mt-3 flex justify-between text-xs">

                <span className="text-emerald-400">
                  {subject.completedLectures} completed
                </span>

                <span className="text-zinc-500">
                  {Math.max(
                    0,
                    subject.totalLectures -
                      subject.completedLectures
                  )}{" "}
                  remaining
                </span>

              </div>


              {/* =====================================
                  UPDATE PROGRESS
              ===================================== */}

              <div className="mt-7 border-t border-zinc-800 pt-6">

                <p className="text-sm font-semibold">
                  Update lecture progress
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Change this number whenever you finish
                  more lectures.
                </p>


                <div className="mt-4 flex items-center gap-3">

                  <input
                    type="number"
                    min="0"
                    max={subject.totalLectures}
                    value={subject.completedLectures}
                    onChange={(e) =>
                      updateCompleted(
                        e.target.value
                      )
                    }
                    className="w-28 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-center text-lg font-semibold text-white outline-none focus:border-violet-500"
                  />

                  <span className="text-zinc-600">
                    /
                  </span>

                  <span className="text-lg font-semibold">
                    {subject.totalLectures}
                  </span>

                  <span className="text-sm text-zinc-500">
                    lectures
                  </span>

                </div>

              </div>

            </>

          )}

        </section>

      )}


      {/* =====================================
          ALL SUBJECTS
      ===================================== */}

      <section>

        <div className="mb-4">

          <p className="text-xs uppercase tracking-widest text-violet-400">
            Overview
          </p>

          <h2 className="mt-1 text-xl font-bold">
            All Subjects
          </h2>

        </div>


        <div className="grid gap-3 md:grid-cols-2">

          {subjects.map((item) => {

            const progress =
              item.totalLectures > 0
                ? Math.round(
                    (item.completedLectures /
                      item.totalLectures) *
                      100
                  )
                : 0;

            const completed =
              item.totalLectures > 0 &&
              item.completedLectures >=
                item.totalLectures;

            return (

              <button
                key={item.id}
                onClick={() =>
                  setSelectedSubject(
                    item.id
                  )
                }
                className={`rounded-2xl border p-5 text-left transition ${
                  selectedSubject === item.id
                    ? "border-violet-500/40 bg-violet-500/5"
                    : "border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900"
                }`}
              >

                <div className="flex items-center gap-3">

                  {completed ? (

                    <Check
                      size={20}
                      className="text-emerald-400"
                    />

                  ) : item.completedLectures > 0 ? (

                    <Circle
                      size={20}
                      className="text-violet-400"
                    />

                  ) : (

                    <Circle
                      size={20}
                      className="text-zinc-700"
                    />

                  )}


                  <div className="flex-1">

                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">

                      {item.totalLectures > 0
                        ? `${item.completedLectures}/${item.totalLectures} lectures`
                        : "Not started"}

                    </p>

                  </div>


                  <span className="text-sm font-semibold text-zinc-500">
                    {progress}%
                  </span>

                </div>


                <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">

                  <div
                    className="h-full rounded-full bg-violet-500 transition-all"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </button>

            );
          })}

        </div>

      </section>

    </div>
  );
}

export default Lectures;