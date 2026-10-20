import React, { useMemo, useState } from "react";
import {
  FileQuestion,
  CheckCircle2,
  Circle,
  Target,
  Search,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

function PYQs() {
  const { subjects } = useStudy();

  const [search, setSearch] = useState("");

  const subjectData = useMemo(() => {
    return (subjects || []).map((subject) => {
      const total = Number(
        subject.pyqsTotal || 0
      );

      const completed = Number(
        subject.pyqsCompleted || 0
      );

      const percentage =
        total > 0
          ? Math.round(
              (completed / total) * 100
            )
          : 0;

      return {
        ...subject,
        pyqsTotal: total,
        pyqsCompleted: completed,
        percentage,
      };
    });
  }, [subjects]);

  const filteredSubjects =
    subjectData.filter((subject) =>
      subject.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const totalPYQs = subjectData.reduce(
    (total, subject) =>
      total + subject.pyqsTotal,
    0
  );

  const completedPYQs =
    subjectData.reduce(
      (total, subject) =>
        total + subject.pyqsCompleted,
      0
    );

  const overallPercentage =
    totalPYQs > 0
      ? Math.round(
          (completedPYQs /
            totalPYQs) *
            100
        )
      : 0;

  return (
    <div className="min-h-full space-y-7 pb-10">

      {/* HEADER */}

      <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            GATE 2027
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            PYQ Practice
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Track your previous-year question
            practice subject by subject.
          </p>
        </div>

        {/* SEARCH */}

        <div className="relative w-full md:w-72">

          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search subject..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-2.5 pl-9 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-500/50"
          />

        </div>

      </section>


      {/* STATS */}

      <section className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">

            <FileQuestion
              size={19}
              className="text-violet-400"
            />

          </div>

          <p className="mt-5 text-sm text-zinc-500">
            Total PYQs
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {totalPYQs}
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">

            <CheckCircle2
              size={19}
              className="text-emerald-400"
            />

          </div>

          <p className="mt-5 text-sm text-zinc-500">
            Completed
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {completedPYQs}
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">

            <Target
              size={19}
              className="text-blue-400"
            />

          </div>

          <p className="mt-5 text-sm text-zinc-500">
            Overall Progress
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {overallPercentage}%
          </p>

        </div>

      </section>


      {/* OVERALL PROGRESS */}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs uppercase tracking-widest text-violet-400">
              Overall
            </p>

            <h2 className="mt-1 text-xl font-bold text-white">
              PYQ Progress
            </h2>
          </div>

          <span className="text-sm font-semibold text-zinc-400">
            {completedPYQs} / {totalPYQs}
          </span>

        </div>


        <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">

          <div
            className="h-full rounded-full bg-violet-500 transition-all"
            style={{
              width: `${overallPercentage}%`,
            }}
          />

        </div>

        <p className="mt-3 text-xs text-zinc-600">
          PYQ counts will become useful once you
          enter the actual question targets for
          each subject.
        </p>

      </section>


      {/* SUBJECT LIST */}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">

        <div className="mb-6">

          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
            Practice
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            Subject-wise PYQs
          </h2>

        </div>


        <div className="space-y-3">

          {filteredSubjects.map(
            (subject) => (

              <div
                key={subject.id}
                className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4"
              >

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                  {/* SUBJECT */}

                  <div className="flex min-w-0 flex-1 items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-900">

                      {subject.pyqsTotal > 0 ? (
                        <CheckCircle2
                          size={17}
                          className="text-emerald-400"
                        />
                      ) : (
                        <Circle
                          size={17}
                          className="text-zinc-700"
                        />
                      )}

                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold text-white">
                        {subject.name}
                      </p>

                      <p className="mt-1 text-xs text-zinc-600">
                        {subject.pyqsCompleted}{" "}
                        /{" "}
                        {subject.pyqsTotal}{" "}
                        PYQs
                      </p>

                    </div>

                  </div>


                  {/* PROGRESS */}

                  <div className="w-full sm:w-64">

                    <div className="mb-2 flex justify-between text-xs">

                      <span className="text-zinc-600">
                        Progress
                      </span>

                      <span className="font-semibold text-zinc-400">
                        {subject.percentage}%
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

                      <div
                        className="h-full rounded-full bg-violet-500 transition-all"
                        style={{
                          width: `${subject.percentage}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>

            )
          )}

        </div>


        {filteredSubjects.length === 0 && (

          <div className="py-12 text-center">

            <p className="text-sm text-zinc-500">
              No subject found.
            </p>

          </div>

        )}

      </section>


      {/* STRATEGY */}

      <section className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">

        <div className="flex items-start gap-4">

          <FileQuestion
            size={20}
            className="mt-0.5 shrink-0 text-violet-400"
          />

          <div>

            <h2 className="font-semibold text-white">
              PYQ Strategy
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Solve PYQs alongside your lectures.
              Once you finish a topic, practice its
              previous-year questions instead of
              waiting until the entire syllabus is
              complete.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default PYQs;