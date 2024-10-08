export type TableData = {
  property: string;
  type: string;
  description: string;
  required: string;
};

export const PropertyTable = ({data}: {data: TableData[]}) => {
  const th =
    'text-left p-2 bg-mountainAsh-6 text-sm text-pashBlack-1 border-r border-b border-mountainAsh-1 last:border-r-0';
  const td =
    'text-left p-2 bg-mountainAsh-9 text-sm text-pashBlack-1 border-b border-r border-mountainAsh-1 last:border-r-0';

  return (
    <div className="w-full overflow-auto mt-3">
      <table className="w-full border border-mountainAsh-1 border-collapse">
        <thead>
          <tr>
            <th className={th}>Property</th>
            <th className={th}>Type</th>
            <th className={th}>Description</th>
            <th className={th}>Required</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className={td}>{item.property}</td>
              <td className={td}>{item.type}</td>
              <td className={td}>{item.description}</td>
              <td className={td}>{item.required}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
