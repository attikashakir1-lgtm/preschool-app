function LessonEngine({ lesson, onComplete }) {
  const {
    title,
    instruction,
    meaning,
    type = "multiple-choice",
    options = [],
    correctIndex = 0,
    hintAfter = 2,
    hint = "Think again carefully.",
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

  // TASK STATE
  return (
    <div>
      <h3>{title}</h3>
      <p>{instruction}</p>

      {type === "multiple-choice" &&
        options.map((opt, i) => (
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

      <button
        style={{ marginTop: 10 }}
        onClick={handleSubmit}
      >
        Submit
      </button>

      <p style={{ fontSize: 12, opacity: 0.6 }}>
        Attempts: {attempts}
      </p>
    </div>
  );
}