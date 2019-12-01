const express  = require("express");
const app      = express(); 

app.set('view engine ,ejs'); 
app.use(express.static("public"));

const request  = require("request"); 
const mysql    = require("mysql");
const tools    = require("./tools.js"); 

//routes

// ------ root routes ------

  //request 1
  app.get("/", async function(req, res){
 
     var imageURLs = await tools.getRandomImages("", 1);
     //console.log("imageURLs using promises: " + imageURLs);
     res.render("index.ejs", {"imageURLs": imageURLs});

  });  //root route
  
  //request 2
  app.get("/search", async function(req, res){
     // console.log(req.query.keyword);
     var keyword = req.query.keyword;
     
     var imageURLs = await tools.getRandomImages(keyword, 9);
     console.log("imageURLs using promises: " + imageURLs);
     res.render("results.ejs", {"imageURLs": imageURLs , "keyword": keyword});
     
    // getRandomImages_cb(keyword, 9, function(imageURLs){
    //     console.log("imageURLs: " + imageURLs);
    //      res.render("results.ejs", {"imageURLs": imageURLs});
    // })
     
  }); //search
  
  app.get("/api/updateFavorites", function(req, res){
      
      var conn = tools.createConnection();  
      var sql;
      var sqlParams;
      
      if(req.query.action == "add") {
         sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?,?)";
         sqlParams = [req.query.imageURL, req.query.keyword]; 
      } else {
          sql = "DELETE FROM favorites WHERE imageURL = ?";
          sqlParams = [req.query.imageURL];
      }
      conn.connect( function(err){     
          if(err) throw err; 
          
          conn.query(sql, sqlParams, function(err, result){
              if(err) throw err;
          }); //query
          
          
      }); // connection
      
      res.send("it Works!"); 
  }); //update favorites

   app.get("/displayKeywords", async function(req, res){
       
      var imageURLs = await tools.getRandomImages("", 1); 
      var conn = tools.createConnection();
      var sql = "SELECT DISTINCT keyword FROM favorites ORDER BY keyword"; //min 3 of video database lect7
      
        
        conn.connect(function(err){
           
            if(err) throw err;
            conn.query(sql, function(err, result){
               if(err) throw err; 
               res.render("favorites.ejs", {"rows":result, "imageURLs": imageURLs});
               
               
            });//query
        }); //connect
   
   app.get("/api/displayFavorites", function(req, res){
       var conn = tools.createConnection();
       var sql = "SELECT imageURL FROM favorites WHERE keyword = ?";
       var sqlParams = [req.query.keyword]; 
       
       conn.connect(function(err){
           
          if(err) throw err;
          conn.query(sql, sqlParams, function(err, results){
              if(err) throw err; 
              res.send(results);
               
               
            });//query
        }); //connect
    }); //display end of        
        
        
        
        
        
   });//end of display keyword
//--------- server listener ------------
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("express server is running...")
});