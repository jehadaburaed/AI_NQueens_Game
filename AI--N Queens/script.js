document.addEventListener("DOMContentLoaded", function() {
  const chessboard = document.getElementById("board");
  const boardSizeSelect = document.getElementById("boardSize");
  const generateButton = document.getElementById("generateButton");
  const generateButton2 = document.getElementById("generateButton2");
  const SimulatedButton = document.getElementById("vbtn-radio2");
  const HillClimbingButton = document.getElementById("vbtn-radio1");
  const randomly = document.getElementById("randomly");

  
  let iterations="";
  let coolingRate="";
  let init="";
  

  var x =0 ; 
  var ddefault=0;
  let state;

/*Author: Jehad Abu Raad and Shareef Salahat*/
  
  function showTextBox(){
  
      document.getElementById("formcon").style.setProperty("display","inline");
      document.getElementById("generateButton").style.setProperty("display","none");
    
  }

  function hideTextBox(){
  
    document.getElementById("formcon").style.setProperty("display","none");
    document.getElementById("generateButton").style.setProperty("display","inline");
  
}

  function placeTheQueensRandomly(size) {
    const queens = new Array(size).fill(0).map(() => Math.floor(Math.random() * size));
    return queens;
  }


  

  function createChessboard(size) {
    chessboard.innerHTML = "";

    // Set the CSS grid template to match the selected board size
    chessboard.style.gridTemplateColumns = `repeat(${size}, 50px)`;
    chessboard.style.gridTemplateRows = `repeat(${size}, 50px)`;

    const queens = placeTheQueensRandomly(size);
    const sol = HillClimbing(size) ;


    iterations=document.getElementById("iterations") ;
    coolingRate=document.getElementById("coolingRate") ;
    init=document.getElementById("initial") ;
    let sol2;
    if(iterations.value=="" || init.value==""|| coolingRate.value=="" ){

      iterations=1000;
      coolingRate=0.95;
      init=100;
      if(x==2){
        ddefault=1;

      sol2 = simulatedAnnealing(size, iterations ,init, coolingRate) ;
      }
  }
      else sol2 = simulatedAnnealing(size, iterations.value ,init.value, coolingRate.value) ;
      ddefault=0;
   
    
   

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const cell = document.createElement("div");
        state=col ; 
      
      

        if (x==1){
        if (sol[col] === row) {
          // Place a queen at the randomly chosen position
          const queenIcon = document.createElement("span");
          queenIcon.innerHTML = "&#9819;"; // Queen Unicode character
          cell.appendChild(queenIcon);
          cell.classList.add("queen");
        }
      }
      else if(x==0){
        if (queens[row] === col) {
          // Place a queen at the randomly chosen position
          const queenIcon = document.createElement("span");
          queenIcon.innerHTML = "&#9819;"; // Queen Unicode character
          cell.appendChild(queenIcon);
          cell.classList.add("queen");
      }
    }
    else if(x==2){

      if (sol2[row] === col) {
        // Place a queen at the randomly chosen position
        const queenIcon = document.createElement("span");
        queenIcon.innerHTML = "&#9819;"; // Queen Unicode character
        cell.appendChild(queenIcon);
        cell.classList.add("queen");
    }
  }
        chessboard.appendChild(cell);


        if ((row + col) % 2 == 0){
          cell.classList.add("green") ;
        }else{
          cell.classList.add("white") ;
        }
      }
    
    }
  }


  function evaluateing(board) {
    const n = board.length;
    let conflicts = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (board[i] === board[j] || Math.abs(board[i] - board[j]) === j - i) {
          conflicts++;
        }
      }
    }
    return conflicts;
  }
  

  



  function simulatedAnnealing(boardSize, maxIterations = 10000, initialTemperature = 100.0, coolingRate = 0.95) {



   /* if (iterations.value==null||init.value==null||coolingRate.value==null){

      
      return console.log("eeeeeerroooor");
    }*/


    
    function getRandomState() {
      const state = [];
      for (let i = 0; i < boardSize; i++) {
        state.push(Math.floor(Math.random() * boardSize));
      }
      return state;
    }
  
    function getNeighbor(state) {
      const neighbor = state.slice();
      const col = Math.floor(Math.random() * boardSize);
      let row = Math.floor(Math.random() * boardSize);
      while (neighbor[col] === row) {
        row = Math.floor(Math.random() * boardSize);
      }
      neighbor[col] = row;
      return neighbor;
    }
  
    let currentState = getRandomState();
    let currentEnergy = evaluateing(currentState);
  
    let bestState = currentState.slice();
    let bestEnergy = currentEnergy;
  
    let temperature = initialTemperature;
    
      temp = temperature
  
    for (let iteration = 0; iteration < maxIterations; iteration++) {
      if (currentEnergy === 0 && x===2) {
        window.alert(` temp:${temperature}   AND   Iteration: ${iteration}`)

        return bestState; // Founding a solution
      }
      it = iteration;
      const neighbor = getNeighbor(currentState);
      const neighborEnergy = evaluateing(neighbor);
  
      if (neighborEnergy < currentEnergy || Math.random() < Math.exp((currentEnergy - neighborEnergy) / temperature)) {
        currentState = neighbor;
        currentEnergy = neighborEnergy;
  
        if (currentEnergy < bestEnergy) {
          bestState = currentState.slice();
          bestEnergy = currentEnergy;
        }
      }
  
      temperature *= coolingRate;
      
    }
    

    
    
    
    
    return null; // when no solution found ... within the given iterations
  }



  boardSizeSelect.addEventListener("click", function() {
    const selectedSize = parseInt(boardSizeSelect.value);
    
   
  });

  randomly.addEventListener("click", function() {
    x=0;
    const selectedSize = parseInt(boardSizeSelect.value);
    createChessboard(selectedSize);
   
  });


  generateButton.addEventListener("click", function() {
    x=1;
    const selectedSize = parseInt(boardSizeSelect.value);
    createChessboard(selectedSize);
   
   
   
  });


  generateButton2.addEventListener("click", function() {
    x=2;
    const selectedSize = parseInt(boardSizeSelect.value);
    createChessboard(selectedSize);
    
   
   
  });
 

  SimulatedButton.addEventListener("click", function() {
    
    showTextBox();

  });

  HillClimbingButton.addEventListener("click", function() {
    
    hideTextBox();

  });

  // Generate the initial chessboard
  createChessboard(4);





  function HillClimbing(size) {
    function the_Heuristic(state) {
      // Calculate the number of conflicts in the current state
      let conflicts = 0;
      for (let i = 0; i < state.length; i++) {
        for (let j = i + 1; j < state.length; j++) {
          if (state[i] === state[j] || Math.abs(state[i] - state[j]) === j - i) {
            conflicts++;
          }
        }
      }
      return conflicts;
    }
  
    function generatingNeighbors(state) {
      //to Generate a neighboring states by moving one queen to a different column in its row
      const neighbors = [];
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (state[row] !== col) {
            const neighbor = state.slice(); // Createing a copy of the state
            neighbor[row] = col;
            neighbors.push(neighbor);
          }
        }
      }
      return neighbors;
    }
  
    function isIt_A_Solution(state) {
      return the_Heuristic(state) === 0;
    }
  
    // Generateing a random initial state 
    let currentState = Array.from({ length: size }, () => Math.floor(Math.random() * size));
  
    while ( ! isIt_A_Solution(currentState)) {
      const neighbors = generatingNeighbors(currentState);
      let bestNeighbor = currentState;
      let bestHeuristic = the_Heuristic(currentState);
  
      for (const neighbor of neighbors) {
        const neighborHeuristic = the_Heuristic(neighbor);
        if (neighborHeuristic < bestHeuristic) {
          bestNeighbor = neighbor;
          bestHeuristic = neighborHeuristic;
        }
      }
  
      // If no better neighbor found,then we stop (local optimum)
      if (bestHeuristic >= the_Heuristic(currentState)) {
        break;
      }
  
      currentState = bestNeighbor;
    }
  
    return currentState;
  }



  
  



 /* generateButton.addEventListener("click", function() {
    hillClimbing(size);
    const selectedSize = parseInt(boardSizeSelect.value);
    showMessage("Congratulations, you have succeeded!");
    window.confirm("Congratulations, you have succeeded!");
   
    
  }); */

 


const toastTrigger = document.getElementById("generateButton");
const toastLiveExample = document.getElementById("liveToast");
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample);

    toast.show();
  })
}


const toastTrigger2 = document.getElementById("generateButton2");
const toastLiveExample2 = document.getElementById("liveToast2");
const toastLiveExample3 = document.getElementById("liveToast3");



if (toastTrigger2) {
  toastTrigger2.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample2);
    /*if(ddefault==1 ){
      toastTrigger2.addEventListener('click', () => {
        const toast = new bootstrap.Toast(toastLiveExample3);
    
        toast.show();
    })
    }*/

    toast.show();
  })
}


});





















/*Author: Jehad Abu Raad and Shareef Salahat*/
