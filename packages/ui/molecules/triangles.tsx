"use client";

import "./triangles.css";
import { type MutableRefObject } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { useDeviceSize } from "../hooks/use-device-size";

export type TriangleVariantProps = VariantProps<typeof triangleVariants>;
const triangleVariants = cva("", {
  variants: {
    size: {
      small: 16,
      default: 80,
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export function Triangles({
  parentRef,
  size = "default",
}: Readonly<{
  parentRef?: MutableRefObject<HTMLElement | null>;
} & TriangleVariantProps>): JSX.Element {
  const [deviceWidth, deviceHeight] = useDeviceSize();
  const [width, height] = parentRef?.current
    ? [parentRef.current.offsetWidth, parentRef.current.offsetHeight]
    : [deviceWidth, deviceHeight];
    const triangleSize = Number(triangleVariants({ size }));
  const maxTileX = Math.ceil(width / triangleSize),
    maxTileY = Math.ceil(height / triangleSize);
  const types = ["one", "two", "three"];
  return (/** eslint-disable no-explicit-any */
    <div style={{ ['--triangle-size' as string] : `${triangleVariants({ size })}px`}} className="absolute overflow-hidden top-0 left-0 flex flex-wrap">
      {...Array.from(
        { length: maxTileX },
        (x, i): React.ReactNode =>
          Array.from({ length: maxTileY }, (y, j): React.ReactNode => {
            return (
              <div
                className={`triangle ${types[Math.floor(Math.random() * 3)]}`}
                key={`${i.toString()}${j.toString()}`}
              />
            );
          })
      )}
    </div>
  );
}
