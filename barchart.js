
// This will force the whole document to load before preforming 
// jQuery functions
$(function(){
  //Initial Properties!
  let data = [20, 2, 3, 4, 10, 3, 12, 5, 45];
  //title, height and width of chart!
  let options = ["Bar Graphs using jQuery", 500, 800];
  let element = "DOM/jQuery";
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
  //generating x-axis
  function generateXAxis(data, options) {
    let stretchFactor = 1;
    if (data.length > 8) {
      stretchFactor = 2.5;
    }
    $('.bars').css({
      color: '#fff',
      'font-size': '11px',
      'font-weight': '600',
      'background': '#555',
      margin: '0',
      'padding': '0',
      'display': 'inline-block',
      'width': `${(options[2] - 100)}px`,
      height: `${options[1]}px`,
      'box-shadow': '0 0 10px 0 #555',
      'border-radius': '5px'
    });
    
    $('.bars li').css({
      display: 'table-cell',
      width: `${(options[2] - 100 ) / data.length}px`,
      height: `${options[1]}px`,
      position: 'relative'
    });
    
    $('.bars span').css({
      width: '100%',
      position: 'absolute',
      bottom: '-30px',
      'text-align': 'center'
    });
    
    
    $('.bars li .bar').css({
      display: 'block',
      background: '#0d1a6e', 
      width: `${(options[2] - 100) / data.length / 2}px`,
      position: 'absolute',
      bottom: '0',
      'margin-left': 25 * 5 / data.length + 'px',
      'text-align': 'center',
      'box-shadow': '0 0 10px 0 rbga(13, 26, 110, 0.5)',
      'transition': '0.5s',
      'transition-prperty': 'background, box-shadow'
    });
    /*
    .bars .bar:hover{
      background: #375247;
      box-shadow:  0 0 10px 0 rgba(55, 82, 71, 0.5);
      cursor: pointer;
    }
    */
    
    $('.bars .bar').mouseenter(function(){
      $(this).css({
        background: '#0d1a6e',
        'box-shadow':  '0 0 10px 0 rgba(55, 82, 71, 0.5)',
        cursor: 'pointer'
      });
    });
    
    $('.bars .bar').mouseleave(function(){
      $(this).css({
        background: '#90e0c1',
        'box-shadow':  '0 0 10px 0 rbga(13, 26, 110, 0.5)',
      });
    });

    /*
    $('.bars .bar:hover').css({
      background: '#375247',
      'box-shadow':  '0 0 10px 0 rgba(55, 82, 71, 0.5)',
      cursor: 'pointer'
    });
    */
    /*
    .bars .bar:before{
      color: #fff;
      content: attr(data-num);
    }
    */
  }
  
  // This will generate y-axis once we have our values
  function generateYAxis(options){
    $('.chart').css ({
      width: options[2] + "px",
      height: options[1] + "px",
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
      'height': options[1]/2 + "px",
      position: 'relative',
      bottom: options[1]/2 - 5 + "px"
      });
    $('.numbers span').css({
      'font-size': '12px',
      'font-weight': '600',
      'position': 'absolute',
      'bottom': '0',
      'right': '10px'
    })
  }
  
  //main function
  function drawBarGraph(data, options){
    //Adding tite
    $('h1').append(options[0]);
    $('h1').css('height', options[1]+ 100 + 'px');
    //calling saving biggest num to avoid looping again
    let bigNumber = biggestNumber(data);
    //adding y-axis values to html
    $('.numbers').append(`<li><span class="top">${bigNumber}</span></li>`);
    $('.numbers').append(`<li><span class="middle">${bigNumber/2}</span></li>`);
    $('.numbers').append('<li><span class="bottom">0</span></li>');
    generateYAxis(options);  

    for(let i = 0; i < data.length; i++) {
      if (i < 9) {
        $('.bars').append(`<li><div class="bar" data-num="${data[i]}"></div><span>Option 0${i + 1}</span></li>`);
      } else if (i >= 9){
        $('.bars').append(`<li><div class="bar" data-num="${data[i]}"></div><span>Option ${i + 1}</span></li>`);
      }
      
    }
    generateXAxis(data, options);
    // our bar values are scaled as a percentage of the y-axis height
    $('.bars li .bar').each(function(key, bar){
      var percentage = ($(this).data('num')) / bigNumber * 100;
      $(this).animate({
        'height' : percentage + '%'
      }, 1000)
    });
    
  }
  //Calling the function to drawa the bar graph
  drawBarGraph(data, options);


 
  
  
});

