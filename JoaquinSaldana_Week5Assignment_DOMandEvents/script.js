/*
 * Student: Joaquin Saldana 
 * Course: CS290_400 / Web Development 
 * Assignment: DOM and Events 
 * Due Date: 02/12/2017  
 * 
 * Javascript file 
 * 
 * For text and table styling, referred to the following MDN pages 
 * Styling text: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals
 * Styling tables: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_boxes/Styling_tables
 * 
 */


/*
 * Creating the variable that will hold the table created 
 * with the createTable function 
 */

var newTable = document.createElement("table");

/*
 * Function that will create the new table by first 
 * creating the headers, then the rows
 */
function createTable(newTable)
{
  
  // Creating the table headers 
  var headerRow = document.createElement("tr");
  
  for (var i = 0; i < 4; i++)
  {
    var headerCell = document.createElement("th");
    
    headerCell.textContent = "Header " + (i+1);
    
    headerCell.style.border = "1px solid black";
    
    headerCell.style.textAlign = "center"; 
    
    headerRow.appendChild(headerCell);
  }
  
  // Creating the table rows with it's own coordinates 
  newTable.appendChild(headerRow);

  for (var i = 0; i < 3; i++)
  {
    var row = document.createElement("tr")
    
    for (var j = 0; j < 4; j++)
    {
      var cell = document.createElement("td")
      
      cell.textContent = (i+1) + ", " + (j+1);
      
      cell.style.border = "1px solid black";
      
      cell.style.textAlign = "center"; 
      
      row.appendChild(cell);
    }
    
    newTable.appendChild(row);
  }
  return newTable;
}

/*
 * Create the table and append it to the HTML body 
 */

var table  = createTable(newTable);

document.body.appendChild(table);

/*
 * Highlight the first cell of the table 
 */

var selectedCell = {col:0, row:1};

table.children[selectedCell.row].children[selectedCell.col].style.border = "5px solid black";

/*
 * Creating variables that will hold elements
 * which represent the buttons up down, right, left 
 * and mark.  Create the functions that move the index
 * left, right, up or down. 
 * 
 * Since the movement is linear, we only need to make sure the function is not 
 * going "out of bounds" from the tables rows and/or columns.  In particular 
 * with the down and right movements.  
 * 
 * Finally create the event listener by stating the "click" event 
 * and passing the function for the respective action 
 */

/*
 * UP BUTTON ACTION 
 */

var upButton = document.createElement("button");
upButton.textContent = "Up";

function moveUp(table, cell)
{
  if (cell.row > 1)
  {
    table.children[cell.row].children[cell.col].style.border = "1px solid black";
    
    cell.row -= 1;
    
    table.children[cell.row].children[cell.col].style.border = "5px solid black";
  }
}

upButton.addEventListener("click", function()
{
  moveUp(table, selectedCell);
})

document.body.appendChild(upButton);

/*
 * DOWN BUTTON ACTION 
 */

var downButton = document.createElement("button")
downButton.textContent = "Down";

function moveDown(table,cell)
{
  if (cell.row < table.rows.length - 1 && cell.row > 0)
  {
    table.children[cell.row].children[cell.col].style.border = "1px solid black";
    
    cell.row += 1;
    
    table.children[cell.row].children[cell.col].style.border = "5px solid black";
  }
}

downButton.addEventListener("click", function()
{
  moveDown(table,selectedCell);
})

document.body.appendChild(downButton);

/*
 * LEFT BUTTON ACTION 
 */

var leftButton = document.createElement("button");
leftButton.textContent = "Left";

function moveLeft(table, cell)
{
  if (cell.col > 0)
  {
    table.children[cell.row].children[cell.col].style.border = "1px solid black";
    
    cell.col -= 1;
    
    table.children[cell.row].children[cell.col].style.border = "5px solid black";
  }
}

leftButton.addEventListener("click", function()
{
  moveLeft(table, selectedCell);
})

document.body.appendChild(leftButton);

/*
 * RIGHT BUTTON ACTION 
 */

var rightButton = document.createElement("button")
rightButton.textContent = "Right";

function moveRight(table, cell)
{
  if (cell.col < table.rows[cell.row].cells.length-1)
  {
    table.children[cell.row].children[cell.col].style.border = "1px solid black";
    
    cell.col += 1;
    
    table.children[cell.row].children[cell.col].style.border = "5px solid black";
  }
}

rightButton.addEventListener("click", function()
{
  moveRight(table, selectedCell);
})

document.body.appendChild(rightButton);

/*
 * MARK BUTTON ACTION 
 */

var markButton = document.createElement("button");
markButton.textContent = "Mark";

function markCell(table, cell)
{
  table.children[cell.row].children[cell.col].style.backgroundColor = "yellow";
}

markButton.addEventListener("click", function()
{
  markCell(table, selectedCell);
})

document.body.appendChild(markButton);






