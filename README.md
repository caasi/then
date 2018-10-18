# then

A `Promise` toolset for asynchronous React apps.

It is created for rapid prototyping without setting up any framework like Redux.

## Install

```
npm install @caasi/then
```

## Examples

### &lt;Then /&gt;

It lifts a React component from `Component<Props>` to
`Component<PromisedEach<Props>>`.

```
type PromisedEach<T> = {
  [P in keyof T]: Promise<T[P]>
}
```

You can use it to resolve promises for the inner component:

```
import { Then } from '@caasi/then'

const Foobar = ({ name }) => <span>I am { name }.</span>

class MyComp extends PureComponent {
  render() {
    return (
      <Then name={Promise.resolve('John')}>
        <Foobar />
      </Then>
    )
  }
}

export default MyComp
```

Then the inner component will get the promised value "John" when the promise is
resolved.

Unresolved values will be undefined so you can deal with them in the inner
component:

```
const Foobar = ({ name = 'John' }) => <span>I am { name }.</span>
```

It also works on a function as child component(FaCC):

```
<Then name={Promise.resolve('Isaac')}>{
  ({ name = 'John' }) => <span>I am { name }.</span>
}</Then>
```

### PromisedComponent

It lifts the React component from `Component<Props, State>` to
`Component<Props, Promise<State>>`. And make the `setState` function a effective
`>>=` function.

```
class PromisedComponent {
  setState: (State => Promise<State>) => Promise<State>

  getState: () => Promise<State>

  dispatch: ((...args: any[]) => State => Promise<State>) => (...args: any[]) => Promise<State>
}
```

So you can create component independent actions like this:

```
type Action<T> = T => Promise<T>

login
  : (username: string, password: string) => Action<State>
  = (username, password) => async (state) => {
    const { data: profile } = await axios.post('http://example.com/login', { username, password })
    return { profile }
  }

fireAndForget
  : () => Action<State>
  = () => async (state) => {
    await axios.put('http://example.com/cleanup');
  }
```

And use them in your `PromisedComponent`:

```
class App extends PromisedComponent {
  state = {
    // the promised state
    p: Promise.resolve({}),
    // other states
    username: '',
    password: '',
  }

  render() {
    const { username, password } = this.state

    return (
      <button onClick={() => this.dispatch(login)(username, password)} />
    );
  }
}
```
