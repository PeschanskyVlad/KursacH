$(document).ready(function(){

  var validTitle = false;
  var validCategory = false;
  var validSum = false;
  var validText = false;

  $("#newa").submit(function(event){

    console.log("New article");
    event.preventDefault();

    var atitle = $("#atitle").val();
    var acategory = $("#acategory").val();
    var asummary = $("#asummary").val();
    var atext = $("#atext").val();

    if(atitle == "") {
      $("#atitle").parent().removeClass("has-success").addClass("has-error");
      $(".atitleBlock").append("<span class='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'></span>");
      $(".atitleBlock .glyphicon-ok").remove();
      validTitle = false;
    } else {
      $("#atitle").parent().removeClass("has-error").addClass("has-success");
      $(".atitleBlock").append("<span class='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>");
      $(".atitleBlock .glyphicon-remove").remove();
      validTitle = true;
    }

    if(acategory == "") {
      $("#acategory").parent().removeClass("has-success").addClass("has-error");
      $(".acategoryBlock").append("<span class='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'></span>");
      $(".acategoryBlock .glyphicon-ok").remove();
      validCategory = false;
    } else {
      $("#acategory").parent().removeClass("has-error").addClass("has-success");
      $(".acategoryBlock").append("<span class='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>");
      $(".acategoryBlock .glyphicon-remove").remove();
      validCategory = true;
    }

    if(asummary == "") {
      $("#asummary").parent().removeClass("has-success").addClass("has-error");
      $(".asummaryBlock").append("<span class='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'></span>");
      $(".asummaryBlock .glyphicon-ok").remove();
      validSum = false;
    } else {
      $("#asummary").parent().removeClass("has-error").addClass("has-success");
      $(".asummaryBlock").append("<span class='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>");
      $(".asummaryBlock .glyphicon-remove").remove();
      validSum = true;
    }

    if(atext == "") {
      $("#atext").parent().removeClass("has-success").addClass("has-error");
      $(".atextBlock").append("<span class='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'></span>");
      $(".atextBlock .glyphicon-ok").remove();
      validText = false;
    } else {
      $("#atext").parent().removeClass("has-error").addClass("has-success");
      $(".atextBlock").append("<span class='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>");
      $(".atextBlock .glyphicon-remove").remove();
      validText = true;
    }

    if(validTitle == true && validCategory == true&& validSum == true&& validText == true) {
      $("form").unbind('submit').submit();
    }

  });

});
