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
import axios from 'axios';

export const CountryCode = ({
  countryCodes,
  setCountryCodes,
  selectedCountryCode,
  setSelectedCountryCode,
}: {
  countryCodes: CountryCodeType[];
  setCountryCodes: React.Dispatch<React.SetStateAction<CountryCodeType[]>>;
  selectedCountryCode: CountryCodeType | null;
  setSelectedCountryCode: React.Dispatch<
    React.SetStateAction<CountryCodeType | null>
  >;
}) => {
  useEffect(() => {
    const getCountryCodes = async () => {
      const res = await axios.get('https://restcountries.com/v2/all');
      const countries = res.data.map((c: any) => {
        return {
          callingCode: c.callingCodes[0],
          code: c.alpha3Code,
          flag: c.flags.png,
          name: c.name,
        };
      });
      setCountryCodes(countries);
      const nigeria = countries.find(
        (country: any) => country.name === 'Nigeria',
      );
      if (nigeria) {
        setSelectedCountryCode(nigeria);
      }
    };
    getCountryCodes();
  }, [setCountryCodes, setSelectedCountryCode]);

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
