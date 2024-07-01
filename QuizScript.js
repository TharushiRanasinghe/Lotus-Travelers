//selecting all required elements
const start_Quz_btn = document.querySelector(".start_Quz_btn button");
const info_abt_Quz_box = document.querySelector(".info_abt_Quz_box");
const exit_Quz_btn = info_abt_Quz_box.querySelector(".buttons .quit_Quz");
const continue_Quz_btn = info_abt_Quz_box.querySelector(".buttons .reStart_Quz");
const quiz_box_boder = document.querySelector(".quiz_box_boder");
const upShot_box = document.querySelector(".upShot_box");
const alternative_List = document.querySelector(".alternative_List");
const tiMe_line = document.querySelector("header .tiMe_line");
const tiMe_Txt = document.querySelector(".timer .tiMe_left_txt");
const time_Count_Down = document.querySelector(".timer .tiMer_sec");

// if start_Quz_ button clicked
start_Quz_btn.onclick = () => {
  info_abt_Quz_box.classList.add("activeInfo"); //show info about Quz box
};

// if exit_Quz_ button clicked
exit_Quz_btn.onclick = () => {
  info_abt_Quz_box.classList.remove("activeInfo"); //hidding info about Quz box
};

// if continue_Quz_ button clicked
continue_Quz_btn.onclick = () => {
  info_abt_Quz_box.classList.remove("activeInfo"); //hiddinge info about Quz box
  quiz_box_boder.classList.add("activeQuiz"); //show about Quz  box
  showQuetions(0); //calling showQestions_ function
  queCounter(1); //passing 1 parameter to questions for Quering Counter
  startTimer(6); //calling startTimer_ function
  startTimerLine(0); //calling startTimerLine_ function
};

let available_time = 6;
let quizzing_count = 0;
let quizzing_number = 1;
let client_Score = 0;
let tally_counter;
let countertiMeLine;
let wid_value = 0;

const reStart_Quz = upShot_box.querySelector(".buttons .reStart_Quz");
const quit_Quz = upShot_box.querySelector(".buttons .quit_Quz");

// if restartQuiz button clicked
reStart_Quz.onclick = () => {
  quiz_box_boder.classList.add("activeQuiz"); //show quiz box
  upShot_box.classList.remove("activeResult"); //hide scores box
  available_time = 6;
  quizzing_count = 0;
  quizzing_number = 1;
  client_Score = 0;
  wid_value = 0;
  showQuetions(quizzing_count); //calling show_Qestions function
  queCounter(quizzing_number); //passing quizzing_number value to queCounter
  clearInterval(tally_counter); //clear tally_counter
  clearInterval(countertiMeLine); //clear countertiMeLine
  startTimer(available_time); //calling start_Timer function
  startTimerLine(wid_value); //calling startTimerLine_ function
  tiMe_Txt.textContent = "Time Left"; //change the text of tiMe_Txt to Time Left
  next_btn.classList.remove("show"); //hid the next button
};

// if quit_Quiz button clicked
quit_Quz.onclick = () => {
  window.location.reload(); //reload precent window
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_quizzing_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
  if (quizzing_count < questions_Quering.length - 1) {
    //if question count is less than total question length
    quizzing_count++; //increment the quizzing_count value
    quizzing_number++; //increment the quizzing_number value
    showQuetions(quizzing_count); //calling showQestions function
    queCounter(quizzing_number); //passing quizzing_number value to queCounter
    clearInterval(tally_counter); //clear tally_counter
    clearInterval(countertiMeLine); //clear countertiMeLine
    startTimer(available_time); //calling startTimer_ function
    startTimerLine(wid_value); //calling startTimerLine_ function
    tiMe_Txt.textContent = "Time Left"; //change the tiMe_Txt to Time Left
    next_btn.classList.remove("show"); //hid the next Que button
  } else {
    clearInterval(tally_counter); //clear tally_counter
    clearInterval(countertiMeLine); //clear countertiMeLine
    showResult(); //calling showResult function
  }
};

// getting quizzings and options from array
function showQuetions(index) {
  const que_txt = document.querySelector(".que_txt");

  //creating a new span and div tag for question and option and passing the value using array index
  let quez_tag =
    "<span>" +
    questions_Quering[index].numb +
    ". " +
    questions_Quering[index].question +
    "</span>";
  let alternative_tag =
    '<div class="option"><span>' +
    questions_Quering[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions_Quering[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions_Quering[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions_Quering[index].options[3] +
    "</span></div>";
  que_txt.innerHTML = quez_tag; //adding new span tag inside quez_tag
  alternative_List.innerHTML = alternative_tag; //adding new div tag inside alternative_tag

  const option = alternative_List.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
// creating the new div tags tick & cross which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on alternatives
function optionSelected(answer) {
  clearInterval(tally_counter); //clear tally_counter
  clearInterval(countertiMeLine); //clear countertiMeLine
  let userAns = answer.textContent; //getting user selected an alternative
  let correcAns = questions_Quering[quizzing_count].answer; //get the accurate answer from array
  const allOptions = alternative_List.children.length; //get the all option items

  if (userAns == correcAns) {
    //if user selected option is equal to array's accurate answer
    client_Score += 1; //upgrading score value with 1
    answer.classList.add("accurate"); //adding green color to accurate selected option
    answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to accurate selected option
    console.log("accurate Answer");
    console.log("Your accurate answers = " + client_Score);
  } else {
    answer.classList.add("inaccurate"); //adding red color to wrong selected option
    answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to wrong selected option
    console.log("Wrong Answer");

    for (i = 0; i < allOptions; i++) {
      if (alternative_List.children[i].textContent == correcAns) {
        //if there is an option which is matched to an array answer
        alternative_List.children[i].setAttribute("class", "option accurate"); //adding green color to matched option
        alternative_List.children[i].insertAdjacentHTML(
          "beforeend",
          tickIconTag
        ); //adding tick icon to matched option
        console.log("Auto selected accurate answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    alternative_List.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  next_btn.classList.add("show"); //show the next button if user selected any option
  setTimeout(function () {
    next_btn.click();
  }, 1000);
}

function showResult() {
  info_abt_Quz_box.classList.remove("activeInfo"); //hide info box
  quiz_box_boder.classList.remove("activeQuiz"); //hide quiz box
  upShot_box.classList.add("activeResult"); //show result box
  const scoreText = upShot_box.querySelector(".score_Txt");
  if (client_Score > 5) {
    // if user scored more than 3
    //creating a new span tag and passing the user score number and total question number
    let scoreTag =
      "<span class='green'>Congratulations!🎉, You got <p>" +
      client_Score +
      "</p> out of <p>" +
      questions_Quering.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag; //adding new span tag inside score_Txt
  } else if (client_Score > 1) {
    // if user scored more than 1
    let scoreTag =
      "<span class='orange'>Nice 😎, You got <p>" +
      client_Score +
      "</p> out of <p>" +
      questions_Quering.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let scoreTag =
      "<span class='red'>Sorry 😐, You got only <p>" +
      client_Score +
      "</p> out of <p>" +
      questions_Quering.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  tally_counter = setInterval(timer, 1000);
  function timer() {
    time_Count_Down.textContent = time; //changing the value of time_Count_Down with time value
    time--; //decrement the time value
    if (time < 9) {
      //if timer is less than 9
      let addZero = time_Count_Down.textContent;
      time_Count_Down.textContent = "0" + addZero; //add a 0 before time value
    }
    if (time < 0) {
      //if timer is less than 0
      clearInterval(tally_counter); //clear counter
      tiMe_Txt.textContent = "Time Up!"; //change the time text to time up
      const allOptions = alternative_List.children.length; //getting all option items
      let correcAns = questions_Quering[quizzing_count].answer; //getting accurate answer from array
      for (i = 0; i < allOptions; i++) {
        if (alternative_List.children[i].textContent == correcAns) {
          //if there is an option which is matched to an array answer
          alternative_List.children[i].setAttribute("class", "option accurate"); //adding green color to matched/accurate option
          alternative_List.children[i].insertAdjacentHTML(
            "beforeend",
            tickIconTag
          ); //adding tick icon to matching option
          console.log("Time Up!: Auto selected accurate answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        alternative_List.children[i].classList.add("disabled"); //once user select an option , disabled other all options
      }
      next_btn.classList.add("show"); //show the nextQuez button if user selected any option
      setTimeout(function () {
        next_btn.click();
      }, 1000);
    }
  }
}

function startTimerLine(time) {
  countertiMeLine = setInterval(timer, 15);
  function timer() {
    time += 1; //upgrading quz time value with 1
    tiMe_line.style.width = time + "px"; //increasing wid of tiMe_line with px by tiMe value
    if (time > 549) {
      //if time_value is greater than 549
      clearInterval(countertiMeLine); //clear countertiMeLine
    }
  }
}

function queCounter(index) {
  //creating a new span tag and go forwoaed to the question number and total question
  let totalQuesznCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions_Quering.length +
    "</p> Questions</span>";
  bottom_quizzing_counter.innerHTML = totalQuesznCounTag; //adding new span tag inside bottom_quizzing_counter
}
