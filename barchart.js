/*
let data = [1, 2, 3, 4, 5];
let options = ["Title", "Y-axis", "x-axis", "height", "width"];
let element = "DOM/jQuery";

const drawBarChart = function (data, options, element) {
  if (element === "jQuery" || element === "jquery") {

  } else if (element === "DOM" || element === "dom") {

  }
}
css('width', "400px")
drawBarChart(data, options, element);
*/
drawBarChart();

function drawBarChart() {
        
  $("h1").hide().show(2000);
  $("#div1").css('font-size', "50px");
  $("#div1").css('width', "200px").delay(3000).queue(function() {
      $("#div1").css('width', "400px")
    });

  $("#div1")
    .append('<div class="child">Append</div>')
    .append('<div class="child">Repo</div>');
  
  
  
}

