import { useState } from "react";

/* ===============================
   LESSON ENGINE (INLINE)
   =============================== */
function LessonEngine({ lesson, onComplete }) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div>
        <h3>Meaning</h3>
        <p>{lesson.meaning}</p>
        <button onClick={onComplete}>Continue</button>
      </div>
    );
  }

  return (
    <div>
      <h3>{lesson.title}</h3>
      <p>{lesson.instruction}</p>

      <div
        style={{
          width: 60,
          height: 60,
          background: "#ccc",
          marginBottom: 10,
        }}
      />

      <button onClick={() => setDone(true)}>Do Action</button>
    </div>
  );
}

/* ===============================
   CURRICULUM (ALL LEVELS)
   =============================== */
const curriculum = {

  Preschool: [
    {
      title: "Tap the Active Button",
      instruction: "Which button responds?",
      type: "multiple-choice",
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
      type: "multiple-choice",
      options: [
        "Start randomly",
        "Read instructions first",
        "Guess quickly"
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
      type: "multiple-choice",
      options: ["Ignore rules", "Follow the rule", "Change rules"],
      correctIndex: 1,
      meaning: "Choices affect outcomes.",
    },
  ],

  "Middle School": [
    {
      title: "Apply Rule",
      instruction: "If rule says double 4, what is result?",
      type: "multiple-choice",
      options: ["6", "8", "4"],
      correctIndex: 1,
      meaning: "Rules apply consistently.",
    },
  ],

  "High School": [
    {
      title: "Think Before Acting",
      instruction: "What reduces mistakes?",
      type: "multiple-choice",
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
      type: "multiple-choice",
      options: ["Guessing", "Structure", "Luck"],
      correctIndex: 1,
      meaning: "Structure solves complexity.",
    },
  ],

  "Pre-University": [
    {
      title: "Practice Simulation",
      instruction: "Practice helps because?",
      type: "multiple-choice",
      options: [
        "It wastes time",
        "It builds readiness",
        "It guarantees success"
      ],
      correctIndex: 1,
      meaning: "Practice prepares you for real work.",
    },
  ],

  University: [
    {
      title: "Real Expectations",
      instruction: "Real gigs require?",
      type: "multiple-choice",
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

  const [stage, setStage] = useState("Preschool");
  const [lessonIndex, setLessonIndex] = useState(0);

  const lessons = curriculum[stage];
  const lesson = lessons[lessonIndex];

  return (
    <div style={{ padding: 20 }}>
      {/* TOP NAVIGATION */}
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
        <p>Stage complete. You can revisit anytime.</p>
      )}
    </div>
  );
}