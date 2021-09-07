var maxOptions = 6;
var questionType;
var optionCount = 0;



    function showQuestions(){
        $("#questionShow").html(`<div class="divSection_title"><span class="material-icons md-36">grading</span>Add Question</div>
    
        <span class="spnSection_Content">
            <span class="spnSection_Content_Label"><label>Question</label><span class="material-icons">help</span></span>
            <textarea name="Text1" class="textNewArea" rows="5"></textarea>
        </span>
        <br/>
        <span class="spnSection_Content">
            <span class="spnSection_Content_Label"><label>Question Type</label><span class="material-icons"></span></span>
            <select name="questionType" id="questionType" onchange="selectQuestionType()">
                <option>Select a Question Type</option>
                <option value="1">Single Select Question Type</option>
                <option value="2">Multiple Select Question Type</option>
                <option value="3">True or False Question</option>
            </select>
        </span>
        <br/>`);
    
        //alert("Hello");    
    }

    function selectQuestionType() {
        questionType = $('#questionType').find(":selected").val();
        //alert(x);   
        if(questionType == 1){
            $("#mainSections").html('<div class="optionsContainer" id="optionContainer"><div class="divSection_Column_Single yellow-light" id="options"><span class="spnSection_Content"><span class="spnSection_Content_Label"><label>Options</label><span class="material-icons">help</span></span><div id='+optionCount+' class="optionSetDiv"><textarea name="Text1" class="textNewAreaOption" rows="5"></textarea><div class="btnCont"><input type="radio" id="radio0" name="radio" class="optionRadio" /><span class="material-icons removeBtn" onclick="deleteElement('+optionCount+')">remove_circle</span></div></div></span></div><div class="btnOptionSection"><input type="button" class="btnNew blueClolrBtn" id="addOpt" value="Add Option"  onclick="addOptions()"></div></div>');
       

        }else if( questionType == 2){
            $("#mainSections").html('<div class="optionsContainer" id="optionContainer"><div class="divSection_Column_Single yellow-light" id="options"><span class="spnSection_Content"><span class="spnSection_Content_Label"><label>Options</label><span class="material-icons">help</span></span><div id='+optionCount+' class="optionSetDiv"><textarea name="Text1" class="textNewAreaOption" rows="5"></textarea><div class="btnCont"><input type="checkbox" id="check0" name="check" class="optionRadio" /><span class="material-icons removeBtn" onclick="deleteElement('+optionCount+')">remove_circle</span></div></div></span></div><div class="btnOptionSection"><input type="button" class="btnNew blueClolrBtn" id="addOpt" value="Add Option" onclick="addOptions()"></div></div>');
            
        }else if( questionType == 3){

            $("#mainSections").html(`<div class="optionsContainer" id="optionContainer">
            <div class="divSection_Column_Single yellow-light">
                <span class="spnSection_Content">
                    <span class="spnSection_Content_Label"><label>Options</label><span class="material-icons">help</span></span>
                    <textarea name="Text1" class="textNewAreaOption" rows="5"></textarea><div class="btnCont"><input type="radio" id="radio1" name="radio" class="optionRadio" /></div>
                </span>

                <span class="spnSection_Content">
                <textarea name="Text1" class="textNewAreaOption" rows="5"></textarea><div class="btnCont"><input type="radio" id="radio1" name="radio" class="optionRadio" /></div>
                </span>
            </div>
        </div> `);
        }

        $("#addSubmit").html(`<input type="button" class="btnNew orangeClolrBtn" id="addSubmit" value="Submit">`);
    }

    function addOptions(){
        var options = $("#options textarea").length;
        //alert(options);

        if(options < maxOptions ){
            if(questionType == 1){
                optionCount++;
                $("#options").append('<span class="spnSection_Content"><div id='+optionCount+' class="optionSetDiv"><textarea name="Text1" class="textNewAreaOption" rows="5"></textarea><div class="btnCont"><input type="radio" id="radio'+optionCount+'" name="radio" class="optionRadio" /><span class="material-icons removeBtn" onclick="deleteElement('+optionCount+')" id="delete'+optionCount+'">remove_circle</span></div></div></span>');
            }else if(questionType == 2){
                optionCount++;
                $("#options").append('<span class="spnSection_Content"><div id='+optionCount+' class="optionSetDiv"><textarea name="Text1" class="textNewAreaOption" rows="5"></textarea><div class="btnCont" id="10"><input type="checkbox" id="check'+optionCount+'" name="radio" class="optionRadio" /><span class="material-icons removeBtn" onclick="deleteElement('+optionCount+')" id="delete'+optionCount+'">remove_circle</span></div></div></span>');
            }
           
        }else{
           $('#addOpt').prop('disabled', true);
        }
        //alert(options);
        
    }

    function deleteElement(del){
        //alert("Delete");
        var deleteParent = "#"+del;
        //var deleteSection = this.parentNode.id;
        $(deleteParent).remove();
        //$(this).parent().parent().parent().css({"color": "red", "border": "2px solid red"});
        // alert(deleteParent);
    }