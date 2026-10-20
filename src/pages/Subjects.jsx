import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronDown,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

function Subjects() {
  const {
    subjects,
    updateSubjectProgress,
  } = useStudy();

  const [openSubject, setOpenSubject] =
    useState("network");

  const getPercentage = (subject) => {
    if (!subject.totalLectures) {
      return 0;
    }

    return Math.round(
      (subject.completedLectures /
        subject.totalLectures) *
        100
    );
  };

  const handleProgressChange = (
    subjectId,
    value
  ) => {
    updateSubjectProgress(
      subjectId,
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
          Subjects
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
          Your complete GATE ECE subject-wise
          preparation progress.
        </p>
      </section>


      {/* =====================================
          CURRENT FOCUS
      ===================================== */}

      <section className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20">
            <BookOpen
              size={24}
              className="text-violet-300"
            />
          </div>

          <div>

            <p className="text-xs uppercase tracking-widest text-violet-400">
              Current Focus
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Network Theory
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              43/61 was your starting progress.
              Keep updating it from the Lectures page.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          SUBJECT LIST
      ===================================== */}

      <section className="space-y-3">

        {subjects.map((subject) => {

          const percentage =
            getPercentage(subject);

          const isOpen =
            openSubject === subject.id;

          const remaining =
            Math.max(
              0,
              subject.totalLectures -
                subject.completedLectures
            );

          return (

            <div
              key={subject.id}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40"
            >

              {/* SUBJECT ROW */}

              <button
                onClick={() =>
                  setOpenSubject(
                    isOpen
                      ? null
                      : subject.id
                  )
                }
                className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-zinc-900"
              >

                {/* SUBJECT ICON */}

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-xs font-bold text-violet-300">
                  {subject.shortName}
                </div>


                {/* SUBJECT NAME */}

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="font-semibold">
                      {subject.name}
                    </h3>

                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                        subject.status ===
                        "Completed"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : subject.status ===
                            "In Progress"
                          ? "bg-violet-500/10 text-violet-300"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {subject.status}
                    </span>

                  </div>

                  <p className="mt-1 text-xs text-zinc-600">

                    {subject.totalLectures > 0
                      ? `${subject.completedLectures}/${subject.totalLectures} lectures`
                      : "Lecture count not added yet"}

                  </p>

                </div>


                {/* DESKTOP PROGRESS */}

                <div className="hidden w-40 sm:block">

                  <div className="mb-2 flex justify-between text-xs">

                    <span className="text-zinc-600">
                      Progress
                    </span>

                    <span className="text-zinc-400">
                      {percentage}%
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

                    <div
                      className="h-full rounded-full bg-violet-500 transition-all"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>


                {/* CHEVRON */}

                <ChevronDown
                  size={18}
                  className={`shrink-0 text-zinc-600 transition-transform ${
                    isOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>


              {/* =====================================
                  EXPANDED SECTION
              ===================================== */}

              {isOpen && (

                <div className="border-t border-zinc-800 p-5">

                  {subject.totalLectures > 0 ? (

                    <div className="space-y-5">

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-sm font-semibold">
                            Lecture Progress
                          </p>

                          <p className="mt-1 text-xs text-zinc-600">
                            This is shared with your
                            Lecture Tracker.
                          </p>

                        </div>

                        {percentage === 100 && (

                          <CheckCircle2
                            size={22}
                            className="text-emerald-400"
                          />

                        )}

                      </div>


                      {/* PROGRESS INPUT */}

                      <div className="flex items-center gap-4">

                        <input
                          type="number"
                          min="0"
                          max={
                            subject.totalLectures
                          }
                          value={
                            subject.completedLectures
                          }
                          onChange={(e) =>
                            handleProgressChange(
                              subject.id,
                              e.target.value
                            )
                          }
                          className="w-28 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-center text-white outline-none focus:border-violet-500"
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


                      {/* PROGRESS BAR */}

                      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

                        <div
                          className="h-full rounded-full bg-violet-500 transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>


                      {/* REMAINING */}

                      <div className="flex justify-between text-xs">

                        <span className="text-emerald-400">
                          {subject.completedLectures} completed
                        </span>

                        <span className="text-zinc-500">
                          {remaining} remaining
                        </span>

                      </div>

                    </div>

                  ) : (

                    <div className="rounded-xl border border-dashed border-zinc-800 p-6 text-center">

                      <Circle
                        size={24}
                        className="mx-auto text-zinc-700"
                      />

                      <p className="mt-3 text-sm text-zinc-500">
                        No lecture count added yet.
                      </p>

                      <p className="mt-1 text-xs text-zinc-600">
                        We'll add the actual lecture
                        count when you start this subject.
                      </p>

                    </div>

                  )}

                </div>

              )}

            </div>

          );
        })}

      </section>


      {/* =====================================
          GATE PREPARATION NOTE
      ===================================== */}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">

        <p className="text-xs uppercase tracking-widest text-violet-400">
          Preparation Strategy
        </p>

        <h2 className="mt-1 text-xl font-bold">
          One source of truth
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
          Your lecture progress is now stored centrally.
          Updating a subject from the Lecture Tracker or
          Subjects page updates the same GATE preparation
          data used by the rest of your dashboard.
        </p>

      </section>

    </div>
  );
}

export default Subjects;