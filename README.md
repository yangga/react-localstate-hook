# react-localstate-hook

Simple state management by react context. You can write the functional component code easy.

## Usage

Let me explain with sample codes

### 1. Create a shared statement file (state.ts)

> All compoents which involved this context use this state.

```javascript
import initStateHook from "react-localstate-hook";

type State = {
  name: string,
  tasks: string[]
};

const defaultState: State = {
  name: "yangga",
  tasks: ["eat", "swim", "study", "play-games"]
};

const { StateProvider, useStateHook } =
  initStateHook < State > defaultState({ defaultState });

export { StateProvider, useStateHook };
```

### 2. Setup the "Provider" on high layer component

```javascript
import { StateProvider } from "./state.ts";

import Namecard from "./Camecard";
import TaskList from "./TaskList";
import NameChanger from "./NameChanger";

...

export default () => {
    return (
        <>
            <StateProvider>
                <Namecard />
                <TaskList />
                <NameChanger />
            </StateProvider>
        <>
    )
}

```

### 3. Now, you can use hooks

```javascript
// Camecard.tsx
import { useStateHook } from "./state.ts";

export default () => {
  const [state, setState] = useStateHook();
  return <Text>{state.name}</Text>;
};

// TaskList.tsx
import { useStateHook } from "./state.ts";

export default () => {
  const [state, setState] = useStateHook();
  return (
    <View>
      {state.tasks.map(t => (
        <Text>{t}</Text>
      ))}
    </View>
  );
};

// NameChanger.tsx
import { useStateHook } from "./state.ts";

export default () => {
  const [state, setState] = useStateHook();
  return (
    <TextInput value={state.name} onChangeText={name => setState({ name })} />
  );
};
```
