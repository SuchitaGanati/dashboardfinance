import React from "react";

type ContainerProps<T extends React.ElementType> = {
  children: React.ReactNode;
  className?: string;
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

export function Container<T extends React.ElementType = "div">({
  children,
  className,
  as,
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";

  return <Component>{children}</Component>;
}
