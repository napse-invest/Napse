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
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export interface InputType<T extends Object> {
  label: string
  key: keyof T
  type: 'input' | 'switch' | 'select' | 'slider'
  zod: z.ZodTypeAny
  default?: string | number | boolean
  value?: string | number | boolean
  description?: string
  placeholder?: string | number
  disabled?: boolean
  sliderSettings?: {
    min: number
    max: number
    step: number
  }
  // possibilities?: string[]
  possibilities?: { [key: string]: string }
  setter?: Dispatch<SetStateAction<any>>
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

  const [sliderValue, setSliderValue] = useState([50])
  const [isLoading, setIsLoading] = useState(false)

<<<<<<< HEAD
=======
  const handleOnSubmit = (values: { [x: string]: any }) => {
    onSubmit(values)
    setIsLoading(false)
  }

>>>>>>> 1ada62cdb2632369d0b68076501e82022232d120
  return (
    <Form {...form}>
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2"> */}
      <form className="space-y-2">
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
                        onValueChange={(newValue: string) => {
                          input.setter ? input.setter(newValue) : null
                          form.setValue(input.key as string, newValue)
                        }}
                        defaultValue={input.default as string}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={input.placeholder as string}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(input.possibilities ?? []).map(
                            ([uuid, name]) => (
                              <SelectItem
                                key={name}
                                value={uuid}
                                disabled={input.disabled}
                              >
                                {name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    ) : (
                      <FormControl>
                        {input.type === 'input' ? (
                          <Input
                            placeholder={input.placeholder as string}
                            disabled={input.disabled}
                            {...field}
                            onChange={(e) => {
                              if (input.zod instanceof z.ZodNumber) {
                                if (e.target.value.slice(-1) === '.') {
                                  field.onChange(e.target.value)
                                  return
                                }
                                const numericValue = parseFloat(e.target.value)
                                console.log('numericValue', numericValue)
                                if (!isNaN(numericValue)) {
                                  field.onChange(numericValue)
                                }
                              } else {
                                field.onChange(e.target.value)
                              }
                            }}

                            // onChange={(e) => {
                            //   const amount = Number(e.target.value)
                            //   input.setter && input.setter(amount)
                            // }}
                          />
                        ) : input.type === 'switch' ? (
                          <Switch
                            checked={field.value}
                            disabled={input.disabled}
                            onCheckedChange={field.onChange}
                            {...field}
                          />
                        ) : input.type === 'slider' ? (
                          <div className="flex flex-row">
                            <Slider
                              defaultValue={[input.default as number]}
                              max={input.sliderSettings?.max ?? 100}
                              min={input.sliderSettings?.min ?? 0}
                              step={input.sliderSettings?.step ?? 1}
                              onValueChange={(newValue: number[]) => {
                                // TODO: use setter instead
                                setSliderValue(newValue)
                                form.setValue(input.key as string, newValue[0])
                              }}
                              className=""
                            />
                            <p className="w-20 text-end">{sliderValue} %</p>
                          </div>
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
            {isLoading ? (
              <Button disabled type="submit">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {buttonDescription ?? 'Submit'}
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={(e) => {
                  console.log('props', e)
                  setIsLoading(true)
                  return form.handleSubmit(onSubmit)(e)
                }}
              >
                {buttonDescription ?? 'Submit'}
              </Button>
            )}
          </div>
        )}
      </form>
    </Form>
  )
}
