document.addEventListener('DOMContentLoaded', function() {
    loadGameState();
  });
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    
    // Save the game state after dropping
    saveGameState();
  }
  
  // Function to save the game state to local storage
  function saveGameState() {
    var div1Content = document.getElementById('div1').innerHTML;
    var div2Content = document.getElementById('div2').innerHTML;
    
    var gameState = {
      div1Content: div1Content,
      div2Content: div2Content
    };
    
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }
  
  // Function to load the game state from local storage
  function loadGameState() {
    var gameStateJSON = localStorage.getItem('gameState');
    
    if (gameStateJSON) {
      var gameState = JSON.parse(gameStateJSON);
      document.getElementById('div1').innerHTML = gameState.div1Content;
      document.getElementById('div2').innerHTML = gameState.div2Content;
    }
  }
  