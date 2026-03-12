function init() {
  const startBtn = document.getElementById("retrieveTests");
  const questionDiv = document.getElementById("questiondiv");

  const gifCenter = document.querySelector(".gif-center");
  const quizIntro = document.getElementById("quiz-intro");

  let currentIndex = 0;
  let locked = false;

  // ===== QUESTIONS =====
  const questions = [
    {
      png: "image/flower.png",
      question: "What are your favorite kind of flowers?",
      correct: "Tulips",
      incorrect: ["Daisies", "Roses", "Lillies"]
    },
    {
      png: "image/thinking_monkey.png",
      question: "When is our Anniversary?",
      correct: "August",
      incorrect: ["September", "January", "December"]
    },
    {
      png: "image/kirsten_restaurant.png",
      question: "Where did we eat in this photo?",
      correct: "Piano Piano",
      incorrect: ["Azreilias", "Heart Breakers", "Louis XIV"]
    },
    {
      png: "image/park.png",
      question: "Were you embarrassed?",
      correct: "Yes",
      incorrect: ["No"]
    },
    {
      png: "image/roblox.png",
      question: "What did you spend Robux for premium on?",
      correct: "Dress to Impress",
      incorrect: ["My Hello Kitty Cafe", "Anime Life", "Royale High"]
    },
    {
      png: "image/kirsten_who_with.png",
      question: "Who were we with?",
      correct: "Sam and her toxic bf",
      incorrect: ["Just us", "With Lareina and Sam", "with church ppl"]
    },
    {
      png: "image/rate.png",
      question: "What is she?",
      correct: "A 10",
      incorrect: ["Good 8", "Solid 5", "Ehhh...."]
    },
    {
      png: "image/pmo.png",
      question: "Does Minjun bother you?",
      correct: "Yeah Duh",
      incorrect: ["Obv not he is so cool", "I don't care"]
    },
    {
      png: "image/gasp.png",
      question: "Is he a bad boyfriend?",
      correct: "Yes",
      incorrect: ["Sometimes", "Rarely", "Never"]
    },
    {
      png: "image/dgaf.png",
      question: "How much does he miss you?",
      correct: "More than Kirsten can imagine",
      incorrect: ["Less than Kirsten", "2 Dolla", "A lot"]
    },
    {
      png: "image/pls.png",
      question: "Do you miss me?",
      correct: "Yes",
      incorrect: ["No"]
    },
    {
      png: "image/ff.png",
      question: "Will You be my Valentine?",
      correct: "Yes",
      incorrect: ["Yes", "Yes", "Yes"]
    }
  ];

  // ===== SHUFFLE =====
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // ===== FADE =====
  function fadeOut(el, duration = 400) {
    return new Promise(resolve => {
      el.style.transition = `opacity ${duration}ms`;
      el.style.opacity = 0;
      setTimeout(resolve, duration);
    });
  }

  function fadeIn(el, duration = 400) {
    return new Promise(resolve => {
      el.style.transition = `opacity ${duration}ms`;
      el.style.opacity = 1;
      setTimeout(resolve, duration);
    });
  }

  // ===== RENDER =====
  function renderQuestion(q) {
    const answers = shuffle([q.correct, ...q.incorrect]);

    questionDiv.innerHTML = `
      <div class="question-block">
        <img src="${q.png}" height="250" class="question-image">
        <h2>${q.question}</h2>
        <div class="answers">
          ${answers.map(a => `<button class="answer-btn">${a}</button>`).join("")}
        </div>
      </div>
    `;

    document.querySelectorAll(".answer-btn").forEach(btn => {
      btn.addEventListener("click", () => handleAnswer(btn, q.correct));
    });
  }

  // ===== HANDLE ANSWER =====
  async function handleAnswer(button, correct) {
    if (locked) return;

    const selected = button.textContent;

    if (selected !== correct && currentIndex < questions.length) {
      button.classList.add("wrong");
      return;
    }

    locked = true;
    button.classList.add("correct"); // correct feedback

    await new Promise(r => setTimeout(r, 500));
    await fadeOut(questionDiv);

    currentIndex++;

    if (currentIndex >= questions.length) {
      questionDiv.innerHTML = `<img src="image/valentine_certification.png" height="550" alt="val_cert" class="question-image">`;
    } else {
      renderQuestion(questions[currentIndex]);
    }

    await fadeIn(questionDiv);
    locked = false;
  }

  // ===== START =====
  startBtn.addEventListener("click", async () => {
    startBtn.style.display = "none";
    if (gifCenter) gifCenter.style.display = "none";
    if (quizIntro) quizIntro.style.display = "none";

    questionDiv.style.opacity = 0;
    questionDiv.style.display = "block";
    renderQuestion(questions[currentIndex]);
    await fadeIn(questionDiv);
  });
}
