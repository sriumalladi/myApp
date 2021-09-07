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
var options;
var score = 0;
var points  = 10;




xmlhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        levels = Object.keys(myObj).length;
        //TotalQuestions = myObj.Level1.Question.length;
        x = myObj.Level1.Question.length; // Total Questions

        options = myObj.Level1.Question[0].Option.length;       
        optionList = myObj.Level1.Question[0].Option;
        

        //y = myObj.Level2.Question.length;
        //z = myObj.Level3.Question.length;
        level1 = document.getElementById('questionDisplay');
        level1Opt = document.getElementById('optionsDisplay');
        //level2 = document.getElementById('pills-level2');
       // level3 = document.getElementById('pills-level3');
        level1Questions = myObj.Level1;
       // level2Questions = myObj.Level2;
       // level3Questions = myObj.Level3;
        level1.innerHTML = '';
        level1Opt.innerHTML = '';
       // level2.innerHTML = '';
      //  level3.innerHTML = '';

       // level1.innerHTML = "<li><a href='#' class='myList'>"+ level1Questions.Question[0].Text +"</a></li>";

       /*for(var j = 0; j < options; j++ ){
            level1Opt.innerHTML += "<div class='options'><input type='radio' name='answers' id='option"+j+"' /><label for='option"+j+"'> "+ optionList[j].Text + "</label></div>";
            //isCorrect = myObj.Level1.Question[0].Option[j].isCorrect;

            //alert(optionList[j].Text);

            //alert(myObj.Level1.Question[0].Option[j].isCorrect);
        }*/

        
    }
};


var updateQuestions = function(questionCount){

        level1.innerHTML +=  level1Questions.Question[questionCount].Text;

        optionList = myObj.Level1.Question[questionCount].Option;

        //console.log();
        qType = myObj.Level1.Question[questionCount].Type;

        
       

        


        //console.log(qType +" "+ isCorrect);

        for(var j = 0; j < options; j++ ){
            if(qType ==="SINGLE_SELECT"){
                level1Opt.innerHTML += "<div class='options'><input type='radio' name='answers' id='option"+j+"' class='radio' /><label for='option"+j+"'> "+ optionList[j].Text + "</label></div>";
            }else{
                level1Opt.innerHTML += "<div class='options'><input type='checkbox' name='answers' id='option"+j+"' class='checkbox'/><label for='option"+j+"'> "+ optionList[j].Text + "</label></div>";
            }                    
        }

       /* $('input').change(function() {
            if($(this).is(":checked")) {
                //var returnVal = "checked";
                $(this).attr("checked");
            }
            alert($("#optionsDisplay input:checked").length);        
        }); */

        return;
            
}




xmlhttp.open("GET", "js/assessmentData.json", true);
xmlhttp.send();