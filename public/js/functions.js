

  $(document).ready(function(){
     
     $(".favoriteIcon").on("click", function(){
         
         //alert($(this).prev().attr("src")); 
         
         var imageURL = $(this).prev().attr("src");
         
        // alert("it works");
        if($(this).attr("src") == "img/fav_off.png"){
          $(this).attr("src","img/fav_on.png");
          updateFavorite("add", imageURL);
        } else {
            $(this).attr("src", "img/fav_off.png");
            updateFavorite("delete", imageURL); //delete record from database
        }
        
        
     }); 
     
     $(".keywordLink").on("click", function(){
        
         $.ajax({
            method: "get",
            url: "/api/displayFavorites",
            data: {
                    "keyword" : $(this).text().trim(),
                    },
            success: function(rows, status) {
                
                $("#favorites").html("");
                rows.forEach(function(row){
                    
                    $("#favorites").append("<img class='image' src='"+row.imageURL+"' width='200' height='200'>");
                   
                   // $(this).attr("row.imageURL", "img/fav_on.png"); 
                    
                    
                });  // video 7 min 25 might be error
            }    
                    
          }); //ajax
         
     });
     
      function updateFavorite(action, imageURL) {
          
          $.ajax({
              method: "get",
                 url: "/api/updateFavorites",
                data: {"imageURL" : imageURL,
                       "keyword" : $("#keyword").val(),
                       "action"  : action 
                     
                      }
          }); //ajax
      }
  });