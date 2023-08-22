export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={`${className}`}
      viewBox="0 0 94 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="94" height="94" rx="10" fill="url(#paint0_linear_6_9)" />
      <path
        d="M20.28 61V32.16H25.56V55.68H49.08V61H20.28ZM56.8119 61C55.7985 61 54.8652 60.7467 54.0119 60.24C53.1852 59.7333 52.5185 59.0667 52.0119 58.24C51.5319 57.4133 51.2919 56.4933 51.2919 55.48V37.8H56.5319V55.28C56.5319 55.4133 56.5719 55.5333 56.6519 55.64C56.7585 55.72 56.8785 55.76 57.0119 55.76H69.1319C69.2652 55.76 69.3719 55.72 69.4519 55.64C69.5585 55.5333 69.6119 55.4133 69.6119 55.28V37.8H74.8519V55.48C74.8519 56.4933 74.5985 57.4133 74.0919 58.24C73.6119 59.0667 72.9585 59.7333 72.1319 60.24C71.3052 60.7467 70.3719 61 69.3319 61H56.8119Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6_9"
          x1="47"
          y1="-1.40071e-06"
          x2="94"
          y2="107"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopColor="#AD6C6C" />
        </linearGradient>
      </defs>
    </svg>
  );
}
