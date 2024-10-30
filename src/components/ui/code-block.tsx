import {CheckCheckIcon, Copy} from 'lucide-react';
import {Button} from './button';
import {useEffect, useState} from 'react';

export const CodeBlock = ({code}: {code: string}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant={'secondary'}
        className="self-end h-8 border px-2.5"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
        }}
      >
        {copied ? (
          <CheckCheckIcon className="w-4 h-4 mr-1.5" />
        ) : (
          <Copy className="w-4 h-4 mr-1.5" />
        )}
        Copy
      </Button>
      <code className="w-full rounded-lg bg-[#081623] text-pashBlack-9 text-sm">
        <pre className="p-4 overflow-auto">{code}</pre>
      </code>
    </div>
  );
};
