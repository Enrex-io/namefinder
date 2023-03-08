import { ComponentProps } from "react";

export function ArrowUp(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      {...props}
    >
      <g id="back_to_top" transform="translate(-1290 -4651)">
        <circle
          id="Ellipse_399"
          cx="20"
          cy="20"
          r="20"
          transform="translate(1290 4651)"
          fill="rgba(158,158,158,0.55)"
        ></circle>
        <g
          id="Icon_feather-arrow-left"
          transform="translate(1302 4675) rotate(-90)"
        >
          <path
            id="Path_290"
            d="M7.5,23.5l8-8-8-8"
            transform="translate(-7.5 -7.5)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
        </g>
      </g>
    </svg>
  );
}
