var xmlhttp = new XMLHttpRequest();
var myObj;
var levels;
var TotalQuestions;
var x;
var y;
var z;
var level1;
var level2;
var level3;
var level1Questions;
var level2Questions;
var level3Questions;
var attrId;
var qPath;
var qType;
var inputType;
var isCorrect;
var options;
var optionList = '';
var tQ = null;

$(function () {
    tQ = x + y + z;
    $("#totalQuestions").html(tQ + ' Questions');
    //console.log(tQ);

    $(".delete").click(function () {
        //alert($(this).attr('id'));
        $.confirm({
            title: 'Please Confirm!',
            content: 'Do you want to Delete this Question Completely? ',
            buttons: {
                confirm: function () {
                    $.alert('Deleted!');
                },
                cancel: function () {
                    $.alert('Canceled!');
                },
            }
        });


        delete myObj.Level1.Question[0];

    });

    $(".edit").click(function(){
        level1Questions.Question[1].Text = "Srinivas";
        alert("Change Done");
    });

   

    $(".myList").click(function () {
        // $('main').css('filter', 'blur(8px)');
        attrId = $(this).attr('id');
        $("#qNumber").text(attrId);
        var topHead = '';
        var i;
        var j;
        var correct;
        var incorrect;
        $("#optionSection").css("display", "none");
        $("#questionSection").css("display", "none");
        $("#resultDisplay").css("display","Flex");

        $("#qNumber").text(function () {
            topHead += $(this).text().substring(0, 6);
            topHead += ': Question';
            topHead += $(this).text().substring(10, 12);
            i = $(this).text().substring(10, 12) - 1;
            j = $(this).text().substring(5, 6);
            m = $(this).text().substring(0, 6);
            console.log( i + j + m);
            

            if (j == 1) {
                qPath = level1Questions.Question[i].Text;
                qType = level1Questions.Question[i].Type;
                options = level1Questions.Question[i].Option;
                //isCorrect = level1Questions.Question[i].Option.isCorrect;
                correct = level1Questions.Question[i].Feedback.Correct;
                incorrect = level1Questions.Question[i].Feedback.Incorrect;

                

            } else if (j == 2) {
                qPath = level2Questions.Question[i].Text;
                qType = level2Questions.Question[i].Type;
                options = level2Questions.Question[i].Option;
                // isCorrect = level2Questions.Question[i].Option.isCorrect;
                correct = level2Questions.Question[i].Feedback.Correct;
                incorrect = level2Questions.Question[i].Feedback.Incorrect;
            } else if (j == 3) {
                qPath = level3Questions.Question[i].Text;
                qType = level3Questions.Question[i].Type;
                options = level3Questions.Question[i].Option;
                //isCorrect = level3Questions.Question[i].Option.isCorrect;
                correct = level3Questions.Question[i].Feedback.Correct;
                incorrect = level3Questions.Question[i].Feedback.Incorrect;
            }

            if (qType === "SINGLE_SELECT") {
                //alert("Single Select");
                inputType = 'radio';

            } else {
                inputType = 'checkbox';
            }
            $(options).each(function () {
                var showOptions = $(this)[0].Text;
                var checked = $(this)[0].isCorrect;
                if (checked === 1) {
                    var selectCorrect = "checked";
                } else {
                    selectCorrect = '';
                }
                optionList += '<div class="addOptions"><div class="firstLine"><div class="optionSet"><input class="form-check-input" type="' + inputType + '" name="radioOption" ' + selectCorrect + '><textarea id="answer1" rows="2" class="form-control ml-3" name="answer1">' + showOptions + '</textarea></div><div class="nextLine"><textarea id="answer1" rows="2" class="form-control ml-3" name="answer1">Feedback</textarea></div></div></div>';
                // alert(optionList);
            })
            $("#qNumber").html(topHead);
        });

      //$("#Options").html('<div class="form-group row p-2"><label for="question1" class="col-sm-2 col-form-label"><b>Question</b></label><div class="col-sm-10"><textarea rows="3" class="form-control" id="' + attrId + '">' + qPath + '</textarea></div></div><div class="form-group row"><label for="answer1" class="col-sm-2 col-form-label"><b>Options</b></label><div class="col-lg-9 col-sm-3" id="trueFalse">' + optionList + '</div></div><div class="form-group row"><label for="question1" class="col-sm-2 col-form-label"><b>Feedback</b></label><div class="col-lg-5 col-sm-4 mb-2"><textarea rows="3" class="form-control pb-m-2" id="question1">' + correct + '</textarea></div><div class="col-sm-5"><textarea rows="3" class="form-control" id="question1">' + incorrect + '</textarea></div></div><div class="form-group row"><div class="col-10"></div><div class="d-flex col-12 justify-content-end"><button type="submit" class="btn btn-secondary mr-2">Cancel</button> <button type="submit" class="btn btn-success">Save</button></div></div>');

       $("#Options").html('<div class="optionSection1"><div class="addQuestion" id="myQuestion"><label for="question">Question</label><textarea rows="3" placeholder="Type your question here..." id='+ attrId +'>'+ qPath +'</textarea></div ><div class="addOptionsResult"><div class="optText">Options</div>'+optionList+'</div><div class="questionFeedback"><label>Feedback</label><textarea rows="3" class="commonFeedback"> '+ correct +' </textarea><textarea rows="3" class="commonFeedback">'+correct+'</textarea></div><div class="buttonSection"><input type="button" class="cancel" placeholder="Cancel" id="cancel" value="Cancel" onclick="cancelQuestion()"/><input type="button" class="edit" placeholder="Save" id="save" value="Save"/></div></div>');



        // $("#qNumber").text(topHead);
        //alert($(this).attr('id'));
        //delete myObj.Level1.Question[0];
        //console.log();
        $("main").css("filter", "blur(8px)");
        return optionList = '';
    });


});

xmlhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        levels = Object.keys(myObj).length;
        TotalQuestions = myObj.Level1.Question.length;
        x = myObj.Level1.Question.length;
        y = myObj.Level2.Question.length;
        z = myObj.Level3.Question.length;
        level1 = document.getElementById('questionList');
        //level2 = document.getElementById('pills-level2');
       // level3 = document.getElementById('pills-level3');
        level1Questions = myObj.Level1;
       // level2Questions = myObj.Level2;
       // level3Questions = myObj.Level3;
        level1.innerHTML = '';
       // level2.innerHTML = '';
      //  level3.innerHTML = '';



        // level1.innerHTML += '<div class="d-flex flex-row w-100"><a href="#" class="btn-light p-2 m-3 rounded">Delete</a></div>';
        // level2.innerHTML += '<div class="d-flex flex-row w-100"><a href="#" class="btn-light p-2 m-3 rounded">Delete</a></div>';
        // level3.innerHTML += '<div class="d-flex flex-row w-100"><a href="#" class="btn-light p-2 m-3 rounded">Delete</a></div>';

        for (var i = 0; i < x; i++) {
            var serial = i + 1;
          // level1.innerHTML += '<div class="d-flex flex-row flex-fill w-100 mb-1"><div class="d-flex flex-column bg-grey-50 p-3">' + serial + '.' + '</div><div class="col-lg-10 col-md-8 p-2 bg-grey-50 d-flex flex-column text-left" id="Level1Questions' + serial + '"><h4>' + level1Questions.Question[i].Text + '</h4></div><div class="p-2 bg-grey-50 d-flex flex-column align-content-lg-end flex-grow-1"><a id="level1Edit' + serial + '" class="edit text-orange-light text-center" href="#" data-target="#myModal2" id="addquestions" data-toggle="modal"><i class="material-icons"><h3>create</h3></i></a></div><div class="p-2 bg-grey-50 d-flex flex-column align-content-lg-end"><a id="level1Delete' + serial + '" class="text-orange-light delete" href="#" data-toggle="tooltip" title="Delete"><i class="material-icons"><h3>delete</h3></i></a></div></div>';
           level1.innerHTML += "<li><a href='#' class='myList' id='level1Edit"+ serial +"'>"+ level1Questions.Question[i].Text +"</a></li>";

        }



        for (var i = 0; i < y; i++) {
            var serial = i + 1;
           // level2.innerHTML += '<div class="d-flex flex-row flex-fill w-100 mb-1"><div class="d-flex flex-column bg-grey-50 p-3">' + serial + '.' + '</div><div class="col-lg-10 col-md-8 p-2 bg-grey-50 d-flex flex-column text-left" id="Level2Questions' + serial + '"><h4>' + level2Questions.Question[i].Text + '</h4></div><div class="p-2 bg-grey-50 d-flex flex-column align-content-lg-end flex-grow-1"><a id="level2Edit' + serial + '" class="edit text-orange-light text-center" href="#" data-target="#myModal2" id="addquestions" data-toggle="modal"><i class="material-icons"><h3>create</h3></i></a></div><div class="p-2 bg-grey-50 d-flex flex-column align-content-lg-end"><a id="level2Delete' + serial + '" class="text-orange-light delete" href="#" data-toggle="tooltip" title="Delete"><i class="material-icons"><h3>delete</h3></i></a></div></div>';

        }

        for (var i = 0; i < z; i++) {
            var serial = i + 1;
           // level3.innerHTML += '<div class="d-flex flex-row flex-fill w-100 mb-1"><div class="d-flex flex-column bg-grey-50 p-3">' + serial + '.' + '</div><div class="col-lg-10 col-md-8 p-2 bg-grey-50 d-flex flex-column text-left" id="Level3Questions' + serial + '"><h4>' + level3Questions.Question[i].Text + '</h4></div><div class="p-2 bg-grey-50 d-flex flex-column align-content-lg-end flex-grow-1"><a id="level3Edit' + serial + '" class="edit text-orange-light text-center" href="#" data-target="#myModal2" id="addquestions" data-toggle="modal"><i class="material-icons"><h3>create</h3></i></a></div><div class="p-2 bg-grey-50 d-flex flex-column align-content-lg-end"><a id="level3Delete' + serial + '" class="text-orange-light delete" href="#" data-toggle="tooltip" title="Delete"><i class="material-icons"><h3>delete</h3></i></a></div></div>';

        }
    }
};

xmlhttp.open("GET", "js/assessmentData.json", true);
xmlhttp.send();

