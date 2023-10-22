const quiz_Questions = [
    {
        question: "You need a weapon what do you choose:",
        answer: [
            {text:"Your fists", extrovert: true},
            {text:"Archery", extrovert: false },
            {text:"Sword" ,extrovert: false },
            {text:"Knife",  extrovert: true },
           
        ]
    },
    {
        question: "Choose a power: ",
        answer: [
            {text:"Invisibility " , extrovert: false },
            {text:"Healing", extrovert: true },
            {text:"Flying " , extrovert: false },
            {text:"Super strength", extrovert: true},
           
        ]
    },
    {
        question: "You have to pick a road. Do you ",
        answer: [
            {text:"Go the direct path you already know but long" , routine: true},
            {text:"Grab a boat and go", routine: false },
            {text:"Woods is dangerous but shorter", routine: false },
            {text:"Go on a road with a map", routine: true},
           
        ]
    },
    {
        question: "A monster shows up. How should you defeat him",
        answer: [
            {text:"Fight him with your weapon", routine: false },
            {text:"Hide", routine: true},
            {text:"Throw something at it" , routine: false },
            {text:"Talk it out" , routine: true},
           
        ]
    },
    {
        question: "You  find people that are lost in the forest",
        answer: [
            {text:"Do you lead them" , Leader: true},
            {text:"Suggest where they can find help" , Leader: false},
            {text:"Do you give them directions", Leader: true},
            {text:"Don’t help they seem suspicious", Leader: false},
           
        ]
    },
    {
        question: "choose your companion",
        answer: [
            {text:"Fast Cat" , Leader:  true},
            {text:"Vision Bird" ,Leader: true},
            {text:"Buff Ants" , Leader: false },
            {text:"Good bite Dog" , Leader: false},
           
        ]
    },
    {
        question: "A wall you need to cross with a guard",
        answer: [
            {text:"Dig a hole and go under", creative: true },
            {text:"Build a ladder with things you find around you" , creative: true },
            {text:"Look for any hidden entrance", creative: false },
            {text:"Bargain with the guard" , creative: false},
           
        ]
    },
    {
        question: "You meet a turtle what do you do?",
        answer: [
            {text:"Say hi(but judge the turtle)" , creative: false },
            {text:"Ignore the turtle" , creative: false},
            {text:"Ask the turtle a question" , creative: true },
            {text:"Befriend the turtle" , creative: true},
           
        ]
    },
    {
        question: "Someone asks for money. Do you",
        answer: [
            {text:"give it to them" , purpose: true},
            {text:"Give a little" , purpose: true },
            {text:"trade it for something" , purpose:false },
            {text:"Apologize", purpose: false },
           
        ]
    },
    {
        question: "What is your adventure:",
        answer: [
            {text:"Chasing a bounty", purpose: false },
            {text:"Become the strongest in the realm" , purpose: false},
            {text:"Save your bestie(turtle)" ,purpose: true},
            {text:"Explore the world and learn" , purpose: true},
           
        ]
    }
    

];
/*
const careerOptions = [
    {
        career_array: ["introver","spontaneous","follower", "money", "analytical"],
        career: "Computer Science"
    },
    {
        career_array: ["extrovert", "spontaneous" , "follower" , "purpose", "analytical"],
        career: "HealthCare"
    },
    {
        career_array: ["extrovert", "spontaneous", "money" , "creative"],
        career: "Business"
    },{
        career_array: ["creative" , "routine", "leader", "purpose","analytical" ],
        career: "Psych"
    },
    {
        career_array: ["introvert", "routine", "follower", "purpose", "analytical"  ],
        career: "Psych"
    },{
        career_array: ["extrovert", "spontaneous" , "leader", "purpose" , "creative"  ],
        career: "Psych"
    }
]
*/
//pulling in html
const question_elem = document.getElementById("question");
const userAnswer = document.getElementById("answerBtns");
const nextBtn = document.getElementById("next_question");

//scoring traits
let promptInxdex = 0;
let extrovert_score = 0;
let introvert_score =0;
let routine_score = 0;
let spontaneous_score = 0;
let leader_score = 0;
let follower_score = 0;
let purpose_score =0;
let money_score = 0;
let creative_score = 0;
let analytical_score = 0;
let result ="";

//career arrays
const computerScience = ["1","0","0", "0", "0"];
const healthCare = ["2", "1" , "0" , "2", "0"];
const business = ["1", "0", "0" , "2"];
const psych = ["1" , "2", "2", "2","0" ];
const law = ["2", "1", "0", "1", "0"  ];
const art = ["2", "0" , "2", "2" , "2"  ];
const RealEstate = ["2", "0", "0", "2", "0"];
const GraphicDesign = ["2", "1", "0" , "0", "2"];
const marketing = ["2", "0", "2", "0", "0", "0"];
const researcher = ["0", "0" , "0", "2", "2"];
const doctor = ["2" , "2", "0", "2", "0"];

let user_anser_array =[];

//start quiz
function beginQuiz(){
    promptInxdex = 0;
    user_score_array = [];
    answer_promt = [];
    
    extrovert_score =0;
    routine_score = 0;
    leader_score = 0;
    purpose_score = 0;
    creative_score = 0;
    
   nextBtn.innerHTML = "Next";
    displayPrompts();

    
}

function displayPrompts(){
    resetPrompts();
    let displayedQuestion = quiz_Questions[promptInxdex];
    let promptNum = promptInxdex + 1;
    question_elem.innerHTML = promptNum + ": " + displayedQuestion.question;
    displayedQuestion.answer.forEach(answers =>{
        const btn = document.createElement("button");
        btn.innerHTML = answers.text;
        btn.classList.add("btn");
        userAnswer.appendChild(btn);

        //store score for each trait
        if(answers.extrovert){
            btn.dataset.extrovert = answers.extrovert;
        }else if(answers.routine){
            btn.dataset.routine = answers.routine;
        }else if(answers.Leader){
            btn.dataset.Leader = answers.Leader;
        }else if(answers.creative){
            btn.dataset.creative = answers.creative;
        }else if(answers.purpose){
            btn.dataset.purpose = answers.purpose;
        }


        btn.addEventListener("click", promptResults );

    });
}
function resetPrompts(){
    nextBtn.style.display = "none";
    while(userAnswer.firstChild){
        userAnswer.removeChild(userAnswer.firstChild);
    }
}


//needed so that the answer options appear - linked to the display prompts function
function promptResults(e){
    const btnSelect = e.target;
    const isExtrovert = btnSelect.dataset.extrovert ==="true";
    const isRoutine = btnSelect.dataset.routine ==="true";
    const isLeader = btnSelect.dataset.law ==="true";
    const isCreative = btnSelect.dataset.creative ==="true";
    const isPurpose = btnSelect.dataset.purpose ==="true";

    if(isExtrovert){
        btnSelect.classList.add("extrovert");
        extrovert_score++;
    }else{
        btnSelect.classList.add("introvert");
    }
    
    if(isRoutine){
        btnSelect.classList.add("routine");
        routine_score++;
    }else{
        btnSelect.classList.add("spontaneous");
    }
       
    if(isLeader){
        btnSelect.classList.add("leader");
        leader_score++;
    }else{
        btnSelect.classList.add("follower");
    }
    
    if(isPurpose){
        btnSelect.classList.add("purpose");
        purpose_score++;
    }else{
        btnSelect.classList.add("money");
    }
        
    if(isCreative){
        btnSelect.classList.add("creative");
        creative_score++;
    }else{
        btnSelect.classList.add("analytical");
    }
    
    Array.from(userAnswer.children).forEach(btn => {
        if(btn.dataset.extrovert){
            btn.classList.add("extrovert");
        }else if(btn.dataset.routine){
            btn.classList.add("routine")
        }else if(btn.dataset.Leader){
            btn.classList.add("leader")
        }else if(btn.dataset.purpose){
            btn.classList.add("purpose")
        }else if(btn.dataset.creative){
            btn.classList.add("creative")
        }
        btn.ariaDisabled = true;
    });
    
    
   nextBtn.style.display = "block";
}

function user_Result(){
    resetPrompts();

   // const careers = sortCareer();
   const user_anser_array = [];
   user_anser_array.push(extrovert_score ,routine_score, leader_score, purpose_score , creative_score);
   const result = ""

   if(computerScience.length === user_anser_array.length){
        result = "computerScience";
   }else if(healthCare.length === user_anser_array.length)
   {
    result = "health care";
   }else if(business.length === user_anser_array.length)
   {
    result = "Business";
   }else if(psych.length === user_anser_array.length)
   {
    result = "psych";
   }else if(law.length === user_anser_array.length)
   {
    result = "law";
   }else if(art.length === user_anser_array.length)
   {
    result = "Art";
   }else if(researcher.length === user_anser_array.length)
   {
    result = "researcher";
   }else if(GraphicDesign.length === user_anser_array.length)
   {
    result = "Graphic Design";
   }else if(GraphicDesign.length === user_anser_array.length)
   {
    result = "Graphic Design";
   }else if(doctor.length === user_anser_array.length)
   {
    result = "Doctor";
   }else if(marketing.length === user_anser_array.length)
   {
    result = "Marketing";
   }else{
    //default statement if score doesnt match any career path
//result = "computerScience";
    }


    //output the answer
    question_elem.innerHTML = `end of quiz! ${result} `;
    nextBtn.innerHTML = `Back TO Home Page!`;
   // nextBtn.style.display = "block";
}

function nextBtn_funct(){
    promptInxdex++;
    if(promptInxdex < quiz_Questions.length){
        displayPrompts();
    }else{
        user_Result();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(promptInxdex < quiz_Questions.length){
        nextBtn_funct();
    }else{
        beginQuiz();
    }
});

beginQuiz();


