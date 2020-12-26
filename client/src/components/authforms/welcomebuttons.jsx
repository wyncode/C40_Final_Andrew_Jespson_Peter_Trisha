import chefButton from './welcombuttons/chefregbutton';
import userButton from './welcombuttons/userregbutton';

const welcombuttons = () => {
  return (
    <div>
      <chefButton />
      <userButton />
    </div>
  );
};

export default welcombuttons;
