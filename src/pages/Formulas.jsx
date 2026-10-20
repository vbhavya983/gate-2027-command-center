import React, { useMemo, useState } from "react";
import {
  BookOpen,
  Calculator,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

function Formulas() {
  const {
    formulas = [],
    addFormula,
    deleteFormula,
  } = useStudy();

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    subject: "Network Theory",
    topic: "",
    name: "",
    formula: "",
    note: "",
  });

  const filteredFormulas = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return formulas;
    }

    return formulas.filter((item) =>
      [
        item.subject,
        item.topic,
        item.name,
        item.formula,
        item.note,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(query)
        )
    );
  }, [formulas, search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.topic.trim() ||
      !form.name.trim() ||
      !form.formula.trim()
    ) {
      return;
    }

    addFormula({
      ...form,
    });

    setForm({
      subject: "Network Theory",
      topic: "",
      name: "",
      formula: "",
      note: "",
    });

    setShowForm(false);
  };

  return (
    <div className="min-h-full bg-zinc-950 p-4 text-white sm:p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            QUICK REVISION
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Formula Vault
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Keep your important GATE formulas in one place
            for fast revision.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold transition hover:bg-violet-500"
        >
          <Plus size={18} />
          Add Formula
        </button>

      </div>


      {/* SEARCH */}

      <div className="mb-8">

        <div className="relative max-w-xl">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search formulas, topics, subjects..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-500/60"
          />

        </div>

      </div>


      {/* STATS */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
            <BookOpen
              size={20}
              className="text-violet-400"
            />
          </div>

          <p className="text-sm text-zinc-500">
            Total Formulas
          </p>

          <p className="mt-1 text-2xl font-bold">
            {formulas.length}
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
            <Calculator
              size={20}
              className="text-blue-400"
            />
          </div>

          <p className="text-sm text-zinc-500">
            Subjects Covered
          </p>

          <p className="mt-1 text-2xl font-bold">
            {
              new Set(
                formulas.map(
                  (item) => item.subject
                )
              ).size
            }
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
            <BookOpen
              size={20}
              className="text-green-400"
            />
          </div>

          <p className="text-sm text-zinc-500">
            Showing
          </p>

          <p className="mt-1 text-2xl font-bold">
            {filteredFormulas.length}
          </p>

        </div>

      </div>


      {/* FORMULA LIST */}

      {filteredFormulas.length === 0 ? (

        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 px-6 text-center">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/10">
            <Calculator
              size={30}
              className="text-violet-400"
            />
          </div>

          <h2 className="text-xl font-semibold">
            {search
              ? "No formulas found"
              : "Your Formula Vault is empty"}
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
            {search
              ? "Try a different search term."
              : "Add important formulas here so you can revise them quickly before PYQs and mock tests."}
          </p>

          {!search && (
            <button
              onClick={() =>
                setShowForm(true)
              }
              className="mt-6 flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium transition hover:border-violet-500 hover:bg-violet-500/10"
            >
              <Plus size={17} />
              Add Your First Formula
            </button>
          )}

        </div>

      ) : (

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

          {filteredFormulas.map(
            (item) => (

              <div
                key={item.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-zinc-700"
              >

                <div className="mb-4 flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    <div className="mb-2 flex flex-wrap gap-2">

                      <span className="rounded-lg bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300">
                        {item.subject}
                      </span>

                      <span className="rounded-lg bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
                        {item.topic}
                      </span>

                    </div>

                    <h3 className="text-lg font-semibold">
                      {item.name}
                    </h3>

                  </div>

                  <button
                    onClick={() =>
                      deleteFormula(item.id)
                    }
                    className="shrink-0 rounded-lg p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                    title="Delete formula"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>


                {/* FORMULA */}

                <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">

                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-400">
                    Formula
                  </p>

                  <p className="break-words text-lg font-semibold leading-8 text-white">
                    {item.formula}
                  </p>

                </div>


                {/* NOTE */}

                {item.note && (

                  <div className="mt-4">

                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-600">
                      Quick Note
                    </p>

                    <p className="text-sm leading-6 text-zinc-400">
                      {item.note}
                    </p>

                  </div>

                )}

              </div>

            )
          )}

        </div>

      )}


      {/* ADD FORMULA MODAL */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

            <div className="sticky top-0 flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-5 py-4">

              <div>

                <h2 className="text-lg font-semibold">
                  Add Formula
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Save an important formula for quick revision.
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
                      subject:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none focus:border-violet-500"
                >
                  <option>
                    Network Theory
                  </option>

                  <option>
                    Engineering Mathematics
                  </option>

                  <option>
                    Signals & Systems
                  </option>

                  <option>
                    Digital Electronics
                  </option>

                  <option>
                    Analog Electronics
                  </option>

                  <option>
                    Control Systems
                  </option>

                  <option>
                    Communication Systems
                  </option>

                  <option>
                    Electromagnetics
                  </option>

                  <option>
                    Electronic Devices
                  </option>

                  <option>
                    VLSI
                  </option>

                  <option>
                    General Aptitude
                  </option>
                </select>

              </div>


              {/* TOPIC */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Topic
                </label>

                <input
                  type="text"
                  value={form.topic}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      topic: e.target.value,
                    })
                  }
                  placeholder="e.g. Network Theorems"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                />

              </div>


              {/* NAME */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Formula Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Resonant Frequency"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                />

              </div>


              {/* FORMULA */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Formula
                </label>

                <textarea
                  rows="3"
                  value={form.formula}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      formula:
                        e.target.value,
                    })
                  }
                  placeholder="e.g. f₀ = 1 / (2π√LC)"
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                />

              </div>


              {/* NOTE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Quick Note
                  <span className="ml-2 text-xs text-zinc-600">
                    Optional
                  </span>
                </label>

                <textarea
                  rows="3"
                  value={form.note}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      note: e.target.value,
                    })
                  }
                  placeholder="Add a shortcut, condition, or memory trick..."
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
                  className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
                >
                  Save Formula
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Formulas;