
let timeleft=document.querySelector(".timeleft");
let quizcon=document.getElementById("con");
let nxt=document.getElementById("next");
let countques=document.querySelector(".ques");
let dispcon=document.getElementById("displaycon");
let scorecon=document.querySelector(".scorecon");
let restart=document.getElementById("restart");
let userscore=document.getElementById("userscore");
let startscreen=document.querySelector(".startscreen");
let startbtn=document.getElementById("startbutton");
let quescount;
let scorecount=0;
let count=11;
let countdown;

const quizarr=[{id:"0", question:"Who among the following wrote Sanskrit grammar?", 
options:["Kalidasa","Charak","Panini","Aryabhatt"], correct: "Panini",},
{id:"1", question:"The metal whose salts are sensitive to light is?", 
options:["Zinc"," Silver","Aluminum"," Copper"], correct: "Silver",},
{id:"2", question:" Volcanic eruption do not occur in the", 
options:["Baltic sea","Black sea","Caribbean sea","Caspian sea"], correct: "Baltic sea",},
{id:"3", question:"The hottest planet in the solar system?", 
options:["Mercury","Venus","Mars","Jupiter"], correct: "Venus",},
{id:"4", question:"Where was the electricity supply first introduced in India", 
options:[" Mumbai","Chennai","Darjeeling","Dehradun"], correct: "Darjeeling",},
{id:"5", question:"Which one of the following ports is the oldest port in India?", 
options:["Mumbai Port","Chennai Port","Kolkata Port","Vishakhapatnam Port"], correct: "Chennai Port",},
{id:"6", question:"Where can Coral reefs be found in India?", 
options:["The Malabar Coast","Rameshwaram","Mahabalipuram","Trivandrum"], correct: "Rameshwaram",},
{id:"7", question:"A change of the DNA of an organism resulting in a new trait is known as a ________", 
options:["Mitosis","Meiosis","Morphosis","Mutation"], correct: "Mutation",},
{id:"8", question:"In which year the first Nobel Prize was awarded?", 
options:["1901","1983","1864","1980"], correct: "1901",},
{id:"9", question:"Which bird can sleep while flying?", 
options:["Albatross","Owlet","Hornbill","Golden Pheasant"], correct: "Albatross",
},
];

restart.addEventListener("click", () => {
    initial();
    dispcon.classList.remove("hide");
    scorecon.classList.add("hide");
});

nxt.addEventListener("click",(displaynext=()=>{
    quescount+=1;
    if(quescount==quizarr.length){
        dispcon.classList.add("hide");
        scorecon.classList.remove("hide");
        userscore.innerHTML=" Your Score is "+scorecount+" out of "+quescount;
    }
    else{
        countques.innerHTML=quescount+ 1 +" of "+quizarr.length+" Question ";
        quizdisplay(quescount);
        count=11;
        clearInterval(countdown);
        timerdisplay();
    }
}));

const timerdisplay = () => {
    countdown= setInterval(() => {
        count--;
        timeleft.innerHTML=`${count}s`;
        if(count== 0){
            clearInterval(countdown);
            displaynext();
        }
    },1000);
};

const quizdisplay = (quescount)=>{
    let quizcards= document.querySelectorAll(".conmid");

    quizcards.forEach((card)=>{
        card.classList.add("hide");
    });

    quizcards[quescount].classList.remove("hide");
};


function quizcreator(){
    quizarr.sort(()=> Math.random - 0.5);
    for(let i of quizarr){
        i.options.sort(()=> Math.random - 0.5);
        let div = document.createElement("div");
        div.classList.add("conmid","hide");
        countques.innerHTML= 1 + " of " + quizarr.length + " Question";
        let quesdiv=document.createElement("p");
        quesdiv.classList.add("question");
        quesdiv.innerHTML=i.question;
        div.appendChild(quesdiv);

        div.innerHTML +=`
        <button class="optiondiv" onclick="checker(this)">
        ${i.options[0]}</button>
        <button class="optiondiv" onclick="checker(this)">
        ${i.options[1]}</button>
        <button class="optiondiv" onclick="checker(this)">
        ${i.options[2]}</button>
        <button class="optiondiv" onclick="checker(this)">
        ${i.options[3]}</button>
        
        `;
        quizcon.appendChild(div);

    }
}


function checker(useroption){
    let usersol=useroption.innerText;
    let question= document.getElementsByClassName("conmid")[quescount];
    let options= question.querySelectorAll(".optiondiv");

    if(usersol===quizarr[quescount].correct){
        useroption.classList.add("correct");
        scorecount++;
    } else{
        useroption.classList.add("incorrect"); 

        options.forEach((element) => {
            if(element.innerText==quizarr[quescount].correct){
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countdown);
    options.forEach((element)=>{
        element.disabled=true;
    });

}


function initial(){
    quizcon.innerHTML="";
    quescount=0;
    scorecount=0;
    count=11;
    clearInterval(countdown);
    timerdisplay();
    quizcreator();
    quizdisplay(quescount);
}

startbtn.addEventListener("click", () => {
    startscreen.classList.add("hide");
    dispcon.classList.remove("hide");
    initial();
});


window.onload = () => {
    startscreen.classList.remove("hide");
    dispcon.classList.add("hide");
};