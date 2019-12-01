  
  const request = require('request'); 
  const mysql   = require('mysql'); 
  
  module.exports = {
  
  /** 
   * return random image URLs from an API
   * @param string keyword - search term
   * @param int    imageCount - number of random images
   * @return array of image URLs
   */ 
  getRandomImages_cb: function getRandomImages_cb(keyword, imageCount, callback){
    var requestURL = "https://api.unsplash.com/photos/random?query"+keyword+"&count="+imageCount+"&client_id=4eadf1bde486105c677e65c2b63b3baaaeab99007b2a25704d6a5cfbe5104a83&orientation=landscape"    
    
    request(requestURL, function (error, response, body) {
     //console.log('error:', error); // Print the error if one occurred
     //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
     //console.log('body:', body); // Print the API data
     if(!error){
        var parsedData = JSON.parse(body); 
        // console.log("image url:", parsedData["urls"]["regular"]); 
        var imageURLs = [];
   
    for( let i = 0; i <9;  i++){
       imageURLs.push(parsedData[i].urls.regular); 
      }
       //console.log(imageURLs); 
        // passes by through object
        // return imageURLs;
        callback(imageURLs); 
      } else {
       console.log("error", error); 
  } 
  }); //request
  },
  
    /** 
   * return random image URLs from an API
   * @param string keyword - search term
   * @param int    imageCount - number of random images
   * @return array of image URLs
   */ 
    getRandomImages: function(keyword, imageCount){
    var requestURL = "https://api.unsplash.com/photos/random?query"+keyword+"&count="+imageCount+"&client_id=4eadf1bde486105c677e65c2b63b3baaaeab99007b2a25704d6a5cfbe5104a83&orientation=landscape"    
    
    return new Promise(function(resolve, reject){
    request(requestURL, function (error, response, body) {
     //console.log('error:', error); // Print the error if one occurred
     //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
     //console.log('body:', body); // Print the API data
     if(!error){
        var parsedData = JSON.parse(body); 
        // console.log("image url:", parsedData["urls"]["regular"]); 
        var imageURLs = [];
   
    for( let i = 0; i < imageCount;  i++){
       imageURLs.push(parsedData[i].urls.regular); 
      }
       //console.log(imageURLs); 
        // passes by through object
        // return imageURLs;
       
       resolve(imageURLs);
       
      } else {
       console.log("error", error); 
  } 
  }); //request
  }); //promise object to return
  }, // end of function
  
  
      /** 
   * return database connection
   * returns db connection
   */   
   
   //cannot seem to connect to database 
   
  createConnection : function(){
            
     var conn = mysql.createConnection({
          host:"cst336db.space",
          user:"cst336_dbUser022",
      password:"clpe6e",
      database:"cst336_db022"
      
                
            });
      return conn; 
  }
  
  } //end of exports