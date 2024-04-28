import "./Skeleton.scss";
interface skeletonProps {
  title?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  width?: number;
  height?: number;
  speed?: number;
}

const Skeleton: React.FC<skeletonProps> = () => {
  return (
    <div className="skeleton">
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
};

export default Skeleton;
