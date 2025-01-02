import { cloneElement, Fragment, JSX, useMemo, useState } from 'react';

export interface OpenTriggerProps {
  defaultOpen?: boolean;
  trigger: JSX.Element;
  children: JSX.Element;
}

export function OpenTrigger(props: OpenTriggerProps) {
  const { defaultOpen = false, trigger, children } = props;

  const [open, setOpen] = useState(defaultOpen);

  const triggerDom = useMemo(() => {
    if (!trigger) return null;
    return cloneElement(trigger, {
      key: 'trigger',
      onClick: (e: any) => {
        setOpen(true);
        trigger.props?.onClick?.(e);
      },
    });
  }, [trigger]);

  const childrenDom = useMemo(() => {
    if (!children) return null;
    return cloneElement(children, {
      open: open,
      onOpenChange: (bool: boolean) => {
        setOpen(bool);
      },
      key: 'trigger-children',
    });
  }, [children, open, setOpen]);

  return (
    <Fragment>
      {triggerDom}
      {open ? childrenDom : null}
    </Fragment>
  );
}
