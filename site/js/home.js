var question;
var correctAnswer;
var incorrectOptionOne;
var incorrectOptionTwo;
var incorrectOptionThree;
var incorrectOptionFour;
var jsonObjectSelected;
var json = "[{\"id\":\"1\",\"os\":\"2018050901\",\"cliente\":\"Jose\",\"problema\":\"Sem internet\",\"descricao\":\"Estou conectado na Rede mas não consigo acessar a internet\",\"ultimoEvento\":\"06:24 25/04/2018\"},{\"id\":\"1\",\"os\":\"2018050901\",\"cliente\":\"Paulo\",\"problema\":\"Fio partido\",\"descricao\":\"Passou um caminhão e patiu o fio\",\"ultimoEvento\":\"12:04 01/05/2018\"},{\"id\":\"1\",\"os\":\"2018050901\",\"cliente\":\"Fernanda\",\"problema\":\"Internet caiu\",\"descricao\":\"Estou sem internet desde ontem\",\"ultimoEvento\":\"16:28 04/05/2018\"}]"
var jsonObject = JSON.parse(json);



$(document).ready(function(){
	$("#search").on("keyup", function() {
	  var value = $(this).val().toLowerCase();
	  $("#body-os-table tr").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	  });
	});
  });

function loadTable(){

	jQuery.each(jsonObject, function (index, value) {
        if (typeof value == 'object') {
			var row = $('<tr></tr>');
			$('#body-os-table').append(row);
			$('<td></td>').attr({ class: ["col-0"]}).text(value.id).appendTo(row).hide();
			$('<td></td>').attr({ class: ["col-10"]}).text(value.os).appendTo(row);
			$('<td></td>').attr({ class: ["col-20"]}).text(value.cliente).appendTo(row);
			$('<td></td>').attr({ class: ["col-20"]}).text(value.problema).appendTo(row);
			$('<td></td>').attr({ class: ["col-30"]}).text(value.descricao).appendTo(row);
			$('<td></td>').attr({ class: ["col-10"]}).text(value.ultimoEvento).appendTo(row);
				
			var tdAction = $('<td></td>').attr({ class: ["col-10"]});
			var img = '<img id="imgView" src="images/view.png" alt="Visualizar informações detalhadas"> <img id="imgEdit" src="images/edit.png" alt="Editar informações">';
			tdAction.html(img).appendTo(row);			
        }
        else {
             alert(index + "   :   " + value);
        }
	});		
}






















//////////////////////////////////////
function sendForm(){
	
	question = $('#question').val();
	correctAnswer = $('#correctAnswer').val();
	incorrectOptionOne = $('#incorrectOptionOne').val();
	incorrectOptionTwo = $('#incorrectOptionTwo').val();
	incorrectOptionThree = $('#incorrectOptionThree').val();
	incorrectOptionFour = $('#incorrectOptionFour').val();
	
	if (question.trim() == "" ||
		correctAnswer.trim() == "" ||
		incorrectOptionOne.trim() == "" ||
		incorrectOptionTwo.trim() == "" ||
		incorrectOptionThree.trim() == "" ||
		incorrectOptionFour.trim() == ""){		
			showAlert(TIPO_ERROR, "ATENÇÃO! Todos os campos do formulário são obrigatórios.");		
	}else{		
		$('#formQuestion').submit();		
		var object = setObject();
		//updateJson();
	}		
}

	$('#selectCategory').change( function(e) {
		var selSelection = $("#selectCategory").val();
		if(selSelection == "Todas as categorias"){
			$("#questionTable tr").show();
		} else {
			$("#questionTable tr").show().filter(function(index){
				return $("td:eq(1)", this).html().indexOf(selSelection) == -1;
			}).hide();
		}
	});

function setObject(){

	var questionAndAnswer = {
		question:question,
		correctAnswer:correctAnswer,
		incorrectOptionOne:incorrectOptionOne,
		incorrectOptionThree:incorrectOptionThree,
		incorrectOptionFour:incorrectOptionFour
	};

	var jsonQA = JSON.stringify(questionAndAnswer);
	return jsonQA;

}

function updateJson(){	
		try {
			// Create an instance of StreamReader to read from a file.
			sr = new StreamReader("TestFile.txt");
			// Read and display lines from the file until the end of the file is reached.
			line = sr.ReadLine();
			while (line != null) {
				print(line);
				line = sr.ReadLine();
			}
			sr.Close();
		}
		catch (e) {
			// Let the user know what went wrong.
			//print("The file could not be read:");
			//print(e.Message);
		}
	
}


function actionModal(){

	if ($("#buttonAction").text() == "Salvar"){
		$('#myModal').modal('toggle');
		showAlert(TIPO_SUCCESS, "As informações foram salvas com sucesso.");
	}else{
		var questionModal = $("#questionModal");
		var correctAnswerModal = $("#correctAnswerModal");
		var incorrectOptionOneModal = $("#incorrectOptionOneModal");
		var incorrectOptionTwoModal = $("#incorrectOptionTwoModal");
		var incorrectOptionThreeModal = $("#incorrectOptionThreeModal");
		var incorrectOptionFourModal = $("#incorrectOptionFourModal");
		
		questionModal.prop( "disabled", false );
		correctAnswerModal.prop( "disabled", false );
		incorrectOptionOneModal.prop( "disabled", false );
		incorrectOptionTwoModal.prop( "disabled", false );
		incorrectOptionThreeModal.prop( "disabled", false );
		incorrectOptionFourModal.prop( "disabled", false );

		$("#buttonAction").text("Salvar")
	}
	

}
function openModal(that){
	var idSelected = that.parent().parent().find('td:first').text();	
	for (var i = 0 ; i < jsonObject.length ; i++){
		if (jsonObject[i].id == idSelected){
			jsonObjectSelected = jsonObject[i];				
			$('#myModal').modal('toggle');
			break;

		}
	}

	var questionModal = $("#questionModal");
	var correctAnswerModal = $("#correctAnswerModal");
	var incorrectOptionOneModal = $("#incorrectOptionOneModal");
	var incorrectOptionTwoModal = $("#incorrectOptionTwoModal");
	var incorrectOptionThreeModal = $("#incorrectOptionThreeModal");
	var incorrectOptionFourModal = $("#incorrectOptionFourModal");
	
	questionModal.val(jsonObjectSelected.question);
	correctAnswerModal.val(jsonObjectSelected.answer);
	incorrectOptionOneModal.val(jsonObjectSelected.optionOne);
	incorrectOptionTwoModal.val(jsonObjectSelected.optionTwo);
	incorrectOptionThreeModal.val(jsonObjectSelected.optionThree);
	incorrectOptionFourModal.val(jsonObjectSelected.optionFour);

	if (that.attr("id") == "imgEdit"){
		questionModal.prop( "disabled", false );
		correctAnswerModal.prop( "disabled", false );
		incorrectOptionOneModal.prop( "disabled", false );
		incorrectOptionTwoModal.prop( "disabled", false );
		incorrectOptionThreeModal.prop( "disabled", false );
		incorrectOptionFourModal.prop( "disabled", false );

		$("#buttonAction").text("Salvar")
	}else{
		questionModal.prop( "disabled", true );
		correctAnswerModal.prop( "disabled", true );
		incorrectOptionOneModal.prop( "disabled", true );
		incorrectOptionTwoModal.prop( "disabled", true );
		incorrectOptionThreeModal.prop( "disabled", true );
		incorrectOptionFourModal.prop( "disabled", true );
		$("#buttonAction").text("Alterar")
	}
}








function init(){
	loadTable();
	
	$('#imgView').click( function(){
		openModal($(this));
	});	

	$('#imgEdit').click( function(){
		openModal($(this));
	});
}