import { useState } from "react";

/* ===============================
   LESSON ENGINE
   =============================== */
function LessonEngine({ lesson, onComplete }) {
  const {
    title,
    instruction,
    meaning,
    options = [],
    correctIndex = 0,
    hintAfter = 2,
    hint = "Think carefully.",
  } = lesson;

  const [selected, setSelected] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("task");
  // task | failure | success | meaning

  const handleSubmit = () => {
    if (selected === null) return;

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (selected === correctIndex) {
      setStatus("success");
    } else {
      setStatus("failure");
    }
  };

  if (status === "meaning") {
    return (
      <div>
        <h3>Meaning</h3>
        <p>{meaning}</p>
        <button onClick={onComplete}>Continue</button>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div>
        <h3>Success</h3>
        <p>Correct.</p>
        <button onClick={() => setStatus("meaning")}>
          See Meaning
        </button>
      </div>
    );
  }

  if (status === "failure") {
    return (
      <div>
        <h3>Not quite</h3>
        <p>That answer is incorrect.</p>

        {attempts >= hintAfter && (
          <div style={{ marginTop: 10, padding: 10, background: "#eee" }}>
            <strong>Hint:</strong> {hint}
          </div>
        )}

        <button
          style={{ marginTop: 10 }}
          onClick={() => {
            setSelected(null);
            setStatus("task");
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3>{title}</h3>
      <p>{instruction}</p>

      {options.map((opt, i) => (
        <div key={i} style={{ marginBottom: 6 }}>
          <button
            onClick={() => setSelected(i)}
            style={{
              fontWeight: selected === i ? "bold" : "normal",
            }}
          >
            {opt}
          </button>
        </div>
      ))}

      <button style={{ marginTop: 10 }} onClick={handleSubmit}>
        Submit
      </button>

      <p style={{ fontSize: 12, opacity: 0.6 }}>
        Attempts: {attempts}
      </p>
    </div>
  );
}

/* ===============================
   CURRICULUM
   =============================== */
const curriculum = {
  Preschool: [
    {
      title: "Tap the Active Button",
      instruction: "Which button responds?",
      options: ["Grey Button", "Blue Button"],
      correctIndex: 1,
      meaning: "Some actions produce results. Some do not.",
      hintAfter: 1,
      hint: "Look for the active one.",
    },
  ],

  Kindergarten: [
    {
      title: "Correct Order",
      instruction: "What comes first when solving a task?",
      options: [
        "Start randomly",
        "Read instructions first",
        "Guess quickly",
      ],
      correctIndex: 1,
      meaning: "Instructions guide actions.",
      hintAfter: 2,
      hint: "Before acting, understand.",
    },
  ],

  Junior: [
    {
      title: "Best Choice",
      instruction: "Which is the best decision?",
      options: ["Ignore rules", "Follow the rule", "Change rules"],
      correctIndex: 1,
      meaning: "Choices affect outcomes.",
    },
  ],

  "Middle School": [
    {
      title: "Apply Rule",
      instruction: "If rule says double 4, what is result?",
      options: ["6", "8", "4"],
      correctIndex: 1,
      meaning: "Rules apply consistently.",
    },
  ],

  "High School": [
    {
      title: "Think Before Acting",
      instruction: "What reduces mistakes?",
      options: ["Rushing", "Planning", "Skipping"],
      correctIndex: 1,
      meaning: "Planning improves accuracy.",
      hintAfter: 1,
      hint: "Slow down first.",
    },
  ],

  College: [
    {
      title: "Structured Approach",
      instruction: "Complex problems require?",
      options: ["Guessing", "Structure", "Luck"],
      correctIndex: 1,
      meaning: "Structure solves complexity.",
    },
  ],

  "Pre-University": [
    {
      title: "Practice Simulation",
      instruction: "Practice helps because?",
      options: [
        "It wastes time",
        "It builds readiness",
        "It guarantees success",
      ],
      correctIndex: 1,
      meaning: "Practice prepares you for real work.",
    },
  ],

  University: [
    {
      title: "Real Expectations",
      instruction: "Real gigs require?",
      options: ["Excuses", "Accuracy", "Speed only"],
      correctIndex: 1,
      meaning: "Real work demands quality.",
      hintAfter: 99,
    },
  ],
};

/* ===============================
   APP
   =============================== */
export default function App() {
  const stages = Object.keys(curriculum);

  const [view, setView] = useState("learn");
  const [stage, setStage] = useState("Preschool");
  const [lessonIndex, setLessonIndex] = useState(0);

  const lessons = curriculum[stage];
  const lesson = lessons[lessonIndex];

  return (
    <div style={{ padding: 20 }}>
      {/* Top Navigation */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setView("learn")}>Learn</button>
        <button onClick={() => setView("practice")} style={{ marginLeft: 10 }}>
          Practice Inbox
        </button>
        <button onClick={() => setView("paid")} style={{ marginLeft: 10 }}>
          Paid Inbox
        </button>
      </div>

      {/* Practice View */}
      {view === "practice" && (
        <div>
          <h2>Practice Inbox</h2>
          <p>Practice gigs will appear here in Phase 2.</p>
        </div>
      )}

      {/* Paid View */}
      {view === "paid" && (
        <div>
          <h2>Paid Inbox</h2>
          <p>Locked. Complete University stage to unlock.</p>
        </div>
      )}

      {/* Learning View */}
      {view === "learn" && (
        <>
          <div style={{ marginBottom: 20 }}>
            {stages.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStage(s);
                  setLessonIndex(0);
                }}
                style={{
                  marginRight: 6,
                  fontWeight: stage === s ? "bold" : "normal",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <h2>{stage}</h2>

          {lesson ? (
            <LessonEngine
              lesson={lesson}
              onComplete={() => setLessonIndex((i) => i + 1)}
            />
          ) : (
            <p>Stage complete.</p>
          )}
        </>
      )}
    </div>
  );
}