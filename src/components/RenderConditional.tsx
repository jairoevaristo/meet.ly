type RenderConditionalProps = {
  children?: JSX.Element;
  component?: JSX.Element; 
  condition: boolean;
}

export const RenderConditional: React.FC<RenderConditionalProps> = ({ children, condition, component }) => {
  if (condition && component) {
    return component; 
  }

  if (condition && children) {
    return children; 
  }

  return <></>;
}