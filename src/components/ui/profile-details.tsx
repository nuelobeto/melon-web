import {cn} from '@/lib/utils';
import {Card} from './card';

type Props = {
  title: string;
  details: Detail[];
  edit: React.ReactNode;
};

export type Detail = {
  label: string;
  value: string | null;
};

export const ProfileDetails = ({title, details, edit}: Props) => {
  const value = (detail: Detail) => {
    if (!detail.value) {
      return (
        <div className="flex items-center justify-center w-fit h-6 py-1 px-2.5 text-xs text-orange-500 border border-[#F9580033] bg-[#FEDECC80] rounded-3xl">
          Missing details
        </div>
      );
    }

    return detail.value;
  };

  return (
    <Card className="flex-1 px-6 pt-6 pb-3 rounded-xl">
      <div className="flex items-center justify-between">
        <p className="font-medium text-pashBlack-1 text-xl">{title}</p>

        {edit}
      </div>

      <table className="mt-3 w-full">
        <tbody>
          {details.map((detail, index) => (
            <tr
              key={index}
              className={cn(
                'h-12 border-mountainAsh-6',
                details.length - 1 === index
                  ? 'border-transparent'
                  : 'border-b',
              )}
            >
              <td className="w-[250px] text-sm font-medium text-pashBlack-1">
                {detail.label}
              </td>
              <td className="text-sm text-pashBlack-6 capitalize">
                {value(detail)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
