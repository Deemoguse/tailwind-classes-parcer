# tailwind-classes-parcer

**tailwind-classes-parcer** is a tool that gives you the ability to programmatically manipulate Tailwind classes without burdening the template.

To start working with the package, install it with the following command:
```
npm install tailwind-classes-parcer
```

In the next step, you need to connect the package to your .js file:
```js
const handler = required('tailwind-classes-parcer')
// or
import handler from 'tailwind-classes-parcer'
```

If you are working with typescript, then refer to the src directory:
```ts
import handler from 'tailwind-classes-parcer/src'
```

* * * *

The imported function must accept an object, the property values of which can be of three types:
- `string`: can be supplemented with a ternary operator or preprocessed in any other way;
- `function`: a string must be returned, otherwise it will cause an undefined;
- `object`:  the property keys of this object will be assigned as a prefix for the class collection of this property. The `base` and `custom` properties are not processed, **but can still be any of the types described**.

You can also combine these types with each other at any nesting level:

```js
const styles = handler({
  header: 'border-b border-gray-200',
  btn: {
    base: 'p-3 border border-gray-200 rounded',
    sm: {
      base: 'py-7 px-3',
      hover: 'bg-gray-100',
      focus: 'outline-none'
    }
  },
  footer: () => {
    const base = "bg-gray-600 border-t"
    const state = {
      example1: 'border-red-500',	
      example2: 'border-green-500',
    }
    return [base, state[props.status]].join(' ')
  }
})

// styles -> {
//   header: 'border-b border-gray-200',
//   btn: 'p-3 border border-gray-200 rounded sm:py-7 sm:px-3 sm:hover:bg-gray-100 sm:focus:outline-none',
//   footer: 'bg-gray-600 border-t border-red-500'
// }
```

* * * * *

You can combine this package with any other. For example, this pairs very well with [classnames](https://www.npmjs.com/package/classnames):
```js
import cn /* classnames */ from 'classnames'
import handler from 'tailwind-classes-parcer'

const styles = handler({
  label:  {
    base:  cn(['block mb-2 text-2xl', props.extendClasses?.label]),
    sm:  'text-3xl'
  },
  input:  cn(['tw-input', props.extendClasses?.input]),
  textarea:  cn(['tw-input _textarea', props.extendClasses?.input])
})
```

* * * * *

With this packages, you can achieve tailwind class reactivity without breaking the component's ease of understanding! I'm sure you can put this little tool to good use!

* * * * *