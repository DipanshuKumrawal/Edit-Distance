import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Editor extends React.Component {
constructor (props) {
  super(props);
  this.componentRef = React.createRef();

  this.state = {
    word1: "Worcestershire",
    word2: "Onomatopoeia",
    word1Edited: (<span>W<u>o</u>rces<u>te</u>rsh<u>i</u>re</span>),
    word2Edited: (<span><u>O</u>noma<u>t</u>opo<u>ei</u>a</span>),
    common: "otei",
    commonEdited: (<span><u>otei</u></span>),
  }
  this.handleChange1 = this.handleChange1.bind(this);
  this.handleChange2 = this.handleChange2.bind(this);
}

calculate() {
  
  let dp = Array(this.state.word1.length + 1).fill(null).map(() => (
    Array(this.state.word2.length + 1)
  ));
  let m = this.state.word1.length ;
  let n = this.state.word2.length ;
  for (let j = 0 ; j <= n; j++) {
    dp[m][j] = "";
  }
  for (let i = 0 ; i <= m; i++) {
    dp[i][n] = "";
  }

  for(let i = m -1 ; i >= 0 ; i--) {
    for (let j = n-1; j >= 0; j--) {
      if (this.state.word1.charAt(i) === this.state.word2.charAt(j)) {
        dp[i][j] = this.state.word1.charAt(i) + dp[i+1][j+1];
      } else {
        let longest = "";
        if (dp[i+1][j].length > longest.length) {
          longest = dp[i+1][j];
        }
        if (dp[i][j+1].length > longest.length) {
          longest = dp[i][j+1];
        }
        dp[i][j] = longest;
      }
    }
  }

  this.setState({
    common: dp[0][0],
    commonEdited:(<span><u>{dp[0][0]}</u></span>),
    word1Edited: (<span>{this.underline(this.state.word1, dp[0][0])}</span>),
    word2Edited: (<span>{this.underline(this.state.word2, dp[0][0])}</span>),
  });
}

underline(string, target) {
  var charArray = string.split('');
  
  var pickedArray = [];

  var targetIndex = 0;
  var stringIndex = 0;

  while (targetIndex < target.length) {
    if (string.charAt(stringIndex) === target.charAt(targetIndex)) {
      pickedArray.push(stringIndex);
      targetIndex++;
    }
    stringIndex++; 
  }

  var foc = 0;
  return charArray.map((char, index) => {
    if (foc < pickedArray.length && index === pickedArray[foc]) {
      foc ++;
      return <u>{char}</u>;
    } else {
      return char;
    }
  });
}

handleChange1(event) {
  this.setState({word1: event.target.value});
}

handleChange2(event) {
  this.setState({word2: event.target.value});
}


render() {
    return (
    <div class="container">
      <div class="demo-flex-spacer"></div>
      <h1 class="demo">E<u>dit</u> dis<u>t</u>ance calcula<u>to</u>r</h1>
      

      <div class="webflow-style-input">
        <input class="text" type="email" placeholder={this.state.word1} onChange={this.handleChange1}></input>
        <text class="text" placeholder="|">is {this.state.word1Edited}</text>

        <input class="text" type="email" placeholder={this.state.word2} onChange={this.handleChange2}></input>
        <text class="text" placeholder="|">is {this.state.word2Edited}</text>

      
        <button onClick={() => this.calculate()}>their longest common subsequence</button>
        <text class="text" placeholder="|">is {this.state.commonEdited}</text>
      </div>
    
      <div class="demo-flex-spacer"></div>
      
    
    </div>
    );

    
}
}


ReactDOM.render(<Editor />, document.getElementById('root'));
