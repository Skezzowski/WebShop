import { DeliveryDetails } from './delivery-details.model';

export interface User {
    id: string;
    name: string;
    email: string;
    admin: boolean;
    deliveryDetails?: DeliveryDetails;
    img?: string;
}
