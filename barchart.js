/*
let data = [1, 2, 3, 4, 5];
let options = ["Title", "Y-axis", "x-axis", "height", "width"];
let element = "DOM/jQuery";
*/
// This will force the whole document to load before preforming 
// jQuery functions
$(function(){
  let data = [1, 2, 3, 4, 10];
  //This function will sort out the maximum y-axis value from data
  function biggestNumber(data) {
    let biggestNum = 5;
    for(let i = 0; i < data.length; i++) {
    if (data[i] > biggestNum) {
      biggestNum = data[i];
    }
  };
  return biggestNum;
  }
  
  
  // This will generate y-axis once we have our values
  function generateYAxis(){
    $('.chart').css ({
      width: '600px',
      height: '300px',
      display: 'block'
    });
    $('.numbers') .css( {
      color: '#fff',
      margin: '0',
      padding: '0',
      width: '50px',
      height: '100%',
      display: 'inline-block',
      float: 'left'
      });
    
    $('.numbers li') .css( {
      'list-style': 'none',
      'height': '150px',
      position: 'relative',
      bottom: '145px'
      });
    $('.numbers span').css({
      'font-size': '12px',
      'font-weight': '600',
      'position': 'absolute',
      'bottom': '0',
      'right': '10px'
    })
  }
  
  function drawBarGraph(data){
    $('.numbers').append(`<li><span class="top">${biggestNumber(data)}</span></li>`);
    $('.numbers').append(`<li><span class="middle">${biggestNumber(data)/2}</span></li>`);
    $('.numbers').append('<li><span class="bottom">0</span></li>');
    generateYAxis();  
    $('.bars li .bar').each(function(key, bar){
      var percentage = $(this).data('num');
      $(this).animate({
        'height' : percentage + '%'
      }, 1000)
    });
   
  }
  //Calling the function to drawa the bar graph
  drawBarGraph(data);
  

 
  
  
});

