import { HeaderProps } from "../../../config";
import { getTextStyles } from "./ui/ui";

export default function Header({ props }: { props: HeaderProps }) {
  if (!props) {
    console.error('Header: props is undefined');
    return null;
  }
  
  const { state } = props;
  
  return (
    <div className="text-center mb-16">
      <h1 className={getTextStyles('title')}>
        {state.title}
      </h1>
      <p className={`${getTextStyles('subtitle')} mt-4 max-w-3xl mx-auto`}>
        {state.subtitle}
      </p>
    </div>
  );
} 