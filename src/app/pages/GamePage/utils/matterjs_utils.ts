
export const getBody = (composites: Matter.Composite[], compositeLabel: string, bodyLabel: string): Matter.Body | undefined => {
  const elementsComposite = composites?.find(composite => composite.label === compositeLabel);
  const body = elementsComposite?.bodies?.find(body => body.label === bodyLabel);  
  return body;
}

export const getConstraint = (composites: Matter.Composite[], compositeLabel: string, constraintLabel: string): Matter.Constraint | undefined => {
  const elementsComposite = composites?.find(composite => composite.label === compositeLabel);
  const constraint = elementsComposite?.constraints?.find(body => body.label === constraintLabel);
  return constraint;
}
