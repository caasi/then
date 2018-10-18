import { Component } from 'react'

class PromisedComponent extends Component {
  // make `setState` a `>>=`
  setState = f => super.setState({
    p: this.state.p
      .then(s =>
        f(s)
          .then(t => (!t ? s : { ...s, ...t }))
          .catch(err => console.error(err) || s)
      )
  })

  getState = () => this.state.p

  // flip arguments
  dispatch = (f) => (...args) => this.setState(f(...args))
}

export default PromisedComponent
