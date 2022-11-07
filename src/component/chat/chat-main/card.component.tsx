// libs

// me
import './card.styles.scss';
const Card = ({ children, className }: any) => {
  return <div className={`card-tippy ${className}`}>{children}</div>;
};

export default Card;
