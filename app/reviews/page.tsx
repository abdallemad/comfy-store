import { deleteReviewAction, fetchProductReviewByUser } from '@/utils/actions';
import ReviewCard from '@/components/reviews/ReviewCard';
import SectionTitle from '@/components/global/SectionTitle';
import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';
const page =async () => {
  const reviews = await fetchProductReviewByUser();
  if(reviews.length ==0 ) return <SectionTitle text='you have no reviews yet' />
  return (
    <>
      <SectionTitle text='Your Reviews' />
      <section className='grid md:grid-cols-2 gap-8 mt-4'>
        {
          reviews.map(review=>{
            const {comment,id ,rating,product:{image,name}} = review
            const reviewInfo = {
              name,
              image,
              rating,
              id,
              comment
            }
            return <ReviewCard reviewInfo={reviewInfo} key={review.id}>
                <DeleteReview reviewId={review.id} />
            </ReviewCard>
          })
        }
      </section>
    </>
  )
}

const DeleteReview = ({reviewId}:{reviewId:string})=>{
  const deleteReview = deleteReviewAction.bind(null, {reviewId})

  return <FormContainer action={deleteReview}>
      <IconButton actionType='delete'/>
  </FormContainer>
}

export default page
