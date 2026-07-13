const colors = [
  "bg-washking-yellow",
  "bg-washking-red",
  "bg-washking-orange",
  "bg-washking-green",
  "bg-washking-yellow",
  "bg-washking-red",
  "bg-washking-orange",
  "bg-washking-green",
];

type RoyalTrimProps = {
  className?: string;
};

const RoyalTrim = ({ className = "" }: RoyalTrimProps) => (
  <div className={`grid h-2 grid-cols-8 ${className}`} aria-hidden="true">
    {colors.map((color, index) => (
      <span key={`${color}-${index}`} className={color} />
    ))}
  </div>
);

export default RoyalTrim;
