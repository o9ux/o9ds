import { forwardRef, Children, cloneElement, isValidElement } from 'react';
import { cn } from '@/utils/cn';

const ButtonGroup = forwardRef(function ButtonGroup(
  { orientation = 'horizontal', className, children, ...rest },
  ref
) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      ref={ref}
      role="group"
      className={cn(
        'inline-flex',
        isHorizontal ? 'flex-row' : 'flex-col',
        className
      )}
      {...rest}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        const count = Children.count(children);
        const isFirst = index === 0;
        const isLast = index === count - 1;

        return cloneElement(child, {
          className: cn(
            child.props.className,
            isHorizontal
              ? [
                  !isLast && 'border-r-0',
                  !isFirst && '-ml-px',
                ]
              : [
                  !isLast && 'border-b-0',
                  !isFirst && '-mt-px',
                ]
          ),
        });
      })}
    </div>
  );
});

export default ButtonGroup;
