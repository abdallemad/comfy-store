import { fetchProductAdminDetails, updateImageProductAction, updateProductAction } from '@/utils/actions';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { SubmitBtn } from '@/components/form/Buttons';
import CheckboxInput from '@/components/form/CheckBoxInput';
import ImageInputContainer from '@/components/form/ImageInputContainer';


async function EditPage({params}:{params:{id:string}}) {
  const {id} = params;
  const product = await fetchProductAdminDetails(id);
  const {company,name,price,description,image,featured} = product
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>update product</h1>
      <div className="border p-8 rounded">
        {/* image input container */}
        <ImageInputContainer 
          action={updateImageProductAction} 
          image={product.image} 
          name={product.name} 
          text='update image'>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="url" value={image} />
          </ImageInputContainer>

        <FormContainer action={updateProductAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <input type="hidden" name="id" value={id} />
            <FormInput type='text' name='name' defaultValue={name} label='product name' />
            <FormInput type='text' name='company' defaultValue={company} label='company ' />
            <PriceInput defaultValue={price} />
          </div>
          <TextAreaInput name='description' defaultValue={description} labelText='product description' />
          <div className="mt-6">
            <CheckboxInput name='featured' defaultChecked={featured} label='featured' />
          </div>
          <SubmitBtn  text='update product' className='mt-8'/>
        </FormContainer>
      </div>
    </section>
  )
}

export default EditPage
