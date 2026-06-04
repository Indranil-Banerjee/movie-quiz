const allQuestions = [
{
question:"Which 1985 movie featured Marty McFly?",
answers:["Ghostbusters","Back to the Future","The Goonies","Top Gun"],
correct:1
},
{
question:"Who played Indiana Jones?",
answers:["Tom Cruise","Bill Murray","Harrison Ford","Mel Gibson"],
correct:2
},
{
question:"Which film featured E.T.?",
answers:["1982","1983","1984","1985"],
correct:0
},
{
question:"What was the name of the ghost-catching team in Ghostbusters?",
answers:["Paranormal Squad","Ghostbusters","Spirit Hunters","Phantom Force"],
correct:1
},
{
question:"Who directed E.T.?",
answers:["George Lucas","Steven Spielberg","Ridley Scott","James Cameron"],
correct:1
},
{
question:"Which movie featured Maverick?",
answers:["Footloose","Top Gun","Platoon","Wall Street"],
correct:1
},
{
question:"Which actor starred in Die Hard?",
answers:["Bruce Willis","Arnold Schwarzenegger","Sylvester Stallone","Kurt Russell"],
correct:0
},
{
question:"Which 1984 movie introduced the Terminator?",
answers:["Aliens","RoboCop","Predator","The Terminator"],
correct:3
},
{
question:"What was the Gremlins mogwai called?",
answers:["Spike","Stripe","Gizmo","Mog"],
correct:2
},
{
question:"Who played Ferris Bueller?",
answers:["Matthew Broderick","Tom Hanks","Michael J. Fox","John Cusack"],
correct:0
},
{
question:"Which movie includes the quote 'Nobody puts Baby in a corner'?",
answers:["Footloose","Dirty Dancing","Flashdance","Pretty in Pink"],
correct:1
},
{
question:"Who played the lead in Beverly Hills Cop?",
answers:["Richard Pryor","Eddie Murphy","Bill Murray","Chevy Chase"],
correct:1
},
{
question:"Which movie features the character John McClane?",
answers:["Lethal Weapon","Predator","Die Hard","Commando"],
correct:2
},
{
question:"Which movie starred Tom Hanks as a child trapped in an adult body?",
answers:["Splash","Big","Turner & Hooch","Bachelor Party"],
correct:1
},
{
question:"Which movie features Daniel LaRusso?",
answers:["The Karate Kid","Teen Wolf","Stand By Me","Footloose"],
correct:0
},
{
question:"Who trained Daniel LaRusso?",
answers:["Mr Miyagi","Sensei Kreese","Johnny Lawrence","Dutch"],
correct:0
},
{
question:"Which film featured the DeLorean?",
answers:["WarGames","Back to the Future","Explorers","Short Circuit"],
correct:1
},
{
question:"Who played Ripley in Aliens?",
answers:["Jamie Lee Curtis","Sigourney Weaver","Linda Hamilton","Daryl Hannah"],
correct:1
},
{
question:"Which movie featured a giant Stay Puft Marshmallow Man?",
answers:["Ghostbusters","Gremlins","Big","Beetlejuice"],
correct:0
},
{
question:"Who played Beetlejuice?",
answers:["Jack Nicholson","Michael Keaton","Robin Williams","Jeff Goldblum"],
correct:1
},
{
question:"Which movie starred Patrick Swayze and Jennifer Grey?",
answers:["Flashdance","Footloose","Dirty Dancing","St Elmo's Fire"],
correct:2
},
{
question:"Which film introduced RoboCop?",
answers:["Predator","RoboCop","Running Man","Total Recall"],
correct:1
},
{
question:"Who played Sarah Connor in The Terminator?",
answers:["Linda Hamilton","Sigourney Weaver","Meg Ryan","Kim Basinger"],
correct:0
},
{
question:"Which movie featured the quote 'Wax on, wax off'?",
answers:["Teen Wolf","The Karate Kid","Stand By Me","The Outsiders"],
correct:1
},
{
question:"Who starred as John Rambo in the 1980s?",
answers:["Arnold Schwarzenegger","Sylvester Stallone","Bruce Willis","Mel Gibson"],
correct:1
},
{
question:"Which movie starred Michael Keaton as a bio-exorcist?",
answers:["Batman","Night Shift","Mr Mom","Beetlejuice"],
correct:3
},
{
question:"Who played Maverick?",
answers:["Tom Cruise","Val Kilmer","Patrick Swayze","Rob Lowe"],
correct:0
},
{
question:"Which movie featured the character Chunk?",
answers:["The Lost Boys","Explorers","The Goonies","Stand By Me"],
correct:2
},
{
question:"Who directed Back to the Future?",
answers:["Steven Spielberg","Robert Zemeckis","Ron Howard","George Lucas"],
correct:1
},
{
question:"Which movie featured Johnny Castle?",
answers:["Footloose","Dirty Dancing","Flashdance","Pretty in Pink"],
correct:1
}
];

const QUESTIONS_PER_GAME = 10;

// Shuffle and take first 10
const quiz = [...allQuestions]
  .sort(() => Math.random() - 0.5)
  .slice(0, QUESTIONS_PER_GAME);

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const progressBar = document.getElementById("progress-bar");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {

selectedAnswer = null;

const q = quiz[currentQuestion];

progressEl.textContent =
`Question ${currentQuestion + 1} of ${quiz.length}`;

// update progress bar
//const progressPercent = ((currentQuestion) / quiz.length) * 100;
//progressBar.style.width = progressPercent + "%";

questionEl.textContent = q.question;

answersEl.innerHTML = "";

q.answers.forEach((answer, index) => {

const btn = document.createElement("button");

btn.textContent = answer;
btn.className = "answer-btn";

btn.onclick = () => {

document.querySelectorAll(".answer-btn")
.forEach(b => b.classList.remove("selected"));

btn.classList.add("selected");
selectedAnswer = index;

};

answersEl.appendChild(btn);

});
}

nextBtn.addEventListener("click",()=>{

if(selectedAnswer === null) return;

if(selectedAnswer === quiz[currentQuestion].correct){
score++;
}

currentQuestion++;

// update progress bar
const progressPercent = (currentQuestion / quiz.length) * 100;
progressBar.style.width = progressPercent + "%";

if(currentQuestion < quiz.length){
loadQuestion();
}
else{
showResults();
}

});

function showResults(){

document
.getElementById("question-box")
.classList.add("hidden");

document
.getElementById("result-box")
.classList.remove("hidden");

document
.getElementById("score")
.textContent =
`${score} / ${quiz.length}`;

const percentage = Math.round((score / quiz.length) * 100);
let message = "";

if (percentage >= 90) {
  message = "🎥 80s Movie Legend!";
}
else if (percentage >= 75) {
  message = "🍿 Serious Film Buff!";
}
else if (percentage >= 50) {
  message = "📼 Casual 80s Fan!";
}
else {
  message = "📺 Time for an 80s movie marathon!";
}

document.getElementById("message").textContent = message;

}

loadQuestion();
