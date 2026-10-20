import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

export default function Mistakes() {
  const {
    mistakes = [],
    addMistake,
    deleteMistake,
  } = useStudy();

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    subject: "Network Theory",
    topic: "",
    question: "",
    mistake: "",
    correctApproach: "",
  });

  const filteredMistakes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return mistakes;

    return mistakes.filter((item) =>
      [
        item.subject,
        item.topic,
        item.question,
        item.mistake,
        item.correctApproach,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(query)
        )
    );
  }, [mistakes, search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.topic.trim() ||
      !form.question.trim() ||
      !form.mistake.trim()
    ) {
      return;
    }

    if (addMistake) {
      addMistake({
        ...form,
        createdAt: new Date().toISOString(),
      });
    }

    setForm({
      subject: "Network Theory",
      topic: "",
      question: "",
      mistake: "",
      correctApproach: "",
    });

    setShowForm(false);
  };

  return (
    <main className="min-h-full bg-zinc-950 p-4 text-white sm:p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
            ERROR LOG
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Mistake Book
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Record your mistakes so you don't repeat them
            in PYQs and mock tests.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold transition hover:bg-red-500"
        >
          <Plus size={18} />
          Add Mistake
        </button>

      </div>


      {/* STATS */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
            <AlertTriangle
              size={20}
              className="text-red-400"
            />
          </div>

          <p className="text-sm text-zinc-500">
            Total Mistakes
          </p>

          <p className="mt-1 text-2xl font-bold">
            {mistakes.length}
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
            <BookOpen
              size={20}
              className="text-violet-400"
            />
          </div>

          <p className="text-sm text-zinc-500">
            Subjects
          </p>

          <p className="mt-1 text-2xl font-bold">
            {
              new Set(
                mistakes.map(
                  (item) => item.subject
                )
              ).size
            }
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
            <Search
              size={20}
              className="text-blue-400"
            />
          </div>

          <p className="text-sm text-zinc-500">
            Showing
          </p>

          <p className="mt-1 text-2xl font-bold">
            {filteredMistakes.length}
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
            placeholder="Search mistakes, topics, subjects..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500/60"
          />

        </div>

      </div>


      {/* EMPTY STATE */}

      {filteredMistakes.length === 0 ? (

        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 px-6 text-center">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
            <AlertTriangle
              size={30}
              className="text-red-400"
            />
          </div>

          <h2 className="text-xl font-semibold">
            {search
              ? "No mistakes found"
              : "Your Mistake Book is empty"}
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
            {search
              ? "Try another search term."
              : "Whenever you get a question wrong, record what went wrong and the correct approach here."}
          </p>

          {!search && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium transition hover:border-red-500 hover:bg-red-500/10"
            >
              <Plus size={17} />
              Record First Mistake
            </button>
          )}

        </div>

      ) : (

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

          {filteredMistakes.map((item) => (

            <article
              key={item.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-zinc-700"
            >

              {/* CARD HEADER */}

              <div className="mb-4 flex items-start justify-between gap-4">

                <div className="min-w-0">

                  <div className="mb-2 flex flex-wrap gap-2">

                    <span className="rounded-lg bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-300">
                      {item.subject}
                    </span>

                    <span className="rounded-lg bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
                      {item.topic}
                    </span>

                  </div>

                  <h3 className="font-semibold leading-6">
                    {item.question}
                  </h3>

                </div>

                <button
                  onClick={() =>
                    deleteMistake &&
                    deleteMistake(item.id)
                  }
                  className="shrink-0 rounded-lg p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                  title="Delete mistake"
                >
                  <Trash2 size={17} />
                </button>

              </div>


              {/* MISTAKE */}

              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">

                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-400">
                  What went wrong?
                </p>

                <p className="text-sm leading-6 text-zinc-300">
                  {item.mistake}
                </p>

              </div>


              {/* CORRECT APPROACH */}

              {item.correctApproach && (

                <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/5 p-4">

                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-400">
                    Correct Approach
                  </p>

                  <p className="text-sm leading-6 text-zinc-300">
                    {item.correctApproach}
                  </p>

                </div>

              )}

            </article>

          ))}

        </div>

      )}


      {/* ADD MISTAKE MODAL */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

            <div className="sticky top-0 flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-5 py-4">

              <div>

                <h2 className="text-lg font-semibold">
                  Record Mistake
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Turn every mistake into a revision point.
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
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none focus:border-red-500"
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
                  placeholder="e.g. Network Theorems"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
                />

              </div>


              {/* QUESTION */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Question / Problem
                </label>

                <textarea
                  rows="3"
                  value={form.question}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      question: e.target.value,
                    })
                  }
                  placeholder="What question did you get wrong?"
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
                />

              </div>


              {/* MISTAKE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  What Went Wrong?
                </label>

                <textarea
                  rows="3"
                  value={form.mistake}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      mistake: e.target.value,
                    })
                  }
                  placeholder="Conceptual mistake, calculation error, silly mistake, formula confusion..."
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
                />

              </div>


              {/* CORRECT APPROACH */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Correct Approach
                  <span className="ml-2 text-xs text-zinc-600">
                    Optional
                  </span>
                </label>

                <textarea
                  rows="3"
                  value={form.correctApproach}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      correctApproach:
                        e.target.value,
                    })
                  }
                  placeholder="Write the correct concept, formula, or approach..."
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
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
                  className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold hover:bg-red-500"
                >
                  Save Mistake
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}