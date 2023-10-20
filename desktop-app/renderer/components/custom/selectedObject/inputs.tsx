import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { InputType } from './selectedObject'

export default function AllInputs<T extends Object>({
  inputs,
  object,
  setObject,
  objectName
}: {
  inputs: InputType<T>[]
  object: T
  setObject: React.Dispatch<React.SetStateAction<T>>
  objectName: string
}): JSX.Element {
  return (
    <>
      {inputs.map((input, index) => {
        return (
          <div key={index} className="flex flex-col space-y-1.5">
            <Label htmlFor={input.label.toLowerCase()}>{input.label}</Label>
            {input.type === 'input' && (
              <Input
                id={input.label.toLowerCase()}
                value={object[input.key] as string}
                disabled={input.disabled}
                onChange={(e) => {
                  object[input.key] = e.currentTarget
                    .value as object[keyof object]
                  setObject({ ...object })
                }}
              />
            )}
            {input.type === 'switch' && (
              <Switch
                id={input.label.toLowerCase()}
                checked={object[input.key] ? true : false}
                disabled={input.disabled}
                onClick={(e) => {
                  object[input.key] = !object[input.key] as object[keyof object]
                  setObject({ ...object })
                }}
              />
            )}
            {input.type === 'select' && (
              <Select
                disabled={input.disabled}
                onValueChange={(value) => {
                  object[input.key] = value as object[keyof object]
                  setObject({ ...object })
                }}
                defaultValue={
                  input.possibilities?.includes(object[input.key] as string)
                    ? (object[input.key] as string)
                    : undefined
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select - ${objectName}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{objectName}</SelectLabel>
                    {input.possibilities?.map((possibility, index) => (
                      <SelectItem key={index} value={possibility}>
                        {possibility}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        )
      })}
    </>
  )
}
