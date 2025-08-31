import BillCard, { Bill } from './BillCard';

interface BillCardsProps {
  bills: Bill[];
}

function BillCards({ bills }: BillCardsProps) {
  return (
    <div>
      {bills.map((bill) => (
        <BillCard key={`${bill.fromDate}-${bill.toDate}`} bill={bill} />
      ))}
    </div>
  );
}

export default BillCards;
