import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import DetailsSection from './DetailSection'
import { Separator } from '@/components/ui/separator'
import CuisinesSection from './CuisinesSection'
import { Menu } from 'lucide-react'
import MenuSection from './MenuSection'
import ImageSection from './ImageSection'
import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  restaurantName: z.string({
    required_error: 'Restaurant name is required',
  }),
  city: z.string({
    required_error: 'city name is required',
  }),
  country: z.string({
    required_error: 'country name is required',
  }),
  deliveryPrice: z.coerce.number({
    required_error: 'Delivery price required',
    invalid_type_error: 'Must be a valid number',
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: 'Estimated Delivery Time required',
    invalid_type_error: 'Must be a valid number',
  }),
  cuisines: z.array(z.string()).nonempty({
    message: 'Please select at least one cuisine',
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, 'name is required'),
      price: z.coerce.number().min(1, 'price is required'),
    })
  ),
  imageFile: z.instanceof(File, { message: 'image is required' }),
})

type restaurantFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (restaurantFormData: FormData) => void
  isLoading: boolean
}

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: '', price: 0 }],
    },
  })

  const onSubmit = (formDataJson: restaurantFormData) => {
    //TODO- convert formDataJson to a new FormData object
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 bg-gray-50 p-10 rounded-lg'
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
      </form>
    </Form>
  )
}

export default ManageRestaurantForm
