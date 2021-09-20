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
var options;
var score = 0;
var points = 10;
var questionCount = -1;
var displayQuestions = 5;





xmlhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        levels = Object.keys(myObj).length;
        //TotalQuestions = myObj.Level1.Question.length;
        x = myObj.Level1.Question.length; // Total Questions






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




var updateQuestions = function (questionCount) {

    options = myObj.Level1.Question[questionCount].Option.length;
    optionList = myObj.Level1.Question[questionCount].Option;


    level1.innerHTML += level1Questions.Question[questionCount].Text;

    optionList = myObj.Level1.Question[questionCount].Option;

    //console.log();
    qType = myObj.Level1.Question[questionCount].Type;







    //console.log(qType +" "+ isCorrect);

    for (var j = 0; j < options; j++) {
        if (qType === "SINGLE_SELECT") {
            level1Opt.innerHTML += "<div class='options'><input type='radio' name='answers' id='option" + j + "' class='radio' /><label for='option" + j + "'> " + optionList[j].Text + "</label></div>";
        } else {
            level1Opt.innerHTML += "<div class='options'><input type='checkbox' name='answers' id='option" + j + "' class='checkbox'/><label for='option" + j + "'> " + optionList[j].Text + "</label></div>";
        }
    }

    /* $('input').change(function() {
         if($(this).is(":checked")) {
             //var returnVal = "checked";
             $(this).attr("checked");
         }
         alert($("#optionsDisplay input:checked").length);        
     }); */
    console.log(qType + " " + options + " " + x);

    return;

}

function showQuestions() {
    document.getElementById("container").style.display = "flex";
    document.getElementById("quizPage").classList.add("fadeIn");

    glowEffect.rotation.y = 0;
    glowEffect.position.x = 27;
    glowEffect.position.z = 26;
    glowParticles.start(500);
    setTimeout(function () {
        key.position.x = 27;
        key.position.z = 26;
    }, 2000);

    if (questionCount < displayQuestions) {
        questionCount++;
    }

    updateQuestions(questionCount);
}

$("#addQuestion").click(function () {
    showQuestions();
});


$("#sumbitBtn").click(function () {
    var checkedOptions = $("#optionsDisplay input:checked").length;
    var getIndex = $("#optionsDisplay input:checked");
    var radioButtons = $("#optionsDisplay input");



    if (checkedOptions > 0) {
        if (qType === 'SINGLE_SELECT') {
            for (var i = 0; i < checkedOptions; i++) {
                if ($("#optionsDisplay input:checked")) {
                    var selectedIndex = radioButtons.index(getIndex[i]);
                }
                var n = [];
                n.push(myObj.Level1.Question[questionCount].Option[selectedIndex].isCorrect);
                //console.log(checkedOptions);
            }

            if (n.includes(1) === true) {
                document.getElementById("container").style.display = "none";
                glowParticles.stop();
                var topParent = selectedBox.parent;
                var animationToPlay = boxAnimationPairs[topParent.name];
                if (topParent.parent) {
                    topParent = topParent.parent;
                }
                open.start(true, 1.0, open.from, open.to, false);
                setTimeout(function () {
                    for (var i = 0; i < scene.animationGroups.length; i++) {
                        if (scene.animationGroups[i].name === animationToPlay) {
                            scene.animationGroups[i].play();
                        }
                    }

                }, 1000);
                glowEffect.rotation.y = positionY;
                glowEffect.position.x = positionX;
                glowEffect.position.z = positionZ;
                glowParticles.start(2000);
                setTimeout(function () {
                    open.stop();
                    key.position.x = positionX;
                    key.position.z = positionZ;
                    key.rotation.y = positionY;
                }, 3500);

                console.log("Correct");
            } else {
                document.getElementById("container").style.display = "none";
                var topParent = selectedBox.parent;
                var animationToPlay = boxAnimationPairs[topParent.name];
                if (topParent.parent) {
                    topParent = topParent.parent;
                }
                open.start(true, 1.0, open.from, open.to, false);
                setTimeout(function () {
                    for (var i = 0; i < scene.animationGroups.length; i++) {
                        if (scene.animationGroups[i].name === animationToPlay) {
                            scene.animationGroups[i].play();
                        }
                    }

                }, 1000);
                setTimeout(function () {
                    open.stop();
                }, 3000);
                console.log("Wrong 1");
            }

        } else {

            if (checkedOptions >= 2) {
                var correctOptions = [];
                for (var i = 0; i < options; i++) {
                    correctOptions[i] = myObj.Level1.Question[questionCount].Option[i].isCorrect;

                }

                function getOccurrence(array, value) {
                    var count = 0;
                    array.forEach((v) => (v === value && count++));
                    return count;
                }

                if (getOccurrence(correctOptions, 1) === $("#optionsDisplay input:checked").length) {

                    for (var i = 0; i < checkedOptions; i++) {
                        if ($("#optionsDisplay input:checked")) {
                            var selectedIndex = radioButtons.index(getIndex[i]);
                        }
                        var n = [];
                        n.push(myObj.Level1.Question[questionCount].Option[selectedIndex].isCorrect);
                        console.log(checkedOptions);
                    }

                    if (n.includes(1) === true) {
                        document.getElementById("container").style.display = "none";
                        glowParticles.stop();
                        var topParent = selectedBox.parent;
                        var animationToPlay = boxAnimationPairs[topParent.name];
                        if (topParent.parent) {
                            topParent = topParent.parent;
                        }

                        open.start(true, 1.0, open.from, open.to, false);
                        setTimeout(function () {
                            for (var i = 0; i < scene.animationGroups.length; i++) {
                                if (scene.animationGroups[i].name === animationToPlay) {
                                    scene.animationGroups[i].play();
                                }
                            }

                        }, 1000);
                        glowEffect.rotation.y = positionY;
                        glowEffect.position.x = positionX;
                        glowEffect.position.z = positionZ;
                        glowParticles.start(2000);
                        setTimeout(function () {
                            open.stop();
                            key.position.x = positionX;
                            key.position.z = positionZ;
                            key.rotation.y = positionY;
                        }, 3500);
                        console.log("Correct");
                    } else {
                        document.getElementById("container").style.display = "none";
                        var topParent = selectedBox.parent;
                        var animationToPlay = boxAnimationPairs[topParent.name];
                        if (topParent.parent) {
                            topParent = topParent.parent;
                        }
                        open.start(true, 1.0, open.from, open.to, false);
                        setTimeout(function () {
                            for (var i = 0; i < scene.animationGroups.length; i++) {
                                if (scene.animationGroups[i].name === animationToPlay) {
                                    scene.animationGroups[i].play();
                                }
                            }

                        }, 1000);
                        setTimeout(function () {
                            open.stop();
                        }, 3000);
                        console.log("Wrong2");
                    }
                } else {
                    document.getElementById("container").style.display = "none";
                    var topParent = selectedBox.parent;
                    var animationToPlay = boxAnimationPairs[topParent.name];
                    if (topParent.parent) {
                        topParent = topParent.parent;
                    }
                    open.start(true, 1.0, open.from, open.to, false);
                    setTimeout(function () {
                        for (var i = 0; i < scene.animationGroups.length; i++) {
                            if (scene.animationGroups[i].name === animationToPlay) {
                                scene.animationGroups[i].play();
                            }
                        }

                    }, 1000);

                    setTimeout(function () {
                        open.stop();
                    }, 3000);

                    console.log("Wrong3");
                }


            } else {
                document.getElementById("container").style.display = "none";
                var topParent = selectedBox.parent;
                var animationToPlay = boxAnimationPairs[topParent.name];
                if (topParent.parent) {
                    topParent = topParent.parent;
                }
                open.start(true, 1.0, open.from, open.to, false);
                setTimeout(function () {
                    for (var i = 0; i < scene.animationGroups.length; i++) {
                        if (scene.animationGroups[i].name === animationToPlay) {
                            scene.animationGroups[i].play();
                        }
                    }

                }, 1000);

                setTimeout(function () {
                    open.stop();
                }, 3000);

                console.log("Wrong4");
            }
        }

    } else {
        alert("Please select at least one option!");
    }
});




xmlhttp.open("GET", "scripts/js/assessmentData.json", true);
xmlhttp.send();