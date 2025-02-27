import cx from 'classnames';
import { memo } from 'react';

type IconButtonProps = {
  className?: string;
  icon?: JSX.Element;
  label?: JSX.Element | string;
  onClick?: (e: React.MouseEvent) => void;
  small?: boolean;
};

const IconButton = ({
  className,
  icon,
  label,
  onClick,
  small,
}: IconButtonProps) => {
  if (small) {
    return (
      <div
        className={cx('IconButtonSmall', className, {
          'IconButtonSmall--withLabel': Boolean(label),
        })}
        onClick={onClick}
      >
        {icon}
        {label}
      </div>
    );
  }
  return (
    <div className={cx('IconButton', className)} onClick={onClick}>
      {label}
      {icon}
    </div>
  );
};

export default memo(IconButton);
