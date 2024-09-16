
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
type FormInputType = {
  name:string,
  type:string,
  label?:string,
  defaultValue?:string,
  placeholder?:string,
}
const FormInput = ({name,label,defaultValue,placeholder,type}:FormInputType) => {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='mb-2 capitalize'>{label || name}</Label>
      <Input id={name} name={name} defaultValue={defaultValue} placeholder={placeholder} type={type}/>
    </div>
  )
}

export default FormInput
