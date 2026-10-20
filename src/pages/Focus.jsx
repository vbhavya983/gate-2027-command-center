import React, { useEffect, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

function Focus() {
  const {
    subjects,
    addSession,
    todaySeconds,
  } = useStudy();

  const [selectedSubject, setSelectedSubject] =
    useState("network");

  const [durationMinutes, setDurationMinutes] =
    useState(25);

  const [secondsLeft, setSecondsLeft] =
    useState(25 * 60);

  const [isRunning, setIsRunning] =
    useState(false);

  const [sessionStarted, setSessionStarted] =
    useState(false);

  // -------------------------------------
  // TIMER
  // -------------------------------------

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          clearInterval(timer);
          setIsRunning(false);

          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);


  // -------------------------------------
  // FORMAT TIME
  // -------------------------------------

  const formatTimer = (seconds) => {
    const minutes = Math.floor(
      seconds / 60
    );

    const remainingSeconds =
      seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };


  const formatStudyTime = (seconds) => {
    const hours = Math.floor(
      seconds / 3600
    );

    const minutes = Math.floor(
      (seconds % 3600) / 60
    );

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
  };


  // -------------------------------------
  // START / PAUSE
  // -------------------------------------

  const handleStartPause = () => {
    if (secondsLeft === 0) {
      return;
    }

    setIsRunning((current) => !current);
    setSessionStarted(true);
  };


  // -------------------------------------
  // RESET
  // -------------------------------------

  const handleReset = () => {
    setIsRunning(false);
    setSessionStarted(false);
    setSecondsLeft(
      durationMinutes * 60
    );
  };


  // -------------------------------------
  // CHANGE DURATION
  // -------------------------------------

  const handleDurationChange = (
    minutes
  ) => {
    setDurationMinutes(minutes);

    if (!isRunning) {
      setSecondsLeft(
        minutes * 60
      );
    }
  };


  // -------------------------------------
  // COMPLETE SESSION
  // -------------------------------------

  const handleCompleteSession = () => {
    const elapsedSeconds =
      durationMinutes * 60 -
      secondsLeft;

    if (elapsedSeconds <= 0) {
      return;
    }

    const selected =
      subjects.find(
        (subject) =>
          subject.id ===
          selectedSubject
      );

    addSession({
      subject:
        selected?.name ||
        "General Study",

      duration:
        elapsedSeconds,

      type: "Focus Session",
    });

    setIsRunning(false);
    setSessionStarted(false);
    setSecondsLeft(
      durationMinutes * 60
    );
  };


  // -------------------------------------
  // CURRENT SUBJECT
  // -------------------------------------

  const currentSubject =
    subjects.find(
      (subject) =>
        subject.id ===
        selectedSubject
    );


  // -------------------------------------
  // UI
  // -------------------------------------

  return (
    <div className="space-y-7 pb-10">

      {/* HEADER */}

      <section>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
          GATE 2027
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Focus Mode
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Deep work. No distractions. One session
          at a time.
        </p>

      </section>


      {/* MAIN FOCUS CARD */}

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-10">

        <div className="mx-auto max-w-2xl text-center">

          {/* SUBJECT */}

          <p className="text-xs uppercase tracking-widest text-violet-400">
            Studying
          </p>

          <div className="mx-auto mt-3 max-w-xs">

            <select
              value={selectedSubject}
              onChange={(e) =>
                setSelectedSubject(
                  e.target.value
                )
              }
              disabled={isRunning}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-center text-sm text-white outline-none focus:border-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {subjects.map(
                (subject) => (
                  <option
                    key={subject.id}
                    value={subject.id}
                  >
                    {subject.name}
                  </option>
                )
              )}

            </select>

          </div>


          {/* TIMER */}

          <div className="mt-10">

            <div className="text-7xl font-bold tracking-tight tabular-nums sm:text-8xl">
              {formatTimer(
                secondsLeft
              )}
            </div>

            <p className="mt-3 text-sm text-zinc-600">
              {isRunning
                ? "Focus session in progress"
                : secondsLeft === 0
                ? "Session finished"
                : "Ready when you are"}
            </p>

          </div>


          {/* DURATION */}

          <div className="mt-8">

            <p className="mb-3 text-xs text-zinc-600">
              Session length
            </p>

            <div className="flex justify-center gap-2">

              {[25, 45, 60, 90].map(
                (minutes) => (

                  <button
                    key={minutes}
                    onClick={() =>
                      handleDurationChange(
                        minutes
                      )
                    }
                    disabled={isRunning}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                      durationMinutes ===
                      minutes
                        ? "bg-violet-600 text-white"
                        : "border border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-white"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    {minutes}m
                  </button>

                )
              )}

            </div>

          </div>


          {/* CONTROLS */}

          <div className="mt-8 flex items-center justify-center gap-3">

            <button
              onClick={
                handleStartPause
              }
              disabled={
                secondsLeft === 0
              }
              className="flex min-w-36 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
            >

              {isRunning ? (
                <>
                  <Pause size={17} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={17} />
                  Start Focus
                </>
              )}

            </button>


            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-3 text-sm text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
            >

              <RotateCcw size={16} />

              Reset

            </button>

          </div>


          {/* COMPLETE */}

          {sessionStarted &&
            !isRunning &&
            secondsLeft <
              durationMinutes * 60 && (
              <button
                onClick={
                  handleCompleteSession
                }
                className="mx-auto mt-5 flex items-center gap-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
              >
                <CheckCircle2
                  size={17}
                />

                Save completed focus
                session
              </button>
            )}

        </div>

      </section>


      {/* TODAY'S FOCUS */}

      <section className="grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">

              <Clock3
                size={19}
                className="text-violet-400"
              />

            </div>

            <div>

              <p className="text-xs text-zinc-600">
                Today's Focus
              </p>

              <p className="mt-1 text-xl font-bold">
                {formatStudyTime(
                  todaySeconds
                )}
              </p>

            </div>

          </div>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">

          <p className="text-xs text-zinc-600">
            Current Subject
          </p>

          <p className="mt-2 text-xl font-bold">
            {currentSubject?.name ||
              "General Study"}
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            Focus sessions will be recorded
            against this subject.
          </p>

        </div>

      </section>


      {/* INSTRUCTIONS */}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">

        <h2 className="font-semibold">
          How to use Focus Mode
        </h2>

        <div className="mt-4 grid gap-3 text-sm text-zinc-500 sm:grid-cols-3">

          <div>
            <span className="font-semibold text-zinc-300">
              01.
            </span>{" "}
            Select the subject you're studying.
          </div>

          <div>
            <span className="font-semibold text-zinc-300">
              02.
            </span>{" "}
            Choose a session length and start.
          </div>

          <div>
            <span className="font-semibold text-zinc-300">
              03.
            </span>{" "}
            Save the session when you're finished.
          </div>

        </div>

      </section>

    </div>
  );
}

export default Focus;