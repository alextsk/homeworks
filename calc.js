'use strict';
const INPUT =1;
const STABLE =2;
const INPUT_FLOAT = 3;
const MAX_DIGITS = 14;
class Calc {
  constructor(selector){
    this.elem = document.querySelector(selector);
    this.currentValue = '0';
    this.previousResult = '';
    this.currentOp = '';
    this.$previousResult  = this.elem.querySelector('.pre-result__number');
    this.$previousOp      = this.elem.querySelector('.pre-result__operation');
    this.$currentValue    = this.elem.querySelector('.current');
    this.state = STABLE;

    this.elem.addEventListener('click', this.onButtonClick.bind(this))

  }

  exec (command) {
    switch (command) {
      case '=':
        this.makeOp();
        this.currentValue = this.previousResult || '0';
        this.previousResult = '';
        this.currentOp = '';
        this.state = STABLE;
      break;
      case '.':
        if(this.state !== INPUT_FLOAT) {
          this.currentValue += '.';
          this.state = INPUT_FLOAT;
        }
      break;
      case 'back':
        if (this.currentValue.length > 1) {
          this.currentValue = this.currentValue.slice(0,-1);
        } else {
          this.currentValue = '0';
          this.state = STABLE;
        }
      break;
      case 'clear':
        this.currentValue = '0';
        this.previousResult = '';
        this.currentOp = '';
        this.state = STABLE;
      break;
    }
  }

  makeOp() {
    var stored = parseFloat(this.previousResult, 10);
    var current = parseFloat(this.currentValue, 10);
    switch (this.currentOp) {
      case '-':
        this.previousResult = stored - current;
      break;
      case '+':
        this.previousResult = stored + current;
      break;
      case '/':
        this.previousResult = stored / current;
      break;
      case '*':
        this.previousResult = stored * current;
      break;
      case '^':
        this.previousResult = Math.pow(stored, current);
      break;
      case '!^':
        this.previousResult = Math.pow(stored, 1/current);
      break;
    }
    this.previousResult += '';
  }

  render() {
    if (this.currentValue.length > MAX_DIGITS) {
      if( !~this.currentValue.indexOf('.')){
        this.exec('clear');
        this.currentValue = 'OVERFLOW';
        this.state = STABLE;
      } else {
        this.currentValue = this.currentValue.slice(0, MAX_DIGITS);
      }
    }

    if (this.currentOp == '^')
      this.$previousOp.innerHTML = 'x<sup>y</sup>';
    else if (this.currentOp == '!^')
      this.$previousOp.innerHTML = '<sup>y</sup>&radic;x';
    else
      this.$previousOp.innerHTML = this.currentOp;

    this.$previousResult.innerHTML = this.previousResult;
    this.$currentValue.innerHTML = this.currentValue;
  }

  onButtonClick(e) {
    var button = e.target;

// digit button pressed
    if ('num' in button.dataset) {
      var digit = button.dataset.num;
      switch (this.state) {
        case INPUT:
        case INPUT_FLOAT:
          this.currentValue += '' + digit;
        break;
        case STABLE:
          this.currentValue = digit;
          this.state = INPUT;
        break;
      }
// operation button pressed
    } else if ('op' in button.dataset) {

      if (this.previousResult !== '') {
        this.makeOp();
      } else {
        this.previousResult = this.currentValue;
      }

      this.currentOp = button.dataset.op;
      this.currentValue = '0';
      this.state = STABLE;
// command button pressed
    } else if ('com' in button.dataset) {
      this.exec(button.dataset.com);
    }

    this.render();
  }
}


var calc = new Calc('.calc');
