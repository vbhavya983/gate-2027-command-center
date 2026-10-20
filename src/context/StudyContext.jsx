import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const StudyContext = createContext(null);

const STORAGE_KEY = "gate_2027_command_center";


// =====================================================
// DEFAULT DATA
// =====================================================

const defaultData = {
  // ---------------------------------------------------
  // FOCUS MODE
  // ---------------------------------------------------

  sessions: [],


  // ---------------------------------------------------
  // DAILY TASKS
  // ---------------------------------------------------

  tasks: [],


  // ---------------------------------------------------
  // SETTINGS
  // ---------------------------------------------------

  settings: {
    dailyTarget: 6,
    studyPreference: "Night Owl",
    notifications: false,
  },


  // ---------------------------------------------------
  // GATE SUBJECTS
  // ---------------------------------------------------

  subjects: [
    {
      id: "network",
      name: "Network Theory",
      shortName: "Networks",
      totalLectures: 61,
      completedLectures: 43,
      pyqsTotal: 0,
      pyqsCompleted: 0,
      revisionRounds: 0,
      testsCompleted: 0,
      status: "In Progress",
    },

    {
      id: "maths",
      name: "Engineering Mathematics",
      shortName: "Maths",
      totalLectures: 0,
      completedLectures: 0,
      pyqsTotal: 0,
      pyqsCompleted: 0,
      revisionRounds: 0,
      testsCompleted: 0,
      status: "Not Started",
    },

    {
      id: "signals",
      name: "Signals & Systems",
      shortName: "Signals",
      totalLectures: 0,
      completedLectures: 0,
      pyqsTotal: 0,
      pyqsCompleted: 0,
      revisionRounds: 0,
      testsCompleted: 0,
      status: "Not Started",
    },

    {
      id: "digital",
      name: "Digital Electronics",
      shortName: "Digital",
      totalLectures: 0,
      completedLectures: 0,
      pyqsTotal: 0,
      pyqsCompleted: 0,
      revisionRounds: 0,
      testsCompleted: 0,
      status: "Not Started",
    },

    {
      id: "analog",
      name: "Analog Electronics",
      shortName: "Analog",
      totalLectures: 0,
      completedLectures: 0,
      pyqsTotal: 0,
      pyqsCompleted: 0,
      revisionRounds: 0,
      testsCompleted: 0,
      status: "Not Started",
    },

    {
      id: "control",
      name: "Control Systems",
      shortName: "Control",
      totalLectures: 0,
      completedLectures: 0,
      pyqsTotal: 0,
      pyqsCompleted: 0,
      revisionRounds: 0,
      testsCompleted: 0,
      status: "Not Started",
    },

    {
      id: "communication",
      name: "Communication Systems",
      shortName: "Comm.",
      totalLectures: 0,
      completedLectures: 0,
      pyqsTotal: 0,
      pyqsCompleted: 0,
      revisionRounds: 0,
      testsCompleted: 0,
      status: "Not Started",
    },

    {
      id: "emft",
      name: "Electromagnetics",
      shortName: "EMFT",
      totalLectures: 0,
      completedLectures: 0,
      pyqsTotal: 0,
      pyqsCompleted: 0,
      revisionRounds: 0,
      testsCompleted: 0,
      status: "Not Started",
    },

    {
      id: "devices",
      name: "Electronic Devices",
      shortName: "Devices",
      totalLectures: 0,
      completedLectures: 0,
      pyqsTotal: 0,
      pyqsCompleted: 0,
      revisionRounds: 0,
      testsCompleted: 0,
      status: "Not Started",
    },

    {
      id: "vlsi",
      name: "VLSI",
      shortName: "VLSI",
      totalLectures: 0,
      completedLectures: 0,
      pyqsTotal: 0,
      pyqsCompleted: 0,
      revisionRounds: 0,
      testsCompleted: 0,
      status: "Not Started",
    },

    {
      id: "ga",
      name: "General Aptitude",
      shortName: "GA",
      totalLectures: 0,
      completedLectures: 0,
      pyqsTotal: 0,
      pyqsCompleted: 0,
      revisionRounds: 0,
      testsCompleted: 0,
      status: "Not Started",
    },
  ],


  // ---------------------------------------------------
  // GATE GOAL
  // ---------------------------------------------------

  goal: {
    exam: "GATE 2027",
    targetMarks: 55,
  },


  // ---------------------------------------------------
  // PYQs
  // ---------------------------------------------------

  pyqs: {
    completed: 0,
    total: 0,
  },


  // ---------------------------------------------------
  // REVISION
  // ---------------------------------------------------

  revisions: {
    completed: 0,
    total: 0,
  },


  // ---------------------------------------------------
  // MOCK TESTS
  // ---------------------------------------------------

  mocks: [],


  // ---------------------------------------------------
  // MISTAKE BOOK
  // ---------------------------------------------------

  mistakes: [],


  // ---------------------------------------------------
  // FORMULA VAULT
  // ---------------------------------------------------

  formulas: [],
};


// =====================================================
// LOAD + MERGE SAVED DATA
// =====================================================

function loadSavedData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultData;
    }

    const parsed = JSON.parse(saved);

    return {
      ...defaultData,
      ...parsed,

      settings: {
        ...defaultData.settings,
        ...(parsed.settings || {}),
      },

      goal: {
        ...defaultData.goal,
        ...(parsed.goal || {}),
      },

      pyqs: {
        ...defaultData.pyqs,
        ...(parsed.pyqs || {}),
      },

      revisions: {
        ...defaultData.revisions,
        ...(parsed.revisions || {}),
      },

      subjects: Array.isArray(parsed.subjects)
        ? parsed.subjects
        : defaultData.subjects,

      sessions: Array.isArray(parsed.sessions)
        ? parsed.sessions
        : [],

      tasks: Array.isArray(parsed.tasks)
        ? parsed.tasks
        : [],

      mocks: Array.isArray(parsed.mocks)
        ? parsed.mocks
        : [],

      mistakes: Array.isArray(parsed.mistakes)
        ? parsed.mistakes
        : [],

      formulas: Array.isArray(parsed.formulas)
        ? parsed.formulas
        : [],
    };
  } catch (error) {
    console.error(
      "Error loading saved study data:",
      error
    );

    return defaultData;
  }
}


// =====================================================
// STUDY PROVIDER
// =====================================================

export function StudyProvider({ children }) {

  const [data, setData] = useState(loadSavedData);


  // ===================================================
  // SAVE EVERYTHING TO LOCAL STORAGE
  // ===================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );
    } catch (error) {
      console.error(
        "Error saving study data:",
        error
      );
    }
  }, [data]);


  // ===================================================
  // GOAL
  // ===================================================

  const updateGoal = (targetMarks) => {

    setData((previous) => ({
      ...previous,

      goal: {
        ...previous.goal,
        targetMarks: Number(targetMarks),
      },
    }));

  };


  // ===================================================
  // SETTINGS
  // ===================================================

  const updateSettings = (newSettings) => {

    setData((previous) => ({
      ...previous,

      settings: {
        ...previous.settings,
        ...newSettings,
      },
    }));

  };


  // ===================================================
  // SUBJECTS
  // ===================================================

  const updateSubject = (
    subjectId,
    updates
  ) => {

    setData((previous) => ({
      ...previous,

      subjects: previous.subjects.map(
        (subject) =>
          subject.id === subjectId
            ? {
                ...subject,
                ...updates,
              }
            : subject
      ),
    }));

  };


  // ===================================================
  // LECTURE PROGRESS
  // ===================================================

  const updateLectureProgress = (
    subjectId,
    completedLectures
  ) => {

    setData((previous) => ({
      ...previous,

      subjects: previous.subjects.map(
        (subject) => {

          if (subject.id !== subjectId) {
            return subject;
          }

          const completed = Math.max(
            0,
            Number(completedLectures)
          );

          const total = Number(
            subject.totalLectures || 0
          );

          let status = "Not Started";

          if (
            completed > 0 &&
            completed < total
          ) {
            status = "In Progress";
          }

          if (
            total > 0 &&
            completed >= total
          ) {
            status = "Completed";
          }

          return {
            ...subject,
            completedLectures: completed,
            status,
          };
        }
      ),
    }));

  };


  // ===================================================
  // ADD SUBJECT
  // ===================================================

  const addSubject = (subject) => {

    const newSubject = {
      id:
        subject.id ||
        `subject-${Date.now()}`,

      name:
        subject.name ||
        "New Subject",

      shortName:
        subject.shortName ||
        subject.name ||
        "Subject",

      totalLectures:
        Number(subject.totalLectures) || 0,

      completedLectures:
        Number(subject.completedLectures) || 0,

      pyqsTotal:
        Number(subject.pyqsTotal) || 0,

      pyqsCompleted:
        Number(subject.pyqsCompleted) || 0,

      revisionRounds:
        Number(subject.revisionRounds) || 0,

      testsCompleted:
        Number(subject.testsCompleted) || 0,

      status:
        subject.status ||
        "Not Started",
    };

    setData((previous) => ({
      ...previous,

      subjects: [
        ...previous.subjects,
        newSubject,
      ],
    }));

  };


  // ===================================================
  // DELETE SUBJECT
  // ===================================================

  const deleteSubject = (subjectId) => {

    setData((previous) => ({
      ...previous,

      subjects: previous.subjects.filter(
        (subject) =>
          subject.id !== subjectId
      ),
    }));

  };


  // ===================================================
  // TASKS
  // ===================================================

  const addTask = (task) => {

    const newTask = {
      id:
        task.id ||
        Date.now(),

      title:
        task.title ||
        task.name ||
        "Study Task",

      completed:
        Boolean(task.completed),

      date:
        task.date ||
        new Date()
          .toISOString()
          .split("T")[0],

      subjectId:
        task.subjectId ||
        null,

      priority:
        task.priority ||
        "Medium",

      type:
        task.type ||
        "Study",

      ...task,
    };

    setData((previous) => ({
      ...previous,

      tasks: [
        ...previous.tasks,
        newTask,
      ],
    }));

  };


  const updateTask = (
    taskId,
    updates
  ) => {

    setData((previous) => ({
      ...previous,

      tasks: previous.tasks.map(
        (task) =>
          task.id === taskId
            ? {
                ...task,
                ...updates,
              }
            : task
      ),
    }));

  };


  const toggleTask = (taskId) => {

    setData((previous) => ({
      ...previous,

      tasks: previous.tasks.map(
        (task) =>
          task.id === taskId
            ? {
                ...task,
                completed:
                  !task.completed,
              }
            : task
      ),
    }));

  };


  const deleteTask = (taskId) => {

    setData((previous) => ({
      ...previous,

      tasks: previous.tasks.filter(
        (task) =>
          task.id !== taskId
      ),
    }));

  };


  // ===================================================
  // FOCUS SESSIONS
  // ===================================================

  const addSession = (session) => {

    const newSession = {
      id:
        session.id ||
        Date.now(),

      date:
        session.date ||
        new Date()
          .toISOString()
          .split("T")[0],

      duration:
        Number(session.duration) || 0,

      subjectId:
        session.subjectId ||
        null,

      subject:
        session.subject ||
        "",

      type:
        session.type ||
        "Focus",

      ...session,
    };

    setData((previous) => ({
      ...previous,

      sessions: [
        ...previous.sessions,
        newSession,
      ],
    }));

  };


  const deleteSession = (
    sessionId
  ) => {

    setData((previous) => ({
      ...previous,

      sessions:
        previous.sessions.filter(
          (session) =>
            session.id !== sessionId
        ),
    }));

  };


  // ===================================================
  // PYQs
  // ===================================================

  const updatePYQs = (
    completed,
    total
  ) => {

    setData((previous) => ({
      ...previous,

      pyqs: {
        completed: Math.max(
          0,
          Number(completed)
        ),

        total: Math.max(
          0,
          Number(total)
        ),
      },
    }));

  };


  const updateSubjectPYQs = (
    subjectId,
    completed,
    total
  ) => {

    setData((previous) => ({
      ...previous,

      subjects:
        previous.subjects.map(
          (subject) =>
            subject.id === subjectId
              ? {
                  ...subject,

                  pyqsCompleted:
                    Math.max(
                      0,
                      Number(completed)
                    ),

                  pyqsTotal:
                    Math.max(
                      0,
                      Number(total)
                    ),
                }
              : subject
        ),
    }));

  };


  // ===================================================
  // REVISION
  // ===================================================

  const updateRevisions = (
    completed,
    total
  ) => {

    setData((previous) => ({
      ...previous,

      revisions: {
        completed: Math.max(
          0,
          Number(completed)
        ),

        total: Math.max(
          0,
          Number(total)
        ),
      },
    }));

  };


  const updateSubjectRevision = (
    subjectId,
    revisionRounds
  ) => {

    setData((previous) => ({
      ...previous,

      subjects:
        previous.subjects.map(
          (subject) =>
            subject.id === subjectId
              ? {
                  ...subject,
                  revisionRounds:
                    Math.max(
                      0,
                      Number(
                        revisionRounds
                      )
                    ),
                }
              : subject
        ),
    }));

  };


  // ===================================================
  // MOCK TESTS
  // ===================================================

  const addMock = (mock) => {

    const newMock = {
      id:
        mock.id ||
        Date.now(),

      date:
        mock.date ||
        new Date()
          .toISOString()
          .split("T")[0],

      name:
        mock.name ||
        "Mock Test",

      score:
        Number(mock.score) || 0,

      total:
        Number(mock.total) || 100,

      ...mock,
    };

    setData((previous) => ({
      ...previous,

      mocks: [
        ...previous.mocks,
        newMock,
      ],
    }));

  };


  const updateMock = (
    mockId,
    updates
  ) => {

    setData((previous) => ({
      ...previous,

      mocks: previous.mocks.map(
        (mock) =>
          mock.id === mockId
            ? {
                ...mock,
                ...updates,
              }
            : mock
      ),
    }));

  };


  const deleteMock = (
    mockId
  ) => {

    setData((previous) => ({
      ...previous,

      mocks:
        previous.mocks.filter(
          (mock) =>
            mock.id !== mockId
        ),
    }));

  };


  // ===================================================
  // MISTAKE BOOK
  // ===================================================

  const addMistake = (
    mistake
  ) => {

    const newMistake = {
      id:
        mistake.id ||
        Date.now(),

      question:
        mistake.question ||
        mistake.title ||
        "Untitled Mistake",

      subjectId:
        mistake.subjectId ||
        null,

      topic:
        mistake.topic ||
        "",

      explanation:
        mistake.explanation ||
        "",

      solution:
        mistake.solution ||
        "",

      date:
        mistake.date ||
        new Date()
          .toISOString()
          .split("T")[0],

      resolved:
        Boolean(mistake.resolved),

      ...mistake,
    };

    setData((previous) => ({
      ...previous,

      mistakes: [
        ...previous.mistakes,
        newMistake,
      ],
    }));

  };


  const updateMistake = (
    mistakeId,
    updates
  ) => {

    setData((previous) => ({
      ...previous,

      mistakes:
        previous.mistakes.map(
          (mistake) =>
            mistake.id === mistakeId
              ? {
                  ...mistake,
                  ...updates,
                }
              : mistake
        ),
    }));

  };


  const deleteMistake = (
    mistakeId
  ) => {

    setData((previous) => ({
      ...previous,

      mistakes:
        previous.mistakes.filter(
          (mistake) =>
            mistake.id !== mistakeId
        ),
    }));

  };


  const toggleMistake = (
    mistakeId
  ) => {

    setData((previous) => ({
      ...previous,

      mistakes:
        previous.mistakes.map(
          (mistake) =>
            mistake.id === mistakeId
              ? {
                  ...mistake,
                  resolved:
                    !mistake.resolved,
                }
              : mistake
        ),
    }));

  };


  // ===================================================
  // FORMULA VAULT
  // ===================================================

  const addFormula = (
    formula
  ) => {

    const newFormula = {
      id:
        formula.id ||
        Date.now(),

      title:
        formula.title ||
        "Untitled Formula",

      formula:
        formula.formula ||
        "",

      subjectId:
        formula.subjectId ||
        null,

      topic:
        formula.topic ||
        "",

      notes:
        formula.notes ||
        "",

      ...formula,
    };

    setData((previous) => ({
      ...previous,

      formulas: [
        ...previous.formulas,
        newFormula,
      ],
    }));

  };


  const updateFormula = (
    formulaId,
    updates
  ) => {

    setData((previous) => ({
      ...previous,

      formulas:
        previous.formulas.map(
          (formula) =>
            formula.id === formulaId
              ? {
                  ...formula,
                  ...updates,
                }
              : formula
        ),
    }));

  };


  const deleteFormula = (
    formulaId
  ) => {

    setData((previous) => ({
      ...previous,

      formulas:
        previous.formulas.filter(
          (formula) =>
            formula.id !== formulaId
        ),
    }));

  };


  // ===================================================
  // LECTURE STATISTICS
  // ===================================================

  const lectureStats = useMemo(() => {

    const completed =
      data.subjects.reduce(
        (sum, subject) =>
          sum +
          Number(
            subject.completedLectures ||
              0
          ),
        0
      );

    const total =
      data.subjects.reduce(
        (sum, subject) =>
          sum +
          Number(
            subject.totalLectures ||
              0
          ),
        0
      );

    const percentage =
      total > 0
        ? Math.round(
            (completed / total) * 100
          )
        : 0;

    return {
      completed,
      total,
      percentage,
    };

  }, [data.subjects]);


  // ===================================================
  // PYQ PERCENTAGE
  // ===================================================

  const pyqPercentage = useMemo(() => {

    if (!data.pyqs.total) {
      return 0;
    }

    return Math.round(
      (data.pyqs.completed /
        data.pyqs.total) *
        100
    );

  }, [data.pyqs]);


  // ===================================================
  // REVISION PERCENTAGE
  // ===================================================

  const revisionPercentage =
    useMemo(() => {

      if (!data.revisions.total) {
        return 0;
      }

      return Math.round(
        (data.revisions.completed /
          data.revisions.total) *
          100
      );

    }, [data.revisions]);


  // ===================================================
  // TODAY'S FOCUS TIME
  // ===================================================

  const todaySeconds = useMemo(() => {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    return data.sessions.reduce(
      (total, session) => {

        if (
          session.date !== today
        ) {
          return total;
        }

        if (
          session.seconds !==
          undefined
        ) {
          return (
            total +
            Number(
              session.seconds || 0
            )
          );
        }

        if (
          session.durationSeconds !==
          undefined
        ) {
          return (
            total +
            Number(
              session.durationSeconds ||
                0
            )
          );
        }

        return (
          total +
          Number(
            session.duration || 0
          ) * 60
        );
      },
      0
    );

  }, [data.sessions]);


  // ===================================================
  // STUDY STREAK
  // ===================================================

  const streak = useMemo(() => {

    if (!data.sessions.length) {
      return 0;
    }

    const studyDates =
      new Set(
        data.sessions
          .filter(
            (session) =>
              session.date
          )
          .map(
            (session) =>
              session.date
          )
      );

    let currentDate =
      new Date();

    currentDate.setHours(
      0,
      0,
      0,
      0
    );

    let count = 0;

    while (true) {

      const dateString =
        currentDate
          .toISOString()
          .split("T")[0];

      if (
        studyDates.has(
          dateString
        )
      ) {

        count++;

        currentDate.setDate(
          currentDate.getDate() - 1
        );

      } else {

        break;

      }
    }

    return count;

  }, [data.sessions]);


  // ===================================================
  // RESET EVERYTHING
  // ===================================================

  const resetAllData = () => {

    setData({
      ...defaultData,

      subjects:
        defaultData.subjects.map(
          (subject) => ({
            ...subject,
          })
        ),

      settings: {
        ...defaultData.settings,
      },

      goal: {
        ...defaultData.goal,
      },

      pyqs: {
        ...defaultData.pyqs,
      },

      revisions: {
        ...defaultData.revisions,
      },

      sessions: [],
      tasks: [],
      mocks: [],
      mistakes: [],
      formulas: [],
    });

  };


  // ===================================================
  // CONTEXT VALUE
  // ===================================================

  const value = {

    // DATA
    data,
    subjects: data.subjects,
    sessions: data.sessions,
    tasks: data.tasks,
    settings: data.settings,
    goal: data.goal,
    pyqs: data.pyqs,
    revisions: data.revisions,
    mocks: data.mocks,
    mistakes: data.mistakes,
    formulas: data.formulas,

    // CALCULATED
    lectureStats,
    todaySeconds,
    streak,
    pyqPercentage,
    revisionPercentage,

    // GOAL
    updateGoal,

    // SETTINGS
    updateSettings,

    // SUBJECTS
    updateSubject,
    updateLectureProgress,
    addSubject,
    deleteSubject,

    // TASKS
    addTask,
    updateTask,
    toggleTask,
    deleteTask,

    // FOCUS
    addSession,
    deleteSession,

    // PYQs
    updatePYQs,
    updateSubjectPYQs,

    // REVISION
    updateRevisions,
    updateSubjectRevision,

    // MOCKS
    addMock,
    updateMock,
    deleteMock,

    // MISTAKES
    addMistake,
    updateMistake,
    deleteMistake,
    toggleMistake,

    // FORMULAS
    addFormula,
    updateFormula,
    deleteFormula,

    // RESET
    resetAllData,
  };


  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
}


// =====================================================
// USE STUDY HOOK
// =====================================================

export function useStudy() {

  const context =
    useContext(StudyContext);

  if (!context) {
    throw new Error(
      "useStudy must be used inside StudyProvider"
    );
  }

  return context;
}


export default StudyContext;