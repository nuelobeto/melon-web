import {Button} from '@/components/ui/button';
import {openWidget, StoreConfigType, MelonReceiptType} from 'melon-web-widget';
import 'melon-web-widget/dist/index.css';

export const WidgetTest = () => {
  const handleOpenWidget = () => {
    const store: StoreConfigType = {
      store_logo:
        'https://res.cloudinary.com/dk9bt9lkn/image/upload/v1704231822/qudra/vue_zjazcr.png',
      api_key: 'BBszTq94xd61szHBD',
      store_name: 'obetoandsons',
    };

    const payload: MelonReceiptType = {
      reference: 'REF20',
      items: [
        {
          item: 'Watermelon',
          amount: 4000,
          quantity: 1,
        },
        {
          item: 'Banana',
          amount: 4000,
          quantity: 1,
        },
      ],
      date: '2024-09-26',
      total_amount: 8000,
    };
    openWidget(store, payload);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div id="melon-widget" />
      <Button onClick={handleOpenWidget}>Open Melon Widget</Button>
    </div>
  );
};
