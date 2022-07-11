// This will force the whole document to load before preforming 
// jQuery functions
$(function(){

  //This variable will provide information on user changes to graph
  let changeBarGraph = [];
  //Initial Properties!
  let data = [20, 2, 3, 4, 10, 3, 12];
  let options = ["Bar Graphs using jQuery", 300, 600];
  //User passes jQuery or DOM element. Currently only coded 
  // using jQuery.
  let element = "jQuery";

  //User input data will be parsed and processed
  $('#bi').on("click", function() {
    options = ["Bar Graphs using jQuery", 300, 600];
    let userData = $('#ti').val();
    $(this).css('cursor', 'pointer');
    //this function returns an array to let us know which settings 
    //will be altered and which settings will remain default
    changeBarGraph = userInput(userData);
    if (changeBarGraph[0] == 1) {
      options[0] = changeBarGraph[1];
    }; 
    //changing height and width, respectively
    options[1] = changeBarGraph[2];
    options[2] = changeBarGraph[3];
    data = changeBarGraph[4]

    //titleMaker(options);
    drawBarGraph(data, options, element);
  });
  
  

  //MAIN Function
  function drawBarGraph(data, options, element){
    if (element === "jQuery" || element === "jquery") {
    //Adding tite
    titleMaker(options);
    //calling saving biggest num to avoid looping again
    let bigNumber = biggestNumber(data);
    //adding y-axis values to HTML
    addingYaxis(bigNumber);
    generateYAxis(options);  
    //adding x-axis values to HTML
    addingBars(data);
    generateXAxis(data, options, bigNumber);
    }
  }
  //Calling the function to drawa the bar graph
  drawBarGraph(data, options, element);
});



//user input parser and formatting
// this function will return a truth array 
//[title?, height?, width?, xAxis?, yAxis?, valuesArray?[num,ColorString...]]
// example: title Bar Charts, 300, 500,xaxis profit,yaxis year, [3, '#851738', '1993', 22, 33, 44, 55]
function userInput(userData) {
  
  let returnArray = [];
  //checking for user data for title
  returnArray.push(...titleParse(userData));
  // find width and height and adding it to return array using the spread operator
  returnArray.push(...findWidthHeight(userData));
  returnArray.push(dataParse(userData));

  return returnArray;
};

//will return a data object with all the user inputs!
function dataParse (userData) {
  let dataArray = [];
  let boolArray = false;
  let numString = "";
  for(let i = 0; i < userData.length; i++) {
    if (userData[i] === "[") {
      boolArray = true;
    } else if (userData[i] !== " " && userData[i] !== "]" && userData[i] !== "," && boolArray) {
      numString += userData[i];

    } else if (userData[i] === "," && numString.length !== 0) {
      //checking if the data is a number and adding it to array
      if(isNaN(Number(numString))=== false) {
        dataArray.push(Number(numString));
      }
      numString = "";
    } else if (userData[i] === "]" && boolArray) {
      //checking if the data is a number and adding it to array
      if(isNaN(Number(numString)) === false) {
        dataArray.push(Number(numString));
      }
      return dataArray;
    }
  }
  return [20, 2, 3, 4, 10, 3, 12];
};

//title formatting
function titleParse(userData) {
  //checking if there is title data
  let titleSpot = userData.search("title");
  let titleString = "";
  let returnArray = [];
  if(titleSpot === - 1){
    titleSpot = userData.search("Title");
  }
  if(titleSpot === - 1){
    returnArray.push(0);
    returnArray.push(0);
  } else {
    returnArray.push(1);
    let i = titleSpot + 5;
    // adding the title to the titleString
    while (userData[i] !== "," && i < userData.length) {
      // checking if the first character is a space and adding the rest
      if ((i === titleSpot + 5 && userData[i] !== " ")|| i > titleSpot + 5) {
        titleString += userData[i];
      }
      i++;
    }
    i = 0;
    returnArray.push(titleString);
  }
  return returnArray;
}

// findind width and height from parsed user data
function findWidthHeight(userData) {
  let parsedInputs = [];
  let indiCommands = ""; 
  let heightWidth = []; // 1 by 2 array [height, width]

  //We will parse out the inputs by commas and remove spaces
  for (let i = 0; i < userData.length; i++) {
    if (userData[i] !== "," && userData[i] !== " ") {
      indiCommands += userData[i];
    } else if (userData[i] === ",") {
      console.log(indiCommands);
      parsedInputs.push(indiCommands);
      indiCommands = "";
    }
    //adds final command
    if (i === userData.length - 1) {
      parsedInputs.push(indiCommands);
    }
  }
  console.log(parsedInputs);
  //checks if the commands are numbers and takes the first two numbers
  for (let i = 0; i < parsedInputs.length; i++) {
    if (isNaN(Number(parsedInputs[i])) === false && heightWidth.length < 2) {
      //making sure number is bigger than 100
      if(Number(parsedInputs[i]) > 150) {
        heightWidth.push(Number(parsedInputs[i]));
      }
    }
  }

  if (heightWidth.length === 1) {
    heightWidth[1] = 600;
  } else if ( heightWidth.length === 0) {
    heightWidth[0] = 300;
    heightWidth[1] = 600;
  }

  return heightWidth; //returns width and height
}


//adding y-axis elements into HTML
function addingYaxis(bigNumber) {
  $('.numbers').empty()
  $('.numbers').append(`<li><span class="top">${bigNumber}</span></li>`);
  $('.numbers').append(`<li><span class="middle">${bigNumber/2}</span></li>`);
  $('.numbers').append('<li><span class="bottom">0</span></li>');
};

//adding x-axis elements into HTML
function addingBars(data) {
  $('.bars').empty()
  for(let i = 0; i < data.length; i++) {
    if (i < 9) {
      $('.bars').append(`<li><div class="bar" data-num="${data[i]}"></div><span>Option 0${i + 1}</span></li>`);
    } else if (i >= 9){
      $('.bars').append(`<li><div class="bar" data-num="${data[i]}"></div><span>Option ${i + 1}</span></li>`);
    } 
  }
};

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


// Y-axis CSS formatting
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
    'height': options[1]/2 + "px", //sizing height of y-axis values
    position: 'relative',
    bottom: options[1]/2 - 5 + "px" //relative positions of numbers
    });

  $('.numbers span').css({
    'font-size': '12px',
    'font-weight': '600',
    'position': 'absolute',
    'bottom': '0',
    'right': '10px'
  })
}


//Generating x-axis, bars using CSS formatting
function generateXAxis(data, options, bigNumber) {
  
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
  
  // x-axis labels 
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
    //scaling images based on a 600 px wide and 300px source image
    'margin-left': 25 * options[2] * 5 / data.length / 600  + 'px',
    'text-align': 'center',
    'box-shadow': '0 0 10px 0 rbga(13, 26, 110, 0.5)',
    'transition': '0.5s',
    'transition-prperty': 'background, box-shadow'
  });
  
  //These two functions allow for mouseover interactiveness
  $('.bars .bar').mouseenter(function(){
    $(this).css({
      background: '#000000',
      'box-shadow':  '0 0 10px 0 rgba(55, 82, 71, 0.5)',
      cursor: 'pointer'
    });
  });
  
  $('.bars .bar').mouseleave(function(){
    $(this).css({
      background: '#0d1a6e',
      'box-shadow':  '0 0 10px 0 rbga(55, 82, 71, 0.5)',
    });
  });
  

  //Bar values are scaled as a percentage of the y-axis height
  $('.bars li .bar').each(function(){
    var percentage = ($(this).data('num')) / bigNumber * 100;
    $(this).animate({
      'height' : percentage + '%'
    }, 1000)
  });
}

function titleMaker(options) {
  $('h1').replaceWith(`<h1>${options[0]}</h1>`);
  $('h1').css({
    'height': options[1]+ 100 + 'px',
    'position': 'absolute',
    'font-size': '40px',
    'color': '#ad4e05',
    'text-align': 'center'
  })
}