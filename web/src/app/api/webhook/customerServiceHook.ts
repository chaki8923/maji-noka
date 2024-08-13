export class CustomerService {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async handleCustomer({ customer, session, name, email, shippingDetails }: any): Promise<any> {
    if (!customer) {
      return await this.prisma.customer.create({
        data: {
          customerId: session.customer as string,
          name: name,
          email: email,
          country: shippingDetails?.country,
          postal_code: shippingDetails?.postal_code,
          city: shippingDetails?.city,
          state: shippingDetails?.state,
          line1: shippingDetails?.line1,
          line2: shippingDetails?.line2,
        },
      });
    } else {
      return await this.prisma.customer.update({
        where: { email: email as string },
        data: {
          name: name,
          country: shippingDetails?.country,
          postal_code: shippingDetails?.postal_code,
          city: shippingDetails?.city,
          state: shippingDetails?.state,
          line1: shippingDetails?.line1,
          line2: shippingDetails?.line2,
        },
      });
    }
  }
}
