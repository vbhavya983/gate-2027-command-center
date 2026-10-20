import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  BookOpen,
  FileQuestion,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

function Planner() {
  const { subjects } = useStudy();

  const [selectedDay, setSelectedDay] = useState(0);

  // Your preferred study pattern:
  // Late wake-up + evening/night focused study.
  const dailyPlan = [
    {
      time: "11:30 AM – 12:30 PM",
      title: "Previous Day Revision",
      type: "Revision",
      icon: RotateCcw,
      description:
        "Revise yesterday's concepts and formulas.",
    },
    {
      time: "1:00 PM – 3:00 PM",
      title: "Main Lecture Block",
      type: "Lectures",
      icon: BookOpen,
      description:
        "Complete the day's main lecture target.",
    },
    {
      time: "4:30 PM – 5:30 PM",
      title: "PYQ Practice",
      type: "PYQs",
      icon: FileQuestion,
      description:
        "Solve GATE previous-year questions from the studied topic.",
    },
    {
      time: "7:00 PM – 9:00 PM",
      title: "Second Study Block",
      type: "Lectures",
      icon: BookOpen,
      description:
        "Continue lectures or complete pending concepts.",
    },
    {
      time: "10:00 PM – 11:30 PM",
      title: "Practice + Short Notes",
      type: "Practice",
      icon: FileQuestion,
      description:
        "Practice questions and update short notes.",
    },
    {
      time: "11:45 PM – 12:15 AM",
      title: "Daily Review",
      type: "Review",
      icon: CheckCircle2,
      description:
        "Review what you completed and prepare tomorrow's target.",
    },
  ];

  const totalStudyHours = 7;

  const days = useMemo(() => {
    const result = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();

      date.setHours(0, 0, 0, 0);
      date.setDate(
        date.getDate() + i
      );

      result.push({
        date,
        day: date.toLocaleDateString(
          "en-US",
          { weekday: "short" }
        ),
        dateNumber: date.getDate(),
        month: date.toLocaleDateString(
          "en-US",
          { month: "short" }
        ),
      });
    }

    return result;
  }, []);

  const selectedDate = days[selectedDay];

  const activeSubject =
    subjects.find(
      (subject) =>
        subject.status ===
        "In Progress"
    ) || subjects[0];

  return (
    <div className="space-y-7 pb-10">

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            GATE 2027
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Study Planner
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            A structured plan built around your current
            preparation and your 55+ marks target.
          </p>

        </div>


        <div className="flex w-fit items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 px-5 py-4">

          <Clock3
            size={19}
            className="text-violet-400"
          />

          <div>

            <p className="text-xs text-zinc-600">
              Daily Focus Target
            </p>

            <p className="text-lg font-bold">
              6–7 hours
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          DATE SELECTOR
      ===================================== */}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-widest text-violet-400">
              Weekly Plan
            </p>

            <h2 className="mt-1 font-bold">
              Choose a day
            </h2>

          </div>

          <div className="flex gap-2">

            <button
              onClick={() =>
                setSelectedDay(
                  Math.max(
                    0,
                    selectedDay - 1
                  )
                )
              }
              disabled={selectedDay === 0}
              className="rounded-xl border border-zinc-800 p-2 text-zinc-500 transition hover:bg-zinc-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={17} />
            </button>

            <button
              onClick={() =>
                setSelectedDay(
                  Math.min(
                    days.length - 1,
                    selectedDay + 1
                  )
                )
              }
              disabled={
                selectedDay ===
                days.length - 1
              }
              className="rounded-xl border border-zinc-800 p-2 text-zinc-500 transition hover:bg-zinc-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={17} />
            </button>

          </div>

        </div>


        <div className="mt-5 grid grid-cols-7 gap-2">

          {days.map(
            (day, index) => {

              const selected =
                index ===
                selectedDay;

              return (

                <button
                  key={index}
                  onClick={() =>
                    setSelectedDay(
                      index
                    )
                  }
                  className={`rounded-xl p-3 text-center transition ${
                    selected
                      ? "bg-violet-600 text-white"
                      : "bg-zinc-950 text-zinc-500 hover:bg-zinc-800"
                  }`}
                >

                  <p className="text-[10px] uppercase">
                    {day.day}
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {day.dateNumber}
                  </p>

                  <p className="text-[10px]">
                    {day.month}
                  </p>

                </button>

              );
            }
          )}

        </div>

      </section>


      {/* =====================================
          TODAY'S OVERVIEW
      ===================================== */}

      <section className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <p className="text-xs text-zinc-600">
            Planned Focus
          </p>

          <p className="mt-2 text-2xl font-bold">
            {totalStudyHours}h
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            Focused study
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <p className="text-xs text-zinc-600">
            Current Subject
          </p>

          <p className="mt-2 truncate text-lg font-bold">
            {activeSubject?.name ||
              "Not selected"}
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            Priority subject
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <p className="text-xs text-zinc-600">
            Lecture Progress
          </p>

          <p className="mt-2 text-2xl font-bold">

            {activeSubject?.completedLectures ||
              0}

            <span className="text-sm font-normal text-zinc-600">
              /
              {activeSubject?.totalLectures ||
                0}
            </span>

          </p>

          <p className="mt-1 text-xs text-zinc-600">
            Current progress
          </p>

        </div>

      </section>


      {/* =====================================
          SELECTED DAY
      ===================================== */}

      <section>

        <div className="mb-5">

          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
            {selectedDate.day},{" "}
            {selectedDate.dateNumber}{" "}
            {selectedDate.month}
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            Today's Study Schedule
          </h2>

        </div>


        <div className="space-y-3">

          {dailyPlan.map(
            (item, index) => {

              const Icon =
                item.icon;

              return (

                <div
                  key={index}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-700 hover:bg-zinc-900/60"
                >

                  <div className="flex gap-4">

                    {/* TIME */}

                    <div className="w-32 shrink-0">

                      <p className="text-xs font-semibold text-violet-300">
                        {item.time}
                      </p>

                    </div>


                    {/* ICON */}

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">

                      <Icon
                        size={18}
                        className="text-violet-400"
                      />

                    </div>


                    {/* CONTENT */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-semibold">
                          {item.title}
                        </h3>

                        <span className="rounded-full bg-zinc-800 px-2 py-1 text-[10px] text-zinc-500">
                          {item.type}
                        </span>

                      </div>

                      <p className="mt-1 text-sm leading-6 text-zinc-600">
                        {item.description}
                      </p>

                    </div>

                  </div>

                </div>

              );
            }
          )}

        </div>

      </section>


      {/* =====================================
          SUBJECT PRIORITY
      ===================================== */}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">

            <BookOpen
              size={20}
              className="text-violet-400"
            />

          </div>

          <div className="flex-1">

            <p className="text-xs uppercase tracking-widest text-violet-400">
              Priority
            </p>

            <h2 className="mt-1 text-xl font-bold">
              {activeSubject?.name ||
                "Choose a subject"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">

              {activeSubject &&
              activeSubject.totalLectures >
                0
                ? `You have completed ${activeSubject.completedLectures} of ${activeSubject.totalLectures} lectures. Focus on completing the remaining ${
                    activeSubject.totalLectures -
                    activeSubject.completedLectures
                  } lectures before moving heavily into the next subject.`
                : "Start with your first lecture and build consistent daily progress."}

            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          DAILY RULE
      ===================================== */}

      <section className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">

        <div className="flex items-start gap-4">

          <CalendarDays
            size={21}
            className="mt-0.5 shrink-0 text-violet-400"
          />

          <div>

            <h2 className="font-semibold">
              Your daily rule
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Don't chase a huge number of lectures.
              Complete the planned study block, solve
              PYQs from what you studied, revise briefly,
              and record your progress. Consistency is
              what will move the tracker forward.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Planner;