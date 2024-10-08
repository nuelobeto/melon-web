import {CodeBlock} from '@/components/ui/code-block';
import {PropertyTable, TableData} from '@/components/ui/guides-property-table';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

const installation = `npm install melon-web-widget`;
const imports = `import { openWidget, StoreConfigType, MelonReceiptType } from 'melon-web-widget';
import 'melon-web-widget/dist/index.css';
`;
const storeConfig = `const store: StoreConfigType = {
  store_logo: 'https://path-to-your-logo.png',
  api_key: 'YOUR_API_KEY',
  store_name: 'your_store_name',
};`;
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
const receipt = `const payload: MelonReceiptType = {
  reference: 'RECEIPT_REFERENCE_NUMBER',
  items: [
    {
      item: 'Product Name',
      amount: 4000, 
      quantity: 1,
    },
  ],
  date: '2024-09-26',
  total_amount: 4000, 
};`;
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
const integrations = [
  {
    framework: 'React',
    code: `import {openWidget, StoreConfigType, MelonReceiptType} from 'melon-web-widget';
import 'melon-web-widget/dist/index.css';

export const WidgetTest = () => {
  const handleOpenWidget = () => {
    const store: StoreConfigType = {
      store_logo: 'https://path-to-your-logo.png',
      api_key: 'YOUR_API_KEY',
      store_name: 'your_store_name',
    };

    const payload: MelonReceiptType = {
      reference: 'REF-1234567890',
      items: [
        {
          item: 'Product one',
          amount: 4000,
          quantity: 1,
        },
        {
          item: 'Product two',
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
      <button onClick={handleOpenWidget}>Open Melon Widget</button>
    </div>
  );
};`,
  },
  {
    framework: 'Vue',
    code: `<script setup lang="ts">
import { ref } from 'vue'
import { openWidget, type StoreConfigType, type MelonReceiptType } from 'melon-web-widget'
import 'melon-web-widget/dist/index.css'

const handleOpenWidget = () => {
  const store: StoreConfigType = {
    store_logo: 'https://path-to-your-logo.png',
    api_key: 'YOUR_API_KEY',
    store_name: 'your_store_name',
  }

  const payload: MelonReceiptType = {
    reference: 'REF-1234567890',
    items: [
      {
        item: 'Product one',
        amount: 4000,
        quantity: 1,
      },
      {
        item: 'Product two',
        amount: 4000,
        quantity: 1,
      },
    ],
    date: '2024-09-26',
    total_amount: 8000,
  }

  openWidget(store, payload)
}
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div id="melon-widget"></div>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      @click="handleOpenWidget"
    >
      Open Melon Widget
    </button>
  </div>
</template>`,
  },
  {
    framework: 'Angular',
    code: `import { Component } from '@angular/core';
import { openWidget, StoreConfigType, MelonReceiptType } from 'melon-web-widget';

@Component({
  selector: 'app-melon-widget',
  template: 
    <div class="w-screen h-screen flex items-center justify-center">
      <div id="melon-widget"></div>
      <button 
        (click)="handleOpenWidget()"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Open Melon Widget
      </button>
    </div>
  ",
  styles: []
})

export class MelonWidgetComponent {
  handleOpenWidget(): void {
    const store: StoreConfigType = {
      store_logo: 'https://path-to-your-logo.png',
      api_key: 'YOUR_API_KEY',
      store_name: 'your_store_name',
    };

    const payload: MelonReceiptType = {
      reference: 'REF-1234567890',
      items: [
        {
          item: 'Product one',
          amount: 4000,
          quantity: 1,
        },
        {
          item: 'Product two',
          amount: 4000,
          quantity: 1,
        },
      ],
      date: '2024-09-26',
      total_amount: 8000,
    };

    openWidget(store, payload);
  }
}`,
  },
];

export const WebGuide = () => {
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

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-xl text-pashBlack-1">
            1. Import Required Components
          </h4>
          <CodeBlock code={imports} />
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-xl text-pashBlack-1">
            2. Configure Store Settings
          </h4>
          <p className="text-pashBlack-3">
            Create a StoreConfigType object with your store details:
          </p>
          <CodeBlock code={storeConfig} />
          <PropertyTable data={storeConfigTableData} />
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-xl text-pashBlack-1">
            3. Prepare Receipt Data
          </h4>
          <p className="text-pashBlack-3">
            Create a MelonReceiptType object with the receipt details:
          </p>
          <CodeBlock code={receipt} />
          <PropertyTable data={receiptTableData} />
          <h5 className="font-semibold text-lg text-pashBlack-1 mt-3">
            Item Object Structure
          </h5>
          <PropertyTable data={itemTableData} />
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-xl text-pashBlack-1">
            4. Implement the Widget Component
          </h4>
          <Tabs
            defaultValue={integrations[0].framework.toLowerCase()}
            className="w-full"
          >
            <TabsList className="w-full justify-start bg-white p-0">
              {integrations
                .map(i => i.framework)
                .map((framework, index) => (
                  <TabsTrigger
                    key={index}
                    value={framework.toLowerCase()}
                    className="capitalize text-pashBlack-1 shadow-none border-l-0 border-r-0 border-b-2 border-b-transparent data-[state=active]:border-pashBlack-1 rounded-none"
                  >
                    {framework}
                  </TabsTrigger>
                ))}
            </TabsList>
            {integrations.map((integration, index) => (
              <TabsContent
                key={index}
                value={integration.framework.toLowerCase()}
              >
                <CodeBlock code={integration.code} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-2xl text-pashBlack-1">
          Important Notes
        </h3>

        <ul className="flex flex-col gap-3 list-disc pl-6 text-pashBlack-1">
          <li>
            Ensure you have a div with id="melon-widget" in your component.
          </li>
          <li>
            The widget uses a modal popup, so it can be triggered from anywhere
            in your app
          </li>
        </ul>
      </div>
    </div>
  );
};
