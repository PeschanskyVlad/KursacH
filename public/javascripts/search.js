

$(function(){
 $("#search").keyup(function(){

     var parameters = { search: $(this).val() };
     var result;
       $.getJSON( '/search', parameters, function(data) {
         console.log(data);
         $.each(data, function() {
           result += "<div class='panel panel-default'>";
           result +=  "<div class='panel-heading'><a href=" + this.address + ">" + this.aname + "</a></div>";

           result += "</div>";
           console.log(result);
         });

       $('#results').html(result);
     });

 });
});
