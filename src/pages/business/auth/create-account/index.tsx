import {Sidebar} from './sidebar';
import {Main} from './main';

export const CreateBusinessAccount = () => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <Main />
    </div>
  );
};
