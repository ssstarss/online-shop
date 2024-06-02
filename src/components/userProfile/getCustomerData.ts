import { connectionByFetch } from '../../app/connectionByFetch';
import Customer from '../../interfaces/customerProfile';

export default async function getCustomerData(): Promise<Customer | null> {
  const id = localStorage.getItem('id');
  if (id) {
    try {
      const customer: Customer = await connectionByFetch.getCustumerByID(id);
      console.log(customer);
      return customer;
    } catch (error) {
      console.error('Error while retrieving user data:', error);
    }
  }
  return null;
}
