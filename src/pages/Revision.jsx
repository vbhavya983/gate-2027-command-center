import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

export default function Revision() {
  const {
    revisions = [],
    addRevision,
    deleteRevision,
    completeRevision,
  } = useStudy();

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    subject: "Network Theory",
    topic: "",
    notes: "",
  });

  const filteredRevisions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return revisions;

    return revisions.filter((item) =>
      [
        item.subject,
        item.topic,
        item.notes,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(query)
        )
    );
  }, [revisions, search]);

  const pendingCount = revisions.filter(
    (item) => !item.completed
  ).length;

  const completedCount = revisions.filter(
    (item) => item.completed
  ).length;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.topic.trim()) return;

    if (addRevision) {
      addRevision({
        ...form,
        completed: false,
        createdAt: new Date().toISOString(),
      });
    }

    setForm({
      subject: "Network Theory",
      topic: "",
      notes: "",
    });

    setShowForm(false);
  };

  return (
    <main className="min-h-full bg-zinc-950 p-4 text-white sm:p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            RETENTION SYSTEM
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Revision
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Schedule and track revisions so every important
            concept gets revisited before GATE 2027.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold transition hover:bg-violet-500"
        >
          <Plus size={18} />
          Add Revision
        </button>

      </div>


      {/* STATS */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
            <RotateCcw
              size={20}
              className="text-violet-400"
            />
          </div>

          <p className="text-sm text-zinc-500">
            Total Revisions
          </p>

          <p className="mt-1 text-2xl font-bold">
            {revisions.length}
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
            <Clock3
              size={20}
              className="text-yellow-400"
            />
          </div>

          <p className="text-sm text-zinc-500">
            Pending
          </p>

          <p className="mt-1 text-2xl font-bold">
            {pendingCount}
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
            <CheckCircle2
              size={20}
              className="text-green-400"
            />
          </div>

          <p className="text-sm text-zinc-500">
            Completed
          </p>

          <p className="mt-1 text-2xl font-bold">
            {completedCount}
          </p>

        </div>

      </div>


      {/* SEARCH */}

      <div className="mb-8 max-w-xl">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search revisions, topics, subjects..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-500/60"
          />

        </div>

      </div>


      {/* REVISION LIST */}

      {filteredRevisions.length === 0 ? (

        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 px-6 text-center">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
            <RotateCcw
              size={30}
              className="text-violet-400"
            />
          </div>

          <h2 className="text-xl font-semibold">
            {search
              ? "No revisions found"
              : "No revisions planned yet"}
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
            {search
              ? "Try another search term."
              : "Add concepts you have already studied and schedule them for revision."}
          </p>

          {!search && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium transition hover:border-violet-500 hover:bg-violet-500/10"
            >
              <Plus size={17} />
              Plan First Revision
            </button>
          )}

        </div>

      ) : (

        <div className="space-y-3">

          {filteredRevisions.map((item) => (

            <article
              key={item.id}
              className={`rounded-2xl border p-5 transition ${
                item.completed
                  ? "border-green-500/20 bg-green-500/[0.03]"
                  : "border-zinc-800 bg-zinc-900/50"
              }`}
            >

              <div className="flex items-start gap-4">

                {/* COMPLETE BUTTON */}

                <button
                  onClick={() =>
                    completeRevision &&
                    completeRevision(item.id)
                  }
                  className={`mt-1 shrink-0 rounded-full ${
                    item.completed
                      ? "text-green-400"
                      : "text-zinc-600 hover:text-violet-400"
                  }`}
                  title={
                    item.completed
                      ? "Revision completed"
                      : "Mark revision complete"
                  }
                >
                  <CheckCircle2 size={24} />
                </button>


                {/* CONTENT */}

                <div className="min-w-0 flex-1">

                  <div className="mb-2 flex flex-wrap items-center gap-2">

                    <span className="rounded-lg bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300">
                      {item.subject}
                    </span>

                    {item.completed && (
                      <span className="rounded-lg bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
                        Completed
                      </span>
                    )}

                  </div>

                  <h3
                    className={`font-semibold ${
                      item.completed
                        ? "text-zinc-500 line-through"
                        : "text-white"
                    }`}
                  >
                    {item.topic}
                  </h3>

                  {item.notes && (
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {item.notes}
                    </p>
                  )}

                </div>


                {/* DELETE */}

                <button
                  onClick={() =>
                    deleteRevision &&
                    deleteRevision(item.id)
                  }
                  className="shrink-0 rounded-lg p-2 text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
                  title="Delete revision"
                >
                  <Trash2 size={17} />
                </button>

              </div>

            </article>

          ))}

        </div>

      )}


      {/* ADD REVISION MODAL */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

            <div className="sticky top-0 flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-5 py-4">

              <div>
                <h2 className="text-lg font-semibold">
                  Plan Revision
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Add a concept you want to revisit.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-900 hover:text-white"
              >
                <X size={18} />
              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5"
            >

              {/* SUBJECT */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Subject
                </label>

                <select
                  value={form.subject}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subject: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none focus:border-violet-500"
                >
                  <option>Network Theory</option>
                  <option>Engineering Mathematics</option>
                  <option>Signals & Systems</option>
                  <option>Digital Electronics</option>
                  <option>Analog Electronics</option>
                  <option>Control Systems</option>
                  <option>Communication Systems</option>
                  <option>Electromagnetics</option>
                  <option>Electronic Devices</option>
                  <option>VLSI</option>
                  <option>General Aptitude</option>
                </select>

              </div>


              {/* TOPIC */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Topic
                </label>

                <input
                  value={form.topic}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      topic: e.target.value,
                    })
                  }
                  placeholder="e.g. Thevenin & Norton Theorems"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                />

              </div>


              {/* NOTES */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Revision Notes
                </label>

                <textarea
                  rows="4"
                  value={form.notes}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Important formulas, concepts, weak points..."
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                />

              </div>


              {/* ACTIONS */}

              <div className="flex justify-end gap-3 border-t border-zinc-800 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setShowForm(false)
                  }
                  className="rounded-xl border border-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold hover:bg-violet-500"
                >
                  Save Revision
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}