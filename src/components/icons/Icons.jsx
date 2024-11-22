export const ChevronDown = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Lock = ({ fill, size, height, width, ...props }) => {
  const color = fill;

  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(3.5 2)">
        <path
          d="M9.121,6.653V4.5A4.561,4.561,0,0,0,0,4.484V6.653"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
          transform="translate(3.85 0.75)"
        />
        <path
          d="M.5,0V2.221"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
          transform="translate(7.91 12.156)"
        />
        <path
          d="M7.66,0C1.915,0,0,1.568,0,6.271s1.915,6.272,7.66,6.272,7.661-1.568,7.661-6.272S13.4,0,7.66,0Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
          transform="translate(0.75 6.824)"
        />
      </g>
    </svg>
  );
};

export const Activity = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path d="M6.918 14.854l2.993-3.889 3.414 2.68 2.929-3.78" />
        <path d="M19.668 2.35a1.922 1.922 0 11-1.922 1.922 1.921 1.921 0 011.922-1.922z" />
        <path d="M20.756 9.269a20.809 20.809 0 01.194 3.034c0 6.938-2.312 9.25-9.25 9.25s-9.25-2.312-9.25-9.25 2.313-9.25 9.25-9.25a20.931 20.931 0 012.983.187" />
      </g>
    </svg>
  );
};

export const Flash = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.09 13.28h3.09v7.2c0 1.68.91 2.02 2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76l-7.57 8.6c-.92 1.06-.53 1.92.87 1.92Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Server = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.32 10H4.69c-1.48 0-2.68-1.21-2.68-2.68V4.69c0-1.48 1.21-2.68 2.68-2.68h14.63C20.8 2.01 22 3.22 22 4.69v2.63C22 8.79 20.79 10 19.32 10ZM19.32 22H4.69c-1.48 0-2.68-1.21-2.68-2.68v-2.63c0-1.48 1.21-2.68 2.68-2.68h14.63c1.48 0 2.68 1.21 2.68 2.68v2.63c0 1.47-1.21 2.68-2.68 2.68ZM6 5v2M10 5v2M6 17v2M10 17v2M14 6h4M14 18h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const TagUser = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 18.86h-.76c-.8 0-1.56.31-2.12.87l-1.71 1.69c-.78.77-2.05.77-2.83 0l-1.71-1.69c-.56-.56-1.33-.87-2.12-.87H6c-1.66 0-3-1.33-3-2.97V4.98c0-1.64 1.34-2.97 3-2.97h12c1.66 0 3 1.33 3 2.97v10.91c0 1.63-1.34 2.97-3 2.97Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M12 10a2.33 2.33 0 1 0 0-4.66A2.33 2.33 0 0 0 12 10ZM16 15.66c0-1.8-1.79-3.26-4-3.26s-4 1.46-4 3.26"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Scale = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7ZM18 6 6 18"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M18 10V6h-4M6 14v4h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};
export const Cart = ({
  fill = "none",
  size = 24,
  height = size,
  width = size,
  stroke = "currentColor",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-basket"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M5.001 8h13.999a2 2 0 0 1 1.977 2.304l-1.255 7.152a3 3 0 0 1 -2.966 2.544h-9.512a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304z" />
      <path d="M17 10l-2 -6" />
      <path d="M7 10l2 -6" />
    </svg>
  );
};

export const MailIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
      fill="currentColor"
    />
  </svg>
);

export const LockIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
      fill="currentColor"
    />
    <path
      d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
      fill="currentColor"
    />
  </svg>
);

export const GoogleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
        c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
        C103.821,274.792,107.225,292.797,113.47,309.408z"
      fill="#FBBB00"
    ></path>
    <path
      d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
        c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
        c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
      fill="#518EF8"
    ></path>
    <path
      d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
        c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
        c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
      fill="#28B446"
    ></path>
    <path
      d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
        c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
        C318.115,0,375.068,22.126,419.404,58.936z"
      fill="#F14336"
    ></path>
  </svg>
);
