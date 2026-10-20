import React, { useEffect, useState } from "react";
import {
  Bell,
  Database,
  Moon,
  RotateCcw,
  Save,
  Settings as SettingsIcon,
  Target,
  Clock3,
} from "lucide-react";

import { useStudy } from "../context/StudyContext";


export default function Settings() {

  const {
    goal,
    subjects = [],
    settings,
    updateGoal,
    updateSettings,
    resetAllData,
  } = useStudy();


  // ===================================================
  // LOCAL FORM STATE
  // ===================================================

  const [targetMarks, setTargetMarks] =
    useState(
      goal?.targetMarks ?? 55
    );

  const [dailyTarget, setDailyTarget] =
    useState(
      settings?.dailyTarget ?? 6
    );

  const [studyPreference, setStudyPreference] =
    useState(
      settings?.studyPreference ??
        "Night Owl"
    );

  const [notifications, setNotifications] =
    useState(
      settings?.notifications ??
        false
    );

  const [saved, setSaved] =
    useState(false);


  // ===================================================
  // KEEP FORM IN SYNC WITH SAVED DATA
  // ===================================================

  useEffect(() => {

    setTargetMarks(
      goal?.targetMarks ?? 55
    );

  }, [goal?.targetMarks]);


  useEffect(() => {

    setDailyTarget(
      settings?.dailyTarget ?? 6
    );

    setStudyPreference(
      settings?.studyPreference ??
        "Night Owl"
    );

    setNotifications(
      settings?.notifications ??
        false
    );

  }, [
    settings?.dailyTarget,
    settings?.studyPreference,
    settings?.notifications,
  ]);


  // ===================================================
  // SAVE SETTINGS
  // ===================================================

  const saveSettings = () => {

    // Save target marks
    updateGoal(
      Number(targetMarks)
    );


    // Save all other settings
    updateSettings({
      dailyTarget:
        Number(dailyTarget),

      studyPreference:
        studyPreference,

      notifications:
        notifications,
    });


    // Show confirmation
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);

  };


  // ===================================================
  // RESET
  // ===================================================

  const resetData = () => {

    const confirmed =
      window.confirm(
        "Are you sure you want to reset all preparation data? This cannot be undone."
      );

    if (
      confirmed &&
      resetAllData
    ) {

      resetAllData();

    }

  };


  return (

    <main className="min-h-full bg-zinc-950 p-4 text-white sm:p-6 lg:p-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8">

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
          CONTROL CENTER
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Settings
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Manage your GATE 2027 preparation settings.
        </p>

      </div>


      <div className="max-w-4xl space-y-6">


        {/* =================================================
            GATE GOAL
        ================================================= */}

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50">

          <div className="flex items-center gap-3 border-b border-zinc-800 p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">

              <Target
                size={20}
                className="text-violet-400"
              />

            </div>

            <div>

              <h2 className="font-semibold">
                GATE Goal
              </h2>

              <p className="text-xs text-zinc-600">
                Set your target score
              </p>

            </div>

          </div>


          <div className="p-5">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Target Marks
            </label>


            <div className="flex max-w-sm gap-3">

              <input
                type="number"
                min="1"
                max="100"
                value={targetMarks}
                onChange={(e) =>
                  setTargetMarks(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
              />


              <button
                onClick={saveSettings}
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
              >

                <Save size={17} />

                Save

              </button>

            </div>


            {saved && (

              <p className="mt-3 text-xs text-green-400">
                Settings saved successfully.
              </p>

            )}


            <p className="mt-3 text-xs text-zinc-600">

              Current target:{" "}

              <span className="text-zinc-400">
                {goal?.targetMarks ?? 55}+ marks
              </span>

            </p>

          </div>

        </section>


        {/* =================================================
            STUDY TARGET
        ================================================= */}

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50">

          <div className="flex items-center gap-3 border-b border-zinc-800 p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">

              <Clock3
                size={20}
                className="text-cyan-400"
              />

            </div>

            <div>

              <h2 className="font-semibold">
                Daily Study Target
              </h2>

              <p className="text-xs text-zinc-600">
                Set your focused study goal
              </p>

            </div>

          </div>


          <div className="p-5">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Daily Focus Hours
            </label>


            <div className="flex max-w-sm gap-3">

              <input
                type="number"
                min="1"
                max="16"
                step="0.5"
                value={dailyTarget}
                onChange={(e) =>
                  setDailyTarget(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
              />


              <button
                onClick={saveSettings}
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
              >

                <Save size={17} />

                Save

              </button>

            </div>


            <p className="mt-3 text-xs text-zinc-600">
              Current target:{" "}
              <span className="text-zinc-400">
                {settings?.dailyTarget ?? 6} hours
              </span>
            </p>

          </div>

        </section>


        {/* =================================================
            EXAM PROFILE
        ================================================= */}

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50">

          <div className="flex items-center gap-3 border-b border-zinc-800 p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">

              <SettingsIcon
                size={20}
                className="text-blue-400"
              />

            </div>


            <div>

              <h2 className="font-semibold">
                Exam Profile
              </h2>

              <p className="text-xs text-zinc-600">
                Your current preparation profile
              </p>

            </div>

          </div>


          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

              <p className="text-xs text-zinc-600">
                Examination
              </p>

              <p className="mt-1 font-semibold">
                GATE 2027
              </p>

            </div>


            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

              <p className="text-xs text-zinc-600">
                Branch
              </p>

              <p className="mt-1 font-semibold">
                Electronics & Communication
              </p>

            </div>


            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

              <p className="text-xs text-zinc-600">
                Target
              </p>

              <p className="mt-1 font-semibold">
                {goal?.targetMarks ?? 55}+ Marks
              </p>

            </div>


            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

              <p className="text-xs text-zinc-600">
                Subjects
              </p>

              <p className="mt-1 font-semibold">
                {subjects.length}
              </p>

            </div>

          </div>

        </section>


        {/* =================================================
            STUDY PREFERENCE
        ================================================= */}

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50">

          <div className="flex items-center gap-3 border-b border-zinc-800 p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">

              <Moon
                size={20}
                className="text-indigo-400"
              />

            </div>


            <div>

              <h2 className="font-semibold">
                Study Preference
              </h2>

              <p className="text-xs text-zinc-600">
                Choose your preferred study routine
              </p>

            </div>

          </div>


          <div className="p-5">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Preferred Schedule
            </label>


            <select
              value={studyPreference}
              onChange={(e) =>
                setStudyPreference(
                  e.target.value
                )
              }
              className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
            >

              <option value="Morning">
                Morning
              </option>

              <option value="Afternoon">
                Afternoon
              </option>

              <option value="Evening">
                Evening
              </option>

              <option value="Night Owl">
                Night Owl
              </option>

            </select>


            <button
              onClick={saveSettings}
              className="mt-4 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
            >

              <Save size={17} />

              Save Preference

            </button>

          </div>

        </section>


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50">

          <div className="flex items-center gap-3 border-b border-zinc-800 p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">

              <Bell
                size={20}
                className="text-yellow-400"
              />

            </div>


            <div>

              <h2 className="font-semibold">
                Notifications
              </h2>

              <p className="text-xs text-zinc-600">
                Control study reminder preferences
              </p>

            </div>

          </div>


          <div className="p-5">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-sm font-medium">
                  Study Reminders
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Enable reminders for your study schedule.
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setNotifications(
                    !notifications
                  )
                }
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  notifications
                    ? "bg-violet-600"
                    : "bg-zinc-700"
                }`}
              >

                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    notifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />

              </button>

            </div>


            <button
              onClick={saveSettings}
              className="mt-5 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
            >

              <Save size={17} />

              Save Notification Setting

            </button>

          </div>

        </section>


        {/* =================================================
            DATA MANAGEMENT
        ================================================= */}

        <section className="rounded-2xl border border-red-500/10 bg-red-500/[0.03]">

          <div className="flex items-center gap-3 border-b border-red-500/10 p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">

              <Database
                size={20}
                className="text-red-400"
              />

            </div>


            <div>

              <h2 className="font-semibold">
                Data Management
              </h2>

              <p className="text-xs text-zinc-600">
                Manage your saved preparation data
              </p>

            </div>

          </div>


          <div className="p-5">

            <p className="text-sm font-medium">
              Reset Preparation Data
            </p>


            <p className="mt-2 max-w-xl text-xs leading-5 text-zinc-600">

              Reset all saved preparation
              progress, including lectures,
              tasks, focus sessions, PYQs,
              revisions, mocks, mistakes
              and formulas.

            </p>


            <button
              onClick={resetData}
              className="mt-5 flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
            >

              <RotateCcw size={17} />

              Reset All Data

            </button>

          </div>

        </section>


      </div>

    </main>
  );
}