import React from 'react'; 
import './style.css'

class ScrollToTop extends React.Component {
  constructor() {
    super();
    this.state = {
        intervalId: 0
    };
  }
  
  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }
  
  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), "0");
    this.setState({ intervalId: intervalId });
  }

  render () {
    return (
    <div title='Back to top' id='scroll' onClick={ () => { this.scrollToTop(); }}>
      <i class="fas fa-arrow-alt-circle-up"></i>
    </div>
  )}
} 

export default ScrollToTop;