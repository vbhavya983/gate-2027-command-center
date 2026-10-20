import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  X,
  Trophy,
  Target,
  TrendingUp,
  CalendarDays,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

function Mocks() {
  const {
    data,
    addMock,
    deleteMock,
  } = useStudy();

  const mocks = data?.mocks || [];

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    marks: "",
    totalMarks: "100",
    correct: "",
    wrong: "",
    skipped: "",
    notes: "",
  });

  const statistics = useMemo(() => {
    if (!mocks.length) {
      return {
        best: 0,
        average: 0,
        accuracy: 0,
      };
    }

    const scores = mocks.map(
      (mock) =>
        (Number(mock.marks || 0) /
          Number(mock.totalMarks || 100)) *
        100
    );

    const best = Math.max(...scores);

    const average =
      scores.reduce(
        (sum, score) => sum + score,
        0
      ) / scores.length;

    const totalCorrect = mocks.reduce(
      (sum, mock) =>
        sum + Number(mock.correct || 0),
      0
    );

    const totalQuestions = mocks.reduce(
      (sum, mock) =>
        sum +
        Number(mock.correct || 0) +
        Number(mock.wrong || 0),
      0
    );

    const accuracy =
      totalQuestions > 0
        ? (totalCorrect / totalQuestions) *
          100
        : 0;

    return {
      best: Math.round(best),
      average: Math.round(average),
      accuracy: Math.round(accuracy),
    };
  }, [mocks]);

  const filteredMocks = useMemo(() => {
    const query = search.toLowerCase();

    return mocks
      .filter((mock) =>
        mock.name
          ?.toLowerCase()
          .includes(query)
      )
      .sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      );
  }, [mocks, search]);

  const updateField = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      form.marks === "" ||
      form.totalMarks === ""
    ) {
      return;
    }

    const marks = Number(form.marks);
    const totalMarks = Number(
      form.totalMarks
    );

    if (
      totalMarks <= 0 ||
      marks < 0 ||
      marks > totalMarks
    ) {
      return;
    }

    addMock({
      name: form.name.trim(),
      date: form.date,
      marks,
      totalMarks,
      correct: Number(form.correct || 0),
      wrong: Number(form.wrong || 0),
      skipped: Number(form.skipped || 0),
      notes: form.notes.trim(),
    });

    setForm({
      name: "",
      date: new Date()
        .toISOString()
        .split("T")[0],
      marks: "",
      totalMarks: "100",
      correct: "",
      wrong: "",
      skipped: "",
      notes: "",
    });

    setShowForm(false);
  };

  const percentage = (mock) => {
    if (!mock.totalMarks) return 0;

    return Math.round(
      (Number(mock.marks) /
        Number(mock.totalMarks)) *
        100
    );
  };

  return (
    <div className="min-h-full space-y-7 pb-10">

      {/* HEADER */}

      <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            GATE 2027
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Mock Tests
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Track your mock-test performance and
            watch your score improve.
          </p>
        </div>

        <button
          onClick={() =>
            setShowForm(true)
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          <Plus size={17} />
          Add Mock Test
        </button>

      </section>


      {/* STAT CARDS */}

      <section className="grid gap-4 sm:grid-cols-4">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
            <Target
              size={19}
              className="text-violet-400"
            />
          </div>

          <p className="mt-5 text-sm text-zinc-500">
            Tests Completed
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {mocks.length}
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
            <Trophy
              size={19}
              className="text-emerald-400"
            />
          </div>

          <p className="mt-5 text-sm text-zinc-500">
            Best Score
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {statistics.best}%
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
            <TrendingUp
              size={19}
              className="text-blue-400"
            />
          </div>

          <p className="mt-5 text-sm text-zinc-500">
            Average Score
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {statistics.average}%
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
            <Target
              size={19}
              className="text-orange-400"
            />
          </div>

          <p className="mt-5 text-sm text-zinc-500">
            Accuracy
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {statistics.accuracy}%
          </p>

        </div>

      </section>


      {/* SEARCH */}

      <section className="relative">

        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search mock tests..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/40 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-500/50"
        />

      </section>


      {/* MOCK LIST */}

      {filteredMocks.length === 0 ? (

        <section className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 p-12 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900">

            <Trophy
              size={24}
              className="text-zinc-600"
            />

          </div>

          <h2 className="mt-5 font-semibold text-white">
            No mock tests recorded
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-600">
            After every mock test, record your
            result here. Your performance history
            will become the foundation of your
            Analytics page.
          </p>

          <button
            onClick={() =>
              setShowForm(true)
            }
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            <Plus size={16} />
            Add your first mock
          </button>

        </section>

      ) : (

        <section className="space-y-4">

          {filteredMocks.map(
            (mock) => {

              const score =
                percentage(mock);

              return (
                <article
                  key={mock.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                    {/* TEST INFO */}

                    <div className="min-w-0 flex-1">

                      <h2 className="text-base font-semibold text-white">
                        {mock.name}
                      </h2>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-600">

                        <span className="flex items-center gap-1.5">
                          <CalendarDays
                            size={13}
                          />
                          {new Date(
                            mock.date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>

                        <span>
                          {mock.correct || 0} correct
                        </span>

                        <span>
                          {mock.wrong || 0} wrong
                        </span>

                        <span>
                          {mock.skipped || 0} skipped
                        </span>

                      </div>

                    </div>


                    {/* SCORE */}

                    <div className="lg:w-56">

                      <div className="flex items-center justify-between">

                        <span className="text-xs text-zinc-600">
                          Score
                        </span>

                        <strong className="text-sm text-white">
                          {mock.marks}/
                          {mock.totalMarks}
                        </strong>

                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">

                        <div
                          className="h-full rounded-full bg-violet-500 transition-all"
                          style={{
                            width: `${score}%`,
                          }}
                        />

                      </div>

                      <p className="mt-2 text-right text-xs font-semibold text-violet-400">
                        {score}%
                      </p>

                    </div>


                    {/* DELETE */}

                    <button
                      onClick={() =>
                        deleteMock(
                          mock.id
                        )
                      }
                      className="self-end rounded-lg p-2 text-zinc-700 transition hover:bg-red-500/10 hover:text-red-400 lg:self-center"
                      title="Delete mock test"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>


                  {mock.notes && (

                    <div className="mt-5 border-t border-zinc-800/70 pt-4">

                      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        Notes
                      </p>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {mock.notes}
                      </p>

                    </div>

                  )}

                </article>
              );
            }
          )}

        </section>

      )}


      {/* ADD MOCK MODAL */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                  MOCK TESTS
                </p>

                <h2 className="mt-1 text-xl font-bold text-white">
                  Record Mock Test
                </h2>

              </div>

              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
              >
                <X size={18} />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* NAME + DATE */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-xs font-medium text-zinc-500">
                    Test Name *
                  </label>

                  <input
                    value={form.name}
                    onChange={(e) =>
                      updateField(
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="e.g. GATE ECE Full Mock #1"
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-violet-500/50"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-xs font-medium text-zinc-500">
                    Date
                  </label>

                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      updateField(
                        "date",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50"
                  />

                </div>

              </div>


              {/* MARKS */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-xs font-medium text-zinc-500">
                    Marks Obtained *
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={form.marks}
                    onChange={(e) =>
                      updateField(
                        "marks",
                        e.target.value
                      )
                    }
                    placeholder="e.g. 48"
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-violet-500/50"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-xs font-medium text-zinc-500">
                    Total Marks *
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={form.totalMarks}
                    onChange={(e) =>
                      updateField(
                        "totalMarks",
                        e.target.value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-violet-500/50"
                  />

                </div>

              </div>


              {/* QUESTIONS */}

              <div>

                <p className="mb-3 text-xs font-medium text-zinc-500">
                  Question Breakdown
                </p>

                <div className="grid gap-5 sm:grid-cols-3">

                  <div>

                    <label className="mb-2 block text-xs text-zinc-600">
                      Correct
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={form.correct}
                      onChange={(e) =>
                        updateField(
                          "correct",
                          e.target.value
                        )
                      }
                      placeholder="0"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-xs text-zinc-600">
                      Wrong
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={form.wrong}
                      onChange={(e) =>
                        updateField(
                          "wrong",
                          e.target.value
                        )
                      }
                      placeholder="0"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-xs text-zinc-600">
                      Skipped
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={form.skipped}
                      onChange={(e) =>
                        updateField(
                          "skipped",
                          e.target.value
                        )
                      }
                      placeholder="0"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50"
                    />

                  </div>

                </div>

              </div>


              {/* NOTES */}

              <div>

                <label className="mb-2 block text-xs font-medium text-zinc-500">
                  Notes
                </label>

                <textarea
                  value={form.notes}
                  onChange={(e) =>
                    updateField(
                      "notes",
                      e.target.value
                    )
                  }
                  placeholder="What did you learn from this mock?"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-violet-500/50"
                />

              </div>


              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-zinc-800 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setShowForm(false)
                  }
                  className="rounded-xl border border-zinc-800 px-5 py-2.5 text-sm text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
                >
                  <Plus size={16} />
                  Save Result
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Mocks;