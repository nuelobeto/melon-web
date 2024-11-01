import {Sidebar} from './sidebar';
import {Main} from './main';

export const CreateAccount = () => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <Main />
    </div>
  );
};
