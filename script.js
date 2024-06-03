const questions =[
    {
        question:"Which one of the following rivers has the largest basin area?",
        answers:[
             {text: "Nile",correct:false},
             {text: "Amazon",correct:true},
             {text: "Yamuna",correct:false},
             {text: "Satluj",correct:false},
        ]
    },
    {
        question:"Wall Street is located in … ",
        answers:[
             {text: "UK",correct:false},
             {text: "USA",correct:true},
             {text: "Russia",correct:false},
             {text: "Italy",correct:false},
        ]
    },
    {
        question:"Atomic Energy Commission is located in …",
        answers:[
             {text: "Jadugoda",correct:false},
             {text: "Mumbai",correct:true},
             {text: "Hyderabad",correct:false},
             {text: "Trombay",correct:false},
        ]
    },
    {
        question:"What is the total charge of the electric dipole?",
        answers:[
             {text: "+1",correct:false},
             {text: "0",correct:true},
             {text: "2",correct:false},
             {text: "-1",correct:false},
        ]
    },
   {
    question:"Which among the following is major component of Gobar Gas?",
    answers:[
         {text: "propane",correct:false},
         {text: "ethane",correct:false},
         {text:"methane",correct:true},
         {text: "butane",correct:false},
    ]
   },
   {
    question:"Brass gets discoloured in air because of the presence of which of the following gases in air?",  //
    answers:[
         {text: "Oxygen",correct:false},
         {text: "Hydrogen sulphide",correct:true},
         {text: "Nitrogen",correct:false},
         {text: "carbon dioxide",correct:false},
    ]
   },
   {
    question:"Which of the following is a non metal that remains liquid at room temperature?",  //
    answers:[
         {text: "Sodium",correct:false},
         {text: "Phosphorous",correct:false},
         {text: "Bromine",correct:true},
         {text: "Aluminium",correct:false},
    ]
   },
   {
    question:"Chlorophyll is a naturally occurring chelate compound in which central metal is",       //
    answers:[
         {text: "Sodium",correct:false},
         {text: "Magnisium",correct:true},
         {text: "iron",correct:false},
         {text: "Aluminium",correct:false},
    ]
   },
   {
    question:"Which of the following metals forms an amalgam with other metals?",   //
    answers:[
         {text: "Mercury",correct:true},
         {text: "Tin",correct:false},
         {text: "lead",correct:false},
         {text: "Zinc",correct:false},
    ]
   },
   {
    question:"Washing soda is the common name for",  //
    answers:[
         {text: "Calcium bicarbonate",correct:false},
         {text: "Sodium carbonate",correct:true},
         {text: "Sodium bicarbonate",correct:false},
         {text: "Calcium carbonate",correct:false},
    ]
   }
]
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
const timeEelement=document.getElementById("timer");


let currentQuestionIndex=0;
let score=0;
let time ;
const total_time=20;
let sec=total_time;

function timer(){
    timeEelement.innerHTML=sec;
    sec--;
    if(sec==0){
        sec=total_time;
        clearInterval(time);
        currentQuestionIndex++;
        showQuestion();
    }

}
function startQuiz(){
    currentQuestionIndex=0;
    nextButton.innerHTML="Next";
    showQuestion();

}
function resetState(){
    nextButton.style.display="none";
    //timeEelement.style.display="none";

    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion(){
    resetState();

     sec=total_time;
     clearInterval(time);
     timer();
     time=setInterval(timer,1000);

      let currentQuestion=questions[currentQuestionIndex]; 
     let  questionNo=currentQuestionIndex+1;
     questionElement.innerHTML=questionNo + "." + currentQuestion.question;

     currentQuestion.answers.forEach( answer => {
        const button= document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
     });
    
}
function selectAnswer(e){
const selectBtn=e.target;
const isCorrect=selectBtn.dataset.correct === "true";
if(isCorrect){
    selectBtn.classList.add("correct");
    score++;
}else{
    selectBtn.classList.add("incorrect");
   }
   Array.from(answerButtons.children).forEach(button =>{
    if(button.dataset.correct==="true"){
        button.classList.add("correct");
    }
    button.disabled="true";
   });
   nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=` you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
    timeEelement.style.display="none";
    clearInterval(time);
    score=0;
}
   function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
    showQuestion();
    }else{
        showScore();
    }
   }


nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();