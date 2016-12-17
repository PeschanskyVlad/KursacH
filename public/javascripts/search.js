$(function(){
 $('#search').on('keyup', function(e){
   if(e.keyCode === 13) {
     var parameters = { search: $(this).val() };
     var result = '';
     console.log("here");

       $.getJSON( '/searching', parameters, function(data) {

         if(data!=""){
            $.each(data, function() {
           result += "<div class='panel panel-default'>";
           result +=  "<div class='panel-heading'><a href=" + this.address + ">" + this.aname + "</a></div>";

           result += "</div>";


          });
        }else{
        result += "<div class='panel panel-warning'><div class='panel-body'>Nothing.</div></div>";
        }


          $('#results').html(result);
        });


          };
         });
        });
