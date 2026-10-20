import React, { useMemo } from "react";
import {
  BarChart3,
  BookOpen,
  Clock3,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

function Analytics() {
  const {
    subjects = [],
    lectureStats,
    todaySeconds = 0,
    streak = 0,
    pyqs = { completed: 0, total: 0 },
    revisions = { completed: 0, total: 0 },
    goal = { targetMarks: 55 },
    mocks = [],
    mistakes = [],
    sessions = [],
  } = useStudy();

  const overallLecturePercentage =
    lectureStats?.percentage || 0;

  const pyqPercentage =
    pyqs.total > 0
      ? Math.round(
          (pyqs.completed / pyqs.total) * 100
        )
      : 0;

  const revisionPercentage =
    revisions.total > 0
      ? Math.round(
          (revisions.completed / revisions.total) * 100
        )
      : 0;

  const totalCompletedLectures = subjects.reduce(
    (sum, subject) =>
      sum + (subject.completedLectures || 0),
    0
  );

  const totalLectures = subjects.reduce(
    (sum, subject) =>
      sum + (subject.totalLectures || 0),
    0
  );

  const activeSubjects = subjects.filter(
    (subject) =>
      (subject.completedLectures || 0) > 0
  ).length;

  const strongestSubject = useMemo(() => {
    const available = subjects.filter(
      (subject) =>
        (subject.totalLectures || 0) > 0
    );

    if (!available.length) return null;

    return [...available].sort(
      (a, b) => {
        const aProgress =
          a.completedLectures /
          a.totalLectures;

        const bProgress =
          b.completedLectures /
          b.totalLectures;

        return bProgress - aProgress;
      }
    )[0];
  }, [subjects]);

  const weakestSubject = useMemo(() => {
    const available = subjects.filter(
      (subject) =>
        (subject.totalLectures || 0) > 0
    );

    if (!available.length) return null;

    return [...available].sort(
      (a, b) => {
        const aProgress =
          a.completedLectures /
          a.totalLectures;

        const bProgress =
          b.completedLectures /
          b.totalLectures;

        return aProgress - bProgress;
      }
    )[0];
  }, [subjects]);

  const totalFocusSeconds = sessions.reduce(
    (sum, session) =>
      sum + (session.duration || 0),
    0
  );

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

  return (
    <div className="min-h-full bg-zinc-950 p-4 text-white sm:p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8">

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
          PERFORMANCE OVERVIEW
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Analytics
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
          See how your GATE 2027 preparation is
          progressing and where you should focus next.
        </p>

      </div>


      {/* TOP STATS */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <div className="mb-4 flex items-center justify-between">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
              <BookOpen
                size={20}
                className="text-violet-400"
              />
            </div>

            <TrendingUp
              size={17}
              className="text-zinc-600"
            />

          </div>

          <p className="text-sm text-zinc-500">
            Lecture Progress
          </p>

          <p className="mt-1 text-2xl font-bold">
            {overallLecturePercentage}%
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            {totalCompletedLectures} of{" "}
            {totalLectures || 0} lectures
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
            <Clock3
              size={20}
              className="text-blue-400"
            />
          </div>

          <p className="text-sm text-zinc-500">
            Today's Focus
          </p>

          <p className="mt-1 text-2xl font-bold">
            {formatTime(todaySeconds)}
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            Total recorded:{" "}
            {formatTime(totalFocusSeconds)}
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
            <Target
              size={20}
              className="text-orange-400"
            />
          </div>

          <p className="text-sm text-zinc-500">
            PYQ Progress
          </p>

          <p className="mt-1 text-2xl font-bold">
            {pyqPercentage}%
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            {pyqs.completed} of{" "}
            {pyqs.total || 0} completed
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <div className="mb-4 flex items-center justify-between">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
              <Trophy
                size={20}
                className="text-green-400"
              />
            </div>

            <span className="text-xs text-zinc-600">
              TARGET
            </span>

          </div>

          <p className="text-sm text-zinc-500">
            GATE Target
          </p>

          <p className="mt-1 text-2xl font-bold">
            {goal.targetMarks}+
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            Current streak: {streak} days
          </p>

        </div>

      </div>


      {/* PROGRESS CARDS */}

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* LECTURES */}

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                SYLLABUS
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Lecture Completion
              </h2>

            </div>

            <span className="text-sm font-semibold text-violet-400">
              {overallLecturePercentage}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

            <div
              className="h-full rounded-full bg-violet-500 transition-all"
              style={{
                width: `${overallLecturePercentage}%`,
              }}
            />

          </div>

          <div className="mt-4 flex justify-between text-xs text-zinc-500">

            <span>
              {totalCompletedLectures} completed
            </span>

            <span>
              {Math.max(
                0,
                totalLectures -
                  totalCompletedLectures
              )}{" "}
              remaining
            </span>

          </div>

        </section>


        {/* REVISION */}

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                REVISION
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Revision Completion
              </h2>

            </div>

            <span className="text-sm font-semibold text-green-400">
              {revisionPercentage}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{
                width: `${revisionPercentage}%`,
              }}
            />

          </div>

          <div className="mt-4 flex justify-between text-xs text-zinc-500">

            <span>
              {revisions.completed} completed
            </span>

            <span>
              {Math.max(
                0,
                revisions.total -
                  revisions.completed
              )}{" "}
              remaining
            </span>

          </div>

        </section>

      </div>


      {/* SUBJECT ANALYTICS */}

      <section className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
              GATE ECE
            </p>

            <h2 className="mt-1 text-lg font-semibold">
              Subject Performance
            </h2>

          </div>

          <span className="text-sm text-zinc-500">
            {activeSubjects} active
          </span>

        </div>


        <div className="space-y-5">

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
              <div key={subject.id}>

                <div className="mb-2 flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium">
                      {subject.name}
                    </p>

                    <p className="text-xs text-zinc-600">
                      {subject.completedLectures} /{" "}
                      {subject.totalLectures || 0} lectures
                    </p>

                  </div>

                  <span className="text-sm font-semibold text-zinc-300">
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
            );
          })}

        </div>

      </section>


      {/* INSIGHTS */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
            STRONGEST
          </p>

          <h2 className="mt-2 text-lg font-semibold">
            Current Strongest Subject
          </h2>

          {strongestSubject ? (
            <>
              <p className="mt-5 text-xl font-bold text-violet-300">
                {strongestSubject.name}
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                {strongestSubject.completedLectures} /{" "}
                {strongestSubject.totalLectures} lectures
                completed.
              </p>
            </>
          ) : (
            <p className="mt-5 text-sm text-zinc-500">
              Start completing lectures to see
              subject insights.
            </p>
          )}

        </section>


        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
            PRIORITY
          </p>

          <h2 className="mt-2 text-lg font-semibold">
            Needs Attention
          </h2>

          {weakestSubject ? (
            <>
              <p className="mt-5 text-xl font-bold text-orange-300">
                {weakestSubject.name}
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                This subject currently has the
                lowest lecture completion.
              </p>
            </>
          ) : (
            <p className="mt-5 text-sm text-zinc-500">
              Your priority subject will appear
              here once lecture data is available.
            </p>
          )}

        </section>


        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
            MISTAKES
          </p>

          <h2 className="mt-2 text-lg font-semibold">
            Mistake Book
          </h2>

          <p className="mt-5 text-3xl font-bold">
            {mistakes.length}
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            Mistakes recorded for future revision.
          </p>

        </section>

      </div>


      {/* EMPTY MOCK MESSAGE */}

      {mocks.length === 0 && (

        <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 p-5">

          <div className="flex items-start gap-3">

            <BarChart3
              size={19}
              className="mt-0.5 shrink-0 text-zinc-600"
            />

            <div>

              <p className="text-sm font-medium text-zinc-400">
                Mock-test analytics will appear here
              </p>

              <p className="mt-1 text-xs leading-5 text-zinc-600">
                Complete mock tests and record their
                results to build your performance history.
              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Analytics;