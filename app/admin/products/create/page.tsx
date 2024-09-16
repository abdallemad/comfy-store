

import { createProductAction } from '@/utils/actions';
import { Button } from '@/components/ui/button';
import {faker} from '@faker-js/faker'
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { SubmitBtn } from '@/components/form/Buttons';
import ImageInput from '@/components/form/ImageInput';
import CheckboxInput from '@/components/form/CheckBoxInput';

function CreateProduct() {
  const productName = faker.commerce.productName()
  const company = faker.company.name();
  const info = faker.lorem.paragraph({min:10 , max:12})
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProductAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <FormInput 
              type='text' 
              name='name' 
              defaultValue={productName} 
              label='product name'
              />
            <FormInput 
            type='text'
            name='company'
            defaultValue={company}
            label='company'/>
            <PriceInput defaultValue={100} />
            <ImageInput />
          </div>
          <TextAreaInput name='description' defaultValue={info} labelText='product description'  />
          <div className="mt-6">
            <CheckboxInput label='featured' name='featured' defaultChecked />
          </div>
          <SubmitBtn text='create product' className='mt-8'/>
        </FormContainer>
      </div>
    </section>
  )
}

export default CreateProduct
