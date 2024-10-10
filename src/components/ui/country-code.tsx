/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import {CountryCodeType} from '@/types';
import {ChevronDown} from 'lucide-react';
import {ScrollArea} from './scroll-area';
import {useEffect} from 'react';
import {COUNTRY_CODES} from '@/constants/countryCodes';

export const CountryCode = ({
  selectedCountryCode,
  setSelectedCountryCode,
}: {
  selectedCountryCode: CountryCodeType | null;
  setSelectedCountryCode: React.Dispatch<
    React.SetStateAction<CountryCodeType | null>
  >;
}) => {
  const countryCodes = COUNTRY_CODES.map((c: any) => {
    return {
      callingCode: c.callingCodes[0],
      code: c.alpha3Code,
      flag: c.flags.png,
      name: c.name,
    };
  });

  useEffect(() => {
    if (countryCodes.length > 0 && !selectedCountryCode) {
      const nigeria = countryCodes.find(country => country.name === 'Nigeria');
      if (nigeria) {
        setSelectedCountryCode(nigeria);
      }
    }
  }, [countryCodes, selectedCountryCode, setSelectedCountryCode]);

  return (
    <div className="absolute left-2.5">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1">
          <img
            src={selectedCountryCode?.flag ?? ''}
            alt=""
            width={20}
            height={20}
          />{' '}
          <ChevronDown className="w-5 h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[250px]">
          <ScrollArea className="h-[400px]">
            {countryCodes.map((country, index) => (
              <DropdownMenuItem
                key={index}
                className="gap-1.5"
                onClick={() => setSelectedCountryCode(country)}
              >
                <img src={country.flag} alt="" width={20} height={20} />
                <span>{country.name}</span>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
