const previousText = document.querySelector("#previous-operation");
const currentText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");




class Calculator{
    constructor(previousText, currentText){
        this.previousText = previousText;
        this.currentText = currentText;
        this.currentOperation = "";
    }

    //addDigit tela da calculadora
    addDigit(digit){
        //verificar se a operação atual já tem u ponto
        if (digit === "." && this.currentText.innerText.includes(".")){
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }

    //processar todas as operações da calculadora
    processOperation(operation){
        //check if current is empty
        if(this.currentText.innerText === "" && operation !== "C"){
          if(this.previousText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
    }
        
       //obter o valor atual e o anterior
       let operationValue;
       const previous = +this.previousText.innerText.split(" ")[0];
       const current = +this.currentText.innerText;
       
       switch(operation){
        case "+":
            operationValue =   previous + current;
            this.updateScreen(operationValue, operation, current, previous)
            break;

        case "-":
            operationValue = previous - current;
            this.updateScreen(operationValue, operation, current, previous)
            break;
        
        case "/":
            operationValue = previous / current;
            this.updateScreen(operationValue, operation, current, previous)
            break;
            
        case "*":
            operationValue = previous * current;
            this.updateScreen(operationValue, operation, current, previous)
            break;

        case "DEL":
            this.processDelOperation()
            break;

        case "CE":
            this.processClearOperation()
            break;

        case "C":
            this.processClearAllOperation()
            break;

        case "=":
            this.processEqualOperator()
            break;

        default:
            return;    
       }
    }

    //updateScreen altera os valores da tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
       if (operationValue === null){
        //+= esta contatenando o que for digitado
        this.currentText.innerText += this.currentOperation; 
       }else{
        //verifica se o valor é zero, senão adiciona o valor
        if(previous === 0){
            operationValue = current
        }
        //add current value to previous
        this.previousText.innerText = `${operationValue} ${operation}`;
        this.currentText.innerText = "" ;
       }
        
    }

    changeOperation(operation){

        const mathOperations = ["+", "-", "/", "*"];

        if(!mathOperations.includes(operation)){
            return;
        }
        this.previousText.innerText = this.previousText.innerText.slice(0, -1) + operation;
    }


    processDelOperation(){
        this.currentText.innerText = this.currentText.innerText.slice(0, -1);
    }

    processClearOperation(){
        this.currentText.innerText = "";
    }

    processClearAllOperation(){
        this.previousText.innerText = "";
        this.currentText.innerText = "";
    }

    processEqualOperator(){
        let operation = this.previousText.innerText.split(" ")[1];
        this.processOperation(operation);
        
    }
}


const calc = new Calculator(previousText, currentText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        }else{
            calc.processOperation(value);
        }
        
    });
});
