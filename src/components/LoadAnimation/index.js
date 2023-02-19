import "./LoadAnimation.css";

const LoadAnimation = () => {
  return (
    <div className="LoadAnimation">
      <div className="indeterminate-progress-bar">
        <div className="indeterminate-progress-bar__progress"></div>
      </div>
    </div>
  );
};

export default LoadAnimation;
