import {Button} from '@/components/ui/button';
import {openWidget, MelonConfig} from 'melon-web-widget';
import 'melon-web-widget/dist/index.css';

export const WidgetTest = () => {
  const handleOpenWidget = () => {
    const api_key = 'BBszTq94xd61szHBD';
    const config: MelonConfig = {
      melon_id: 'KEHI60',
      store_name: 'obetoandsons',
      reference: 'REF3',
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
    openWidget(config, api_key);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div id="melon-widget" />
      <Button onClick={handleOpenWidget}>Open Melon Widget</Button>
    </div>
  );
};
