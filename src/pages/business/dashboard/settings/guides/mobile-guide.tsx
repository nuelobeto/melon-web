import {CodeBlock} from '@/components/ui/code-block';
import {PropertyTable, TableData} from '@/components/ui/guides-property-table';

const installation = `npm install melon-mobile-widget`;
const usage = `import { View } from "react-native";
import { useMelonWidget, StoreConfigType, MelonReceiptType } from "melon-mobile-widget";
import Button from "@/components/button";

export default function WidgetExample() {
  const storeConfig: StoreConfigType = {
    store_logo: "https://path-to-your-logo.png",
    api_key: "YOUR_API_KEY",
    store_name: "your_store_name",
  };

  const receipt: MelonReceiptType = {
    reference: "REF-1234567890",
    items: [
      {
        item: "Product one",
        amount: 4000,
        quantity: 1,
      },
      {
        item: "Product two",
        amount: 4000,
        quantity: 1,
      },
    ],
    date: "2024-09-26",
    total_amount: 8000,
  };

  const { openMelonWidget, MelonReceipt } = useMelonWidget(
    storeConfig,
    receipt
  );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Open Widget" onPress={openMelonWidget} />
      <MelonReceipt />
    </View>
  );
}`;
const apiRef = `const { openMelonWidget, MelonReceipt } = useMelonWidget(
  storeConfig: StoreConfigType,
  receipt: MelonReceiptType
);`;
const storeConfig = `interface StoreConfigType {
  store_logo: string;     // URL to your store's logo
  api_key: string;        // Your Melon API key
  store_name: string;     // Your store's identifier
}`;
const storeConfigTableData: TableData[] = [
  {
    property: 'store_logo',
    type: 'string',
    description: `URL to your store's logo`,
    required: 'Optional',
  },
  {
    property: 'api_key',
    type: 'string',
    description: 'Your Melon API key',
    required: 'Yes',
  },
  {
    property: 'store_name',
    type: 'string',
    description: `Your store's name`,
    required: 'Yes',
  },
];
const receiptType = `interface MelonReceiptType {
  reference: string;      // Unique receipt reference
  items: {
    item: string;         // Product name
    amount: number;       // Price in cents
    quantity: number;     // Quantity of items
  }[];
  date: string;           // ISO format date (YYYY-MM-DD)
  total_amount: number;   // Total amount in cents
}`;
const receiptTableData: TableData[] = [
  {
    property: 'reference',
    type: 'string',
    description: `Unique receipt reference`,
    required: 'Yes',
  },
  {
    property: 'items',
    type: 'Item[]',
    description: 'Array of purchased items',
    required: 'Yes',
  },
  {
    property: 'date',
    type: 'string',
    description: `Receipt date (YYYY-MM-DD)`,
    required: 'Yes',
  },
  {
    property: 'total_amount',
    type: 'number',
    description: `Total amount`,
    required: 'Yes',
  },
];
const itemTableData: TableData[] = [
  {
    property: 'item',
    type: 'string',
    description: `Product name`,
    required: 'Yes',
  },
  {
    property: 'amount',
    type: 'number',
    description: 'Price per unit',
    required: 'Yes',
  },
  {
    property: 'quantity',
    type: 'number',
    description: `Number of items`,
    required: 'Yes',
  },
];

export const MobileGuide = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-2xl text-pashBlack-1">
          Installation
        </h3>

        <div className="flex flex-col gap-3">
          <p className="text-pashBlack-3">
            First, install the required package:
          </p>
          <CodeBlock code={installation} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-2xl text-pashBlack-1">Usage</h3>
        <CodeBlock code={usage} />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-2xl text-pashBlack-1">
          API Reference
        </h3>
        <div className="flex flex-col gap-3">
          <p className="text-pashBlack-3">useMelonWidget Hook</p>
          <p className="text-pashBlack-3">
            The primary hook for integrating the Melon Widget into your React
            Native application.
          </p>
          <CodeBlock code={apiRef} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-2xl text-pashBlack-1">Parameters</h3>
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-xl text-pashBlack-1 ">
            1. storeConfig: StoreConfigType
          </h4>
          <CodeBlock code={storeConfig} />
          <PropertyTable data={storeConfigTableData} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="font-semibold text-xl text-pashBlack-1">
          2. receipt: MelonReceiptType
        </h4>
        <CodeBlock code={receiptType} />
        <PropertyTable data={receiptTableData} />
        <h5 className="font-semibold text-lg text-pashBlack-1 mt-3">
          Item Object Structure
        </h5>
        <PropertyTable data={itemTableData} />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-2xl text-pashBlack-1">Returns</h3>

        <ul className="flex flex-col gap-3 list-disc pl-6 text-pashBlack-1">
          <li>
            {
              'openMelonWidget: () => void: A function to programmatically open the receipt widget'
            }
          </li>
          <li>
            MelonReceipt: React.ComponentType: A React component that renders
            the receipt view
          </li>
        </ul>
      </div>
    </div>
  );
};
