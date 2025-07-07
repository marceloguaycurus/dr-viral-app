import * as React from "react";
import { cn } from "@/lib/utils/utils";

/**
 * Higher-order component that injects `base` classes and merges with incoming `className`.
 * Accepts static string or function so base classes can depend on props.
 */
export function withBaseClasses<P extends { className?: string }>(
  Component: React.ComponentType<P>,
  base: string | ((props: P) => string) = ""
) {
  const Wrapped: React.FC<P> = (props) => {
    const { className, ...rest } = props;
    const baseClasses = typeof base === "function" ? base(props) : base;

    return React.createElement(Component as React.ComponentType<P>, {
      ...(rest as P),
      className: cn(baseClasses, className),
    });
  };

  Wrapped.displayName = `withBaseClasses(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
}

/** Utility record type used by buildExtraClasses */
export type MapLike<T extends string | number | symbol> = Partial<Record<T, string>>;

/**
 * Returns concatenated classes based on variant & size plus optional base.
 */
export function buildExtraClasses<V extends string | number | symbol, S extends string | number | symbol>(
  variant: V,
  size: S,
  {
    base = "",
    variantMap = {} as MapLike<V>,
    sizeMap = {} as MapLike<S>,
  }: {
    base?: string;
    variantMap?: MapLike<V>;
    sizeMap?: MapLike<S>;
  } = {}
) {
  return cn(base, variantMap[variant], sizeMap[size]);
}

/**
 * Convenience helper for compound components (e.g. Card.Header).
 */
export function composeWithChildren<M, T extends Record<string, unknown>>(main: M, children: T): M & T {
  return Object.assign(main as unknown as Record<string, unknown>, children) as M & T;
}
