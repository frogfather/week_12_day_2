var Films = require('../models/films');

var UI = function() {
  var films = new Films();
  var newButton = document.querySelector("#new-button");
  newButton.onclick = this.toggleForm;
  var postButton = document.querySelector("#post-button");
  postButton.onclick = this.submitEntry;
  // this.render(films);
  films.all(function(result){
    this.render(result);
  }.bind(this));
}

UI.prototype = {
  createText: function(text, label) {
    var p = document.createElement('p');
    p.innerText = label + text;

    return p;
  },

  appendText: function(element, text, label) {
    var pTag = this.createText(text, label);
    element.appendChild(pTag);
  },

  createReview: function(li, review) {
    this.appendText(li, review.comment, 'Comment: ');
    this.appendText(li, review.rating, 'Rating: ');
    this.appendText(li, review.author, 'Author: ');
  },

  render: function(films) {
    var container = document.getElementById('films');
    for (var film of films) {
      var li = document.createElement('li');
      this.appendText(li, film.title, 'Film: ');
      this.appendText(li, film.genre, 'Genre: ');
      
      for (var review of film.reviews){
        this.createReview(li, review);
      }

      container.appendChild(li);
    }
  },

  toggleForm: function(){
    var newDiv = document.querySelector("#new-film");
    var bottomDiv = document.querySelector("#bottom-div")
    if (newDiv.childElementCount ==0){
    //add a table
    var table = document.createElement("table");
    table.setAttribute("id","film-table");
    newDiv.appendChild(table);
    var tableRow;
    var tableData;
    var inputText;
    for (var i=0; i< 6;i++){
      tableRow = document.createElement("tr");
      table.appendChild(tableRow);
      tableData = document.createElement("td");
      tableData.setAttribute("id","left-col")
      tableRow.appendChild(tableData);
      tableData = document.createElement("td");
      tableData.setAttribute("id","right-col");
      tableRow.appendChild(tableData);
      if (i == 5){
        inputText = document.createElement("textarea");
        inputText.rows = 4;
        inputText.setAttribute("id","text-area");
       } 
      else
      {
        inputText = document.createElement("input");
        inputText.setAttribute("id","input-text");
      }
    tableData.appendChild(inputText);
    }
    console.log(table);
    table.rows[0].cells[0].innerText = "Film Name"; 
    table.rows[1].cells[0].innerText = "Actors"; 
    table.rows[2].cells[0].innerText = "Genre"; 
    table.rows[3].cells[0].innerText = "Review: author"; 
    table.rows[4].cells[0].innerText = "Review: rating"; 
    table.rows[5].cells[0].innerText = "Review: comments"; 
    table.rows[5].setAttribute("id","last-row");
    } else
    {
      while (newDiv.childElementCount > 0){
        newDiv.removeChild(newDiv.childNodes[0]);
      };  
    };
  },

  submitEntry: function(){

    console.log("the submit button was clicked")
  }

};

module.exports = UI;
