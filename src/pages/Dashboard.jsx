import React from "react";
import {
  BookOpen,
  Flame,
  Clock3,
  Target,
  FileQuestion,
  RotateCcw,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStudy } from "../context/StudyContext";

function Dashboard() {
  const navigate = useNavigate();

  const {
    subjects,
    lectureStats,
    todaySeconds,
    streak,
    pyqs,
    pyqPercentage,
    revisions,
    revisionPercentage,
    goal,
  } = useStudy();

  const formatTime = (seconds) => {
    const hours = Math.floor(
      seconds / 3600
    );

    const minutes = Math.floor(
      (seconds % 3600) / 60
    );

    if (hours === 0) {
      return `${minutes}m`;
    }

    return `${hours}h ${minutes}m`;
  };

  const network = subjects.find(
    (subject) =>
      subject.id === "network"
  );

  return (
    <div className="space-y-8 pb-10">

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            GATE 2027
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Preparation Command Center
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Your GATE ECE preparation at a glance.
          </p>

        </div>


        <div className="w-fit rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-4">

          <div className="flex items-center gap-2">

            <Target
              size={16}
              className="text-violet-400"
            />

            <p className="text-xs text-zinc-500">
              Target
            </p>

          </div>

          <p className="mt-1 text-xl font-bold">
            {goal.targetMarks}+ Marks
          </p>

        </div>

      </section>


      {/* =====================================
          MAIN STATS
      ===================================== */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* LECTURES */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <div className="flex items-start justify-between">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">

              <BookOpen
                size={19}
                className="text-violet-400"
              />

            </div>

            <span className="text-xs text-zinc-600">
              {lectureStats.percentage}%
            </span>

          </div>

          <p className="mt-5 text-sm text-zinc-500">
            Lecture Progress
          </p>

          <p className="mt-1 text-2xl font-bold">
            {lectureStats.completed}
            <span className="text-base font-normal text-zinc-600">
              /{lectureStats.total}
            </span>
          </p>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-800">

            <div
              className="h-full rounded-full bg-violet-500 transition-all"
              style={{
                width: `${lectureStats.percentage}%`,
              }}
            />

          </div>

        </div>


        {/* STREAK */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">

            <Flame
              size={19}
              className="text-orange-400"
            />

          </div>

          <p className="mt-5 text-sm text-zinc-500">
            Study Streak
          </p>

          <p className="mt-1 text-2xl font-bold">
            {streak}
            <span className="ml-1 text-base font-normal text-zinc-600">
              days
            </span>
          </p>

          <p className="mt-2 text-xs text-zinc-600">
            Keep the streak alive
          </p>

        </div>


        {/* FOCUS */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">

            <Clock3
              size={19}
              className="text-blue-400"
            />

          </div>

          <p className="mt-5 text-sm text-zinc-500">
            Today's Focus
          </p>

          <p className="mt-1 text-2xl font-bold">
            {formatTime(todaySeconds)}
          </p>

          <p className="mt-2 text-xs text-zinc-600">
            Focused study time
          </p>

        </div>


        {/* TARGET */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">

            <Target
              size={19}
              className="text-emerald-400"
            />

          </div>

          <p className="mt-5 text-sm text-zinc-500">
            Today's Target
          </p>

          <p className="mt-1 text-2xl font-bold">
            6–7h
          </p>

          <p className="mt-2 text-xs text-zinc-600">
            Focused study
          </p>

        </div>

      </section>


      {/* =====================================
          NETWORK THEORY
      ===================================== */}

      {network && (

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                Current Subject
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Network Theory
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Your current lecture progress
              </p>

            </div>


            <button
              onClick={() =>
                navigate("/lectures")
              }
              className="flex w-fit items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
            >
              Update Progress
              <ArrowRight size={15} />
            </button>

          </div>


          <div className="mt-7 grid gap-6 sm:grid-cols-3">

            {/* COMPLETED */}

            <div>

              <p className="text-xs text-zinc-600">
                Completed
              </p>

              <p className="mt-1 text-2xl font-bold">
                {network.completedLectures}
                <span className="text-sm font-normal text-zinc-600">
                  /{network.totalLectures}
                </span>
              </p>

            </div>


            {/* REMAINING */}

            <div>

              <p className="text-xs text-zinc-600">
                Remaining
              </p>

              <p className="mt-1 text-2xl font-bold">
                {Math.max(
                  0,
                  network.totalLectures -
                    network.completedLectures
                )}
              </p>

            </div>


            {/* STATUS */}

            <div>

              <p className="text-xs text-zinc-600">
                Status
              </p>

              <p className="mt-1 text-sm font-semibold text-violet-300">
                {network.status}
              </p>

            </div>

          </div>


          <div className="mt-6">

            <div className="mb-2 flex items-center justify-between text-xs">

              <span className="text-zinc-500">
                Progress
              </span>

              <span className="font-semibold text-zinc-300">
                {network.totalLectures > 0
                  ? Math.round(
                      (network.completedLectures /
                        network.totalLectures) *
                        100
                    )
                  : 0}
                %
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

              <div
                className="h-full rounded-full bg-violet-500 transition-all"
                style={{
                  width: `${
                    network.totalLectures > 0
                      ? Math.min(
                          100,
                          (network.completedLectures /
                            network.totalLectures) *
                            100
                        )
                      : 0
                  }%`,
                }}
              />

            </div>

          </div>

        </section>

      )}


      {/* =====================================
          PYQ + REVISION
      ===================================== */}

      <section className="grid gap-4 lg:grid-cols-2">

        {/* PYQS */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">

                <FileQuestion
                  size={18}
                  className="text-blue-400"
                />

              </div>

              <div>

                <p className="text-xs uppercase tracking-widest text-blue-400">
                  Practice
                </p>

                <h2 className="mt-1 font-bold">
                  PYQ Progress
                </h2>

              </div>

            </div>

            <span className="text-lg font-bold">
              {pyqPercentage}%
            </span>

          </div>


          <div className="mt-6 flex items-end justify-between">

            <p className="text-3xl font-bold">
              {pyqs.completed}
              <span className="text-base font-normal text-zinc-600">
                /{pyqs.total}
              </span>
            </p>

            <p className="text-xs text-zinc-600">
              questions
            </p>

          </div>


          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">

            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{
                width: `${pyqPercentage}%`,
              }}
            />

          </div>

        </div>


        {/* REVISION */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">

                <RotateCcw
                  size={18}
                  className="text-emerald-400"
                />

              </div>

              <div>

                <p className="text-xs uppercase tracking-widest text-emerald-400">
                  Revision
                </p>

                <h2 className="mt-1 font-bold">
                  Revision Progress
                </h2>

              </div>

            </div>

            <span className="text-lg font-bold">
              {revisionPercentage}%
            </span>

          </div>


          <div className="mt-6 flex items-end justify-between">

            <p className="text-3xl font-bold">
              {revisions.completed}
              <span className="text-base font-normal text-zinc-600">
                /{revisions.total}
              </span>
            </p>

            <p className="text-xs text-zinc-600">
              rounds
            </p>

          </div>


          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">

            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{
                width: `${revisionPercentage}%`,
              }}
            />

          </div>

        </div>

      </section>


      {/* =====================================
          SUBJECT OVERVIEW
      ===================================== */}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
              GATE ECE
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Subject Overview
            </h2>

          </div>

          <span className="text-xs text-zinc-600">
            {subjects.length} Subjects
          </span>

        </div>


        <div className="mt-6 divide-y divide-zinc-800">

          {subjects.map((subject) => {

            const percentage =
              subject.totalLectures > 0
                ? Math.round(
                    (subject.completedLectures /
                      subject.totalLectures) *
                      100
                  )
                : 0;

            return (

              <div
                key={subject.id}
                className="py-4 first:pt-0 last:pb-0"
              >

                <div className="flex items-center justify-between gap-4">

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold">
                      {subject.name}
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      {subject.totalLectures > 0
                        ? `${subject.completedLectures}/${subject.totalLectures} lectures`
                        : "Not started"}
                    </p>

                  </div>


                  <span className="shrink-0 text-xs font-semibold text-zinc-500">
                    {percentage}%
                  </span>

                </div>


                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800">

                  <div
                    className="h-full rounded-full bg-violet-500 transition-all"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>

            );
          })}

        </div>

      </section>


      {/* =====================================
          MOTIVATION
      ===================================== */}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">

        <div className="flex items-start gap-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10">

            <Trophy
              size={19}
              className="text-yellow-400"
            />

          </div>

          <div>

            <h2 className="font-semibold">
              Keep building your preparation.
            </h2>

            <p className="mt-1 text-sm leading-6 text-zinc-500">
              Every lecture, PYQ, revision and mock
              brings you closer to your 55+ target.
              Focus on consistency rather than trying
              to finish everything at once.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;