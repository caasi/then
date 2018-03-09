# &lt;Then /&gt;

A wrapper React component for promised properties.

It is created for rapid prototyping without setting up any framework like Redux.

## Install

```
npm install @caasi/then
```

## Examples

You can use it to resolve promises for the inner component:

```
import { Then } from '@caasi/then'

const Foobar = ({ name }) => <span>I am { name }.</span>

class MyComp extends PureComponent {
  render() {
    return (
      <Then name={Promise.resolve('Isaac')}>
        <Foobar />
      </Then>
    )
  }
}

export default MyComp
```

Then the inner component will get the promised value "Isaac" when the promise is
resolved.

Unresolved values will be undefined so you can deal with them in the inner
component:

```
const Foobar = ({ name = 'John' }) => <span>I am { name }.</span>
```

It also works on the function child component:

```
<Then name={Promise.resolve('Isaac')}>{
  ({ name = 'John' }) => <span>I am { name }.</span>
}</Then>
```
