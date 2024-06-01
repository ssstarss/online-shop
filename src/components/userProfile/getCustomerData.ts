import ConnectionByFetch from '../../app/connectionByFetch';
import Customer from '../../interfaces/customerProfile';

export default async function getCustomerData(): Promise<Customer | null> {
  const connection = new ConnectionByFetch();
  const id = localStorage.getItem('id');
  if (id) {
    try {
      const customer: Customer = await connection.getCustumerByID(id);
      return customer;
    } catch (error) {
      console.error('Error while retrieving user data:', error);
    }
  }
  return null;
}
