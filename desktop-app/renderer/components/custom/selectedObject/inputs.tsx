import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export interface InputType<T extends Object> {
  label: string
  key: keyof T
  type: 'input' | 'switch' | 'select'
  zod: z.ZodTypeAny
  default?: string | number | boolean
  value?: string | number | boolean
  description?: string
  disabled?: boolean
  possibilities?: string[]
}

function defaultValue(input: InputType<any>) {
  if (input.zod instanceof z.ZodString) return ''
  if (input.zod instanceof z.ZodNumber) return 0
  if (input.zod instanceof z.ZodBoolean) return false
  throw new Error(
    `Invalid input type ${input.zod.constructor.name}. Please handle this in defaultValue.`
  )
}

export default function CustomForm<T extends Object>({
  inputs,
  onSubmit,
  buttonDescription,
  footer
}: {
  inputs: InputType<T>[]
  onSubmit: (
    values: z.infer<
      z.ZodObject<
        {
          [k: string]: z.ZodTypeAny
        },
        'strip',
        z.ZodTypeAny,
        {
          [x: string]: any
        },
        {
          [x: string]: any
        }
      >
    >
  ) => void
  footer?: React.ReactNode
  buttonDescription?: string
}): JSX.Element {
  const formSchema = z.object(
    Object.fromEntries(inputs.map((input) => [input.key, input.zod]))
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      inputs.map((input) => [
        input.key,
        input.value || input.default || defaultValue(input)
      ])
    )
  })
  useEffect(() => {
    form.reset((values) =>
      Object.fromEntries(
        inputs.map((input) => [
          input.key,
          values[input.key as string] ||
            input.value ||
            input.default ||
            defaultValue(input)
        ])
      )
    )
  }, [inputs, form])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {inputs.map((input, index) => {
          return (
            <FormField
              key={index}
              control={form.control}
              name={input.key as string}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-1.5">
                    <FormLabel>{input.label}</FormLabel>
                    {input.type === 'select' ? (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {input.possibilities?.map((possibility) => (
                            <SelectItem
                              key={possibility}
                              value={possibility}
                              disabled={input.disabled}
                            >
                              {possibility}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <FormControl>
                        {input.type === 'input' ? (
                          <Input
                            placeholder={input.value as string}
                            disabled={input.disabled}
                            {...field}
                          />
                        ) : input.type === 'switch' ? (
                          <Switch
                            checked={field.value}
                            disabled={input.disabled}
                            onCheckedChange={field.onChange}
                          />
                        ) : (
                          <></>
                        )}
                      </FormControl>
                    )}
                    <FormDescription>{input.description ?? ''}</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          )
        })}
        {footer ? (
          footer
        ) : (
          <div className="flex flex-col items-end">
            <Button type="submit">{buttonDescription ?? 'Submit'}</Button>
          </div>
        )}
      </form>
    </Form>
  )
}
