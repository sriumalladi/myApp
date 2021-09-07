let questionCount = 0;



function addQuestions(x){

    //var questionTitle;
    //var questionDisplay;
    var questionOptions = "";
    $("#optionSection").html("");
    $("#questionSection").css("display", "none");   
    $("#optionSection").css("display", "flex");
   
    questionOptions +='<div class="qtypetopSection" id="aboutQuestion"><h3>Add Assessment</h3><span>Instructions: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span></div>';

    questionOptions += '<div class="addQuestion" id="myQuestion"><label for="question">Question</label><textarea rows="3" placeholder="Type your question here..." id="question"></textarea></div>';


    if(x == 1){
       // $("#optionSection").html("");
        var optionValue1 = $('[name="options1"]').find(":selected").val();

       questionOptions +='';
               
        for( var i = 1; i <= optionValue1; i++){
            questionOptions += '<div class="addOptions"><div class="optText">Option '+i+'</div><div class="firstLine"><div class="optionSet"><input type="radio" name="options" id="option'+i+'" ><textarea rows="2" placeholder="Type your Option here..."></textarea></div><div class="nextLine"><textarea rows="2" placeholder="Type Feedback" class="feedback"></textarea></div></div></div>';

            $("#myOptions").html(questionOptions);
            //alert(i);
        }
       


    }else if( x==2){ 
        var optionValue2 = $('[name="options2"]').find(":selected").val();
            
        for( var i = 1; i <= optionValue2; i++){
            questionOptions += '<div class="addOptions"><div class="optText">Option '+i+'</div><div class="firstLine"><div class="optionSet"><input type="checkbox" name="options" id="option'+i+'" ><textarea rows="2" placeholder="Type your Option here..."></textarea></div><div class="nextLine"><textarea rows="2" placeholder="Type Feedback" class="feedback"></textarea></div></div></div>';

            $("#myOptions").html(questionOptions);
            //alert(i);
        }
        

    }else if(x==3){

        questionOptions += '<div class="addOptions"><div class="optText">Option 1</div><div class="firstLine"><div class="optionSet"><input type="radio" name="options" id="option1" ><textarea rows="2" placeholder="Type your Option here..."></textarea></div><div class="nextLine"><textarea rows="2" placeholder="Type Feedback" class="feedback"></textarea></div></div></div><div class="addOptions"><div class="optText">Option2</div><div class="firstLine"><div class="optionSet"><input type="radio" name="options" id="option2" ><textarea rows="2" placeholder="Type your Option here..."></textarea></div><div class="nextLine"><textarea rows="2" placeholder="Type Feedback" class="feedback"></textarea></div></div></div>';


    }

    questionOptions += '<div class="questionFeedback"><label>Feedback</label><textarea rows="2" placeholder="Add Feedback for Correct Answer..." class="commonFeedback"></textarea>     <textarea rows="2" placeholder="Add Feedback for incorrect answer..." class="commonFeedback"></textarea></div><div class="buttonSection"><input type="button" class="cancel" placeholder="Cancel" id="cancel" value="Cancel" onclick="cancelQuestion()"/><input type="button" class="save" placeholder="Save" id="save" value="Save" onclick="saveQuestion()"/></div>';

   $("#optionSection").html(questionOptions);
}

function saveQuestion(){
  
    if ($('input[name="options"]:checked').length == 0) {
        alert('Please select at Least one Option.');
        return false; } 
         else {
            var message = $('#question').val();
            var res = message.substring(0, 20);
            questionCount++;
            $("#questionList").append($("<li><a href='#' class='myList' onclick='showQuestion("+questionCount+")'>"+res+"</a></li>"))
             alert(res);
            $("#optionSection").css('display', 'none');
            $("#questionSection").css('display', 'flex');
      }
      return false;

    
}

function cancelQuestion(){
    $("#optionSection").css('display', 'none');
    $("#questionSection").css('display', 'flex');
}

function showQuestion(n){
    //alert("Hello");
    
    $("#optionSection").css("display", "none");
    $("#questionSection").css("display", "none");
    $("#resultSection").css("display","Flex");
}
  