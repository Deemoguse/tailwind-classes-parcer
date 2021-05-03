declare type Prefixes = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'dark' | 'motion-safe' | 'motion-reduce' | 'first' | 'last' | 'odd' | 'even' | 'visited' | 'checked' | 'group-hover' | 'group-focus' | 'focus-within' | 'hover' | 'focus' | 'focus-visible' | 'active' | 'disabled'

declare type PropValue<T extends string|object> = T extends string
  ? string | (() => string)
  : {
    [key in Prefixes & string]?: PropValue<string|object>
  } & {
    base?: PropValue<string|object>
    custom?: string | (() => string)
  }

declare type Argument = {
  [key: string]: string | (() => string) | PropValue<string|object>
}