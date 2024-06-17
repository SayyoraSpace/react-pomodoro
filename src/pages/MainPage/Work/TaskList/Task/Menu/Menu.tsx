import { Dropdown } from '../../../../../../components/Dropdown';
import { ITask } from '../../../../../../store/slices/tasks';
import { MenuDropdown } from './MenuDropdown';

interface IMenuProps {
  task: ITask;
}
export function Menu({ task }: IMenuProps) {
  return (
    <Dropdown>
      <MenuDropdown task={task} />
    </Dropdown>
  );
}
