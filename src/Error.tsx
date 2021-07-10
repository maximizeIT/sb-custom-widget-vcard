import React, { FunctionComponent, ReactElement } from "react";

export const Error: FunctionComponent = (): ReactElement => {
  return <div><strong>Error loading the user. Please check the entered user ID.</strong></div>;
};