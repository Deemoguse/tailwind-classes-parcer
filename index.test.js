const useStyles = require('./index')

test('Comparing the result of the function and the expected result', () => {
  const received = useStyles({
    1: {
      base: 'min-h-screen bg-gray-100 py-6 flex flex-col justify-center',
      sm: 'py-12'
    },
    2: {
      base: 'relative py-3',
      sm: 'max-w-xl mx-auto'
    },
    3: {
      base: 'absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6',
      sm: () => {
        const base = 'skew-y-0'
        const state = {
          set_1: '-rotate-6 rounded-3xl',
          set_2: 'bg-red-500 text-blue-300'
        }
        return [base, state['set_1']].join(' ')
      }
    },
    4: {
      base: 'relative px-4 py-10 bg-white shadow-lg',
      sm: 'rounded-3xl p-20'
    },
    5: 'divide-y divide-gray-200',
    6: {
      base: {
        base: 'py-8 text-base leading-6 space-y-4 text-gray-700',
        sm: 'text-lg leading-7'
      }
    },
    7: () => 'list-disc space-y-2',
    8: {
      base: {
        base: {
          base: {
            base: () => 'flex items-start'
          }
        }
      }
    },
    9: 'h-6 flex items-center sm:h-7',
    0: () => {
      const base = 'pt-6 text-base leading-6 font-bold'
      const sm = useStyles({ variant: { sm: 'text-lg leading-7' }}).variant
      return [base, sm].join(' ')
    }
  })
  
  const expected = {
    1: 'min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12',
    2: 'relative py-3 sm:max-w-xl sm:mx-auto',
    3: 'absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl',
    4: 'relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20',
    5: 'divide-y divide-gray-200',
    6: 'py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7',
    7: 'list-disc space-y-2',
    8: 'flex items-start',
    9: 'h-6 flex items-center sm:h-7',
    0: 'pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7'
  }

  expect(expected).toEqual(received)
})